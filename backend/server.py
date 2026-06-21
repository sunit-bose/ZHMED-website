from fastapi import FastAPI, APIRouter, HTTPException, Header, Depends
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Annotated
from datetime import datetime, timezone, date, time, timedelta
from bson import ObjectId
import uuid


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'zhmed-admin-2025')

app = FastAPI(title="ZH Medsolutions API")
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
def _new_id() -> str:
    return str(uuid.uuid4())


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class BookingCreate(BaseModel):
    service: str
    full_name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    date: str  # YYYY-MM-DD
    time_slot: str  # HH:MM (24h) EST
    notes: Optional[str] = None


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=_new_id)
    service: str
    full_name: str
    email: str
    phone: str
    company: Optional[str] = None
    date: str
    time_slot: str
    notes: Optional[str] = None
    status: str = "pending"
    created_at: str = Field(default_factory=_utc_now_iso)


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=_new_id)
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=_utc_now_iso)


class NewsletterSubscribe(BaseModel):
    email: EmailStr


class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=_new_id)
    email: str
    created_at: str = Field(default_factory=_utc_now_iso)


# ---------------- Static catalog ----------------
SERVICES = [
    {"id": "eligibility-verification", "name": "Eligibility Verification", "icon": "UserCheck", "description": "Real-time eligibility checks before every visit — no surprise denials."},
    {"id": "benefit-verification", "name": "Benefit Verification", "icon": "ClipboardCheck", "description": "Detailed benefit & coverage verification with copay, deductible & auth requirements."},
    {"id": "era-enrollment", "name": "ERA Enrollment", "icon": "FileCheck2", "description": "Streamlined Electronic Remittance Advice enrollment with all major payers."},
    {"id": "credentialing", "name": "Credentialing", "icon": "BadgeCheck", "description": "Provider credentialing and re-credentialing across commercial and government payers."},
    {"id": "medical-coding", "name": "Medical Coding", "icon": "Code2", "description": "Certified coders for ICD-10, CPT, HCPCS with compliance-first accuracy."},
    {"id": "charge-entry", "name": "Charge Entry", "icon": "ClipboardEdit", "description": "Accurate charge capture with same-day turnaround and validation."},
    {"id": "payment-posting", "name": "Payment Posting", "icon": "Wallet", "description": "ERA / EOB posting with reconciliation, adjustments and write-offs."},
    {"id": "edi-rejection", "name": "EDI Rejection", "icon": "AlertTriangle", "description": "Rapid resolution of clearinghouse and payer-level EDI rejections."},
    {"id": "ar-followup", "name": "AR Followup", "icon": "PhoneCall", "description": "Aggressive aged AR follow-up to recover revenue and reduce days in AR."},
    {"id": "denial-followup", "name": "Denial Followup", "icon": "ShieldAlert", "description": "Root-cause denial management with payer-specific resolution playbooks."},
    {"id": "correspondence", "name": "Correspondence & Documentation", "icon": "Mailbox", "description": "Handle payer correspondence, medical records requests and documentation."},
    {"id": "patient-statement", "name": "Patient Statement", "icon": "Receipt", "description": "Compassionate patient statements, balance reminders and self-pay support."},
    {"id": "appeal-submission", "name": "Appeal Submission", "icon": "Gavel", "description": "Targeted first, second and third-level appeals with clinical attachments."},
    {"id": "credit-balance", "name": "Credit Balance", "icon": "TrendingDown", "description": "Identify, validate and resolve credit balances with compliant refunds."},
]


BLOG_POSTS = [
    {
        "id": "post-1",
        "slug": "reducing-days-in-ar-under-30",
        "title": "Bringing Days in AR Under 30: A Playbook for Independent Practices",
        "category": "AR Management",
        "excerpt": "Days in AR is the single most important indicator of revenue cycle health. Here is the framework we use to consistently push it under 30 days.",
        "read_time": "7 min read",
        "published_at": "2025-11-18",
        "author": "ZH Medsolutions Team",
        "cover": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&w=1400",
        "content": "Days in Accounts Receivable measures the velocity of collections. Practices that operate below 30 days enjoy healthier cash flow, lower bad-debt write offs, and stronger payer relationships. Our approach: (1) Front-end eligibility verification, (2) Same-day charge entry SLAs, (3) Clearinghouse rejection sweeps within 24 hours, (4) Aging-bucket prioritization (60+, 90+, 120+), (5) Payer-specific call cadences, (6) Continuous denial root-cause analytics. Combined, these levers typically drop days-in-AR by 15-20 days within the first 90 days of engagement."
    },
    {
        "id": "post-2",
        "slug": "denial-management-root-cause-analytics",
        "title": "Denial Management: Why Root-Cause Analytics Beat Re-Working Claims",
        "category": "Denials",
        "excerpt": "Re-working denied claims is reactive. Eliminating their root causes is transformational. A look at our denial intelligence layer.",
        "read_time": "6 min read",
        "published_at": "2025-11-04",
        "author": "ZH Medsolutions Team",
        "cover": "https://images.unsplash.com/photo-1639154968821-6dbc3efb8d23?crop=entropy&cs=srgb&fm=jpg&w=1400",
        "content": "Every denied claim has a story: a missing modifier, an expired authorization, an incorrect place-of-service code. Re-working the claim recovers the dollars once. But by tagging every denial by CARC/RARC, payer, provider, CPT and service line, you can engineer permanent fixes upstream. We typically see a 30-40% reduction in repeat denials within two quarters of analytics-driven feedback to coders and front-desk staff."
    },
    {
        "id": "post-3",
        "slug": "era-enrollment-guide-2025",
        "title": "The 2025 Guide to ERA Enrollment with Top US Payers",
        "category": "ERA & EDI",
        "excerpt": "ERA enrollment forms differ across payers. This guide walks through the most common requirements and pitfalls for the top 25 US payers.",
        "read_time": "9 min read",
        "published_at": "2025-10-21",
        "author": "ZH Medsolutions Team",
        "cover": "https://images.unsplash.com/photo-1746221331496-a87689fc8eb9?crop=entropy&cs=srgb&fm=jpg&w=1400",
        "content": "Electronic Remittance Advice (ERA) enrollment is the silent multiplier of revenue cycle efficiency. Each payer maintains its own enrollment portal, paper form, or clearinghouse pathway. In this guide, we break down: (a) Medicare CMS-588 EFT + ERA, (b) BCBS plan-by-plan workflows, (c) Aetna EnrollHub via CAQH, (d) UHC Optum Pay, (e) Cigna OneNet, and the common rejection reasons we see on day 1. Properly enrolled, ERA cuts posting time by up to 70%."
    },
    {
        "id": "post-4",
        "slug": "credentialing-checklist-new-provider",
        "title": "Onboarding a New Provider: The 60-Day Credentialing Checklist",
        "category": "Credentialing",
        "excerpt": "Credentialing delays cost revenue. Use this 60-day checklist to onboard a new provider without lost claims.",
        "read_time": "5 min read",
        "published_at": "2025-10-07",
        "author": "ZH Medsolutions Team",
        "cover": "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "content": "Hiring a new provider? Start credentialing 90 days before their first patient. The 60-day fast-track: Week 1 — NPI, CAQH attestation, malpractice COI. Week 2-4 — Submit enrollment to Medicare, Medicaid, top commercial payers. Week 5-8 — Follow-up cadence, hospital privileges, group linkages. Day 60 — Verify effective dates, build payer fee schedules, and unlock the new provider in your PM system."
    },
]


# ---------------- Helpers ----------------
def admin_auth(x_admin_token: Optional[str] = Header(None)):
    if x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return True


def generate_slots() -> List[str]:
    """9:00 AM to 5:30 PM EST in 30-min increments. 6 PM is the last possible end time so 5:30 is last slot."""
    slots = []
    t = time(9, 0)
    end = time(18, 0)
    cur = datetime.combine(date.today(), t)
    last = datetime.combine(date.today(), end)
    while cur < last:
        slots.append(cur.strftime("%H:%M"))
        cur += timedelta(minutes=30)
    return slots


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"service": "ZH Medsolutions API", "status": "ok"}


@api_router.get("/services")
async def list_services():
    return {"services": SERVICES}


@api_router.get("/blog")
async def list_blog():
    posts = [
        {k: v for k, v in p.items() if k != "content"}
        for p in BLOG_POSTS
    ]
    return {"posts": posts}


@api_router.get("/blog/{slug}")
async def get_blog(slug: str):
    for p in BLOG_POSTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(status_code=404, detail="Post not found")


@api_router.get("/bookings/availability")
async def availability(date_str: str):
    """Return available time slots for a date (YYYY-MM-DD)."""
    try:
        target = datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    # Disallow past dates
    today = datetime.now(timezone.utc).date()
    if target < today:
        return {"date": date_str, "slots": [], "reason": "past_date"}

    all_slots = generate_slots()
    booked_docs = await db.bookings.find({"date": date_str}, {"_id": 0, "time_slot": 1}).to_list(1000)
    booked = {d["time_slot"] for d in booked_docs}
    available = [{"time": s, "available": s not in booked} for s in all_slots]
    return {"date": date_str, "slots": available, "business_hours": "9:00 AM - 6:00 PM EST"}


@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    # Validate service
    valid_services = {s["id"] for s in SERVICES} | {s["name"] for s in SERVICES} | {"general"}
    if payload.service not in valid_services:
        raise HTTPException(status_code=400, detail="Invalid service")

    # Validate date
    try:
        target = datetime.strptime(payload.date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    today = datetime.now(timezone.utc).date()
    if target < today:
        raise HTTPException(status_code=400, detail="Cannot book a date in the past")

    # Validate slot
    if payload.time_slot not in generate_slots():
        raise HTTPException(status_code=400, detail="Time slot outside business hours (9 AM – 6 PM EST)")

    # Conflict check
    existing = await db.bookings.find_one({"date": payload.date, "time_slot": payload.time_slot})
    if existing:
        raise HTTPException(status_code=409, detail="This slot is no longer available. Please pick another time.")

    booking = Booking(**payload.model_dump())
    await db.bookings.insert_one(booking.model_dump())
    return booking


@api_router.get("/bookings", dependencies=[Depends(admin_auth)])
async def list_bookings():
    docs = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"bookings": docs}


@api_router.patch("/bookings/{booking_id}/status", dependencies=[Depends(admin_auth)])
async def update_booking_status(booking_id: str, status: str):
    if status not in {"pending", "confirmed", "completed", "cancelled"}:
        raise HTTPException(status_code=400, detail="Invalid status")
    res = await db.bookings.update_one({"id": booking_id}, {"$set": {"status": status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"id": booking_id, "status": status}


@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactCreate):
    msg = ContactMessage(**payload.model_dump())
    await db.contacts.insert_one(msg.model_dump())
    return msg


@api_router.get("/contact", dependencies=[Depends(admin_auth)])
async def list_contact():
    docs = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"messages": docs}


@api_router.post("/newsletter", response_model=NewsletterSubscriber)
async def subscribe_newsletter(payload: NewsletterSubscribe):
    existing = await db.newsletter.find_one({"email": payload.email.lower()})
    if existing:
        # idempotent — don't reveal whether email already exists, just return success
        return NewsletterSubscriber(email=payload.email.lower(), id=existing.get("id", _new_id()), created_at=existing.get("created_at", _utc_now_iso()))
    sub = NewsletterSubscriber(email=payload.email.lower())
    await db.newsletter.insert_one(sub.model_dump())
    return sub


@api_router.get("/newsletter", dependencies=[Depends(admin_auth)])
async def list_newsletter():
    docs = await db.newsletter.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return {"subscribers": docs}


@api_router.post("/admin/verify")
async def verify_admin(payload: dict):
    if payload.get("token") != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

"""Backend tests for ZH Medsolutions API."""
import os
import requests
from datetime import date, timedelta

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://provider-billing-hub.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_TOKEN = "zhmed-admin-2025"
ADMIN_HEADERS = {"X-Admin-Token": ADMIN_TOKEN}

# Use a future date that won't collide easily across runs
FUTURE_DATE = (date.today() + timedelta(days=30)).strftime("%Y-%m-%d")
PAST_DATE = (date.today() - timedelta(days=2)).strftime("%Y-%m-%d")


# -------- Services --------
def test_services_returns_12():
    r = requests.get(f"{API}/services")
    assert r.status_code == 200
    services = r.json()["services"]
    assert len(services) == 12
    for s in services:
        assert {"id", "name", "icon", "description"} <= set(s.keys())


# -------- Blog --------
def test_blog_list_returns_4():
    r = requests.get(f"{API}/blog")
    assert r.status_code == 200
    posts = r.json()["posts"]
    assert len(posts) == 4
    # excerpt list should not include full content
    assert "content" not in posts[0]


def test_blog_detail_ok():
    r = requests.get(f"{API}/blog/reducing-days-in-ar-under-30")
    assert r.status_code == 200
    data = r.json()
    assert data["slug"] == "reducing-days-in-ar-under-30"
    assert "content" in data and len(data["content"]) > 50


def test_blog_invalid_slug_404():
    r = requests.get(f"{API}/blog/nope-not-real")
    assert r.status_code == 404


# -------- Availability --------
def test_availability_future_18_slots():
    r = requests.get(f"{API}/bookings/availability", params={"date_str": FUTURE_DATE})
    assert r.status_code == 200
    data = r.json()
    assert len(data["slots"]) == 18
    times = [s["time"] for s in data["slots"]]
    assert times[0] == "09:00"
    assert times[-1] == "17:30"


def test_availability_past_date():
    r = requests.get(f"{API}/bookings/availability", params={"date_str": PAST_DATE})
    assert r.status_code == 200
    data = r.json()
    assert data["slots"] == []
    assert data.get("reason") == "past_date"


def test_availability_invalid_date():
    r = requests.get(f"{API}/bookings/availability", params={"date_str": "2026/07/15"})
    assert r.status_code == 400


# -------- Bookings --------
# Use unique slot per booking session
import uuid as _uuid
TEST_RUN_ID = _uuid.uuid4().hex[:6]
BOOKING_DATE = (date.today() + timedelta(days=45)).strftime("%Y-%m-%d")
BOOKING_SLOT = "10:00"

created_booking_id = None


def test_create_booking_valid():
    global created_booking_id
    payload = {
        "service": "era-enrollment",
        "full_name": f"TEST_{TEST_RUN_ID} User",
        "email": f"test_{TEST_RUN_ID}@example.com",
        "phone": "+1-555-000-1111",
        "company": "TestCo",
        "date": BOOKING_DATE,
        "time_slot": BOOKING_SLOT,
        "notes": "test booking"
    }
    r = requests.post(f"{API}/bookings", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data
    assert data["status"] == "pending"
    assert data["service"] == "era-enrollment"
    created_booking_id = data["id"]


def test_create_booking_conflict_409():
    payload = {
        "service": "era-enrollment",
        "full_name": "Dup",
        "email": "dup@example.com",
        "phone": "+1-555-000-2222",
        "date": BOOKING_DATE,
        "time_slot": BOOKING_SLOT,
    }
    r = requests.post(f"{API}/bookings", json=payload)
    assert r.status_code == 409


def test_create_booking_invalid_slot_400():
    payload = {
        "service": "era-enrollment",
        "full_name": "A B", "email": "a@b.com", "phone": "1",
        "date": BOOKING_DATE, "time_slot": "19:00",
    }
    r = requests.post(f"{API}/bookings", json=payload)
    assert r.status_code == 400


def test_create_booking_past_date_400():
    payload = {
        "service": "era-enrollment",
        "full_name": "A B", "email": "a@b.com", "phone": "1",
        "date": PAST_DATE, "time_slot": "10:00",
    }
    r = requests.post(f"{API}/bookings", json=payload)
    assert r.status_code == 400


def test_create_booking_invalid_service_400():
    payload = {
        "service": "not-a-service",
        "full_name": "A B", "email": "a@b.com", "phone": "1",
        "date": BOOKING_DATE, "time_slot": "11:00",
    }
    r = requests.post(f"{API}/bookings", json=payload)
    assert r.status_code == 400


def test_list_bookings_requires_admin():
    r = requests.get(f"{API}/bookings")
    assert r.status_code == 401


def test_list_bookings_admin_ok():
    r = requests.get(f"{API}/bookings", headers=ADMIN_HEADERS)
    assert r.status_code == 200
    bookings = r.json()["bookings"]
    assert isinstance(bookings, list)
    if created_booking_id:
        ids = [b["id"] for b in bookings]
        assert created_booking_id in ids


def test_update_booking_status_admin():
    assert created_booking_id is not None
    r = requests.patch(
        f"{API}/bookings/{created_booking_id}/status",
        params={"status": "confirmed"},
        headers=ADMIN_HEADERS,
    )
    assert r.status_code == 200
    assert r.json()["status"] == "confirmed"


def test_update_booking_status_invalid():
    assert created_booking_id is not None
    r = requests.patch(
        f"{API}/bookings/{created_booking_id}/status",
        params={"status": "foo"},
        headers=ADMIN_HEADERS,
    )
    assert r.status_code == 400


# -------- Contact --------
created_contact_email = f"contact_{TEST_RUN_ID}@example.com"


def test_create_contact_ok():
    payload = {
        "name": f"TEST_{TEST_RUN_ID}",
        "email": created_contact_email,
        "message": "Hello, please reach out.",
    }
    r = requests.post(f"{API}/contact", json=payload)
    assert r.status_code == 200
    assert "id" in r.json()


def test_list_contact_unauth():
    r = requests.get(f"{API}/contact")
    assert r.status_code == 401


def test_list_contact_admin_includes_message():
    r = requests.get(f"{API}/contact", headers=ADMIN_HEADERS)
    assert r.status_code == 200
    emails = [m["email"] for m in r.json()["messages"]]
    assert created_contact_email in emails


# -------- Admin Verify --------
def test_admin_verify_ok():
    r = requests.post(f"{API}/admin/verify", json={"token": ADMIN_TOKEN})
    assert r.status_code == 200
    assert r.json()["ok"] is True


def test_admin_verify_wrong():
    r = requests.post(f"{API}/admin/verify", json={"token": "wrong"})
    assert r.status_code == 401

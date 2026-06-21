import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BRAND } from "@/lib/api";
import { HOME } from "@/constants/testIds";

const links = [
  { to: "/", label: "Home", tid: HOME.navHome },
  { to: "/#services", label: "Services", tid: HOME.navServices },
  { to: "/#about", label: "About Us", tid: HOME.navAbout },
  { to: "/resources", label: "Resources", tid: HOME.navResources },
  { to: "/#contact", label: "Contact", tid: HOME.navContact },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHash = (to) => {
    setOpen(false);
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: id } });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(to);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-200/70 shadow-[0_1px_0_rgba(46,90,110,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link
          to="/"
          data-testid={HOME.navLogo}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <span className="absolute -inset-1 rounded-lg bg-[#A8C5D6]/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <img
              src={BRAND.logo}
              alt="ZH Medsolutions"
              className="relative h-11 w-11 rounded-lg object-cover ring-1 ring-[#2E5A6E]/15 shadow-[0_2px_8px_rgba(46,90,110,0.15)]"
            />
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-extrabold text-[15px] text-slate-900 tracking-tight">
              ZH Medsolutions
            </div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-[#2E5A6E]/80 font-semibold">
              Revenue Cycle Experts
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <button
              key={l.label}
              data-testid={l.tid}
              onClick={() => goHash(l.to)}
              className="nav-link font-display text-[14px] font-medium text-slate-700 hover:text-[#2E5A6E]"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            data-testid={HOME.navBookCta}
            onClick={() => navigate("/book")}
            className="brand-btn h-10 px-5 rounded-md font-display font-semibold"
          >
            Book a Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              aria-label="Open menu"
              className="lg:hidden p-2 rounded-md hover:bg-slate-100 text-slate-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-white">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between pb-6 border-b">
                <div className="flex items-center gap-2">
                  <img src={BRAND.logo} alt="ZH" className="h-8 w-8 rounded" />
                  <span className="font-display font-bold">ZH Medsolutions</span>
                </div>
                <button onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 py-6">
                {links.map((l) => (
                  <button
                    key={l.label}
                    onClick={() => goHash(l.to)}
                    className="text-left px-3 py-3 rounded-md font-display text-slate-800 hover:bg-slate-100"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
              <div className="mt-auto pb-6">
                <Button
                  onClick={() => {
                    setOpen(false);
                    navigate("/book");
                  }}
                  className="brand-btn w-full h-11 font-display font-semibold"
                >
                  Book a Consultation
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "18507763864"; // +1 (850) 776-3864 in wa.me format
const PREFILL =
  "Hi ZH Medsolutions, I'd like to learn more about your medical billing services.";

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    const labelT = setTimeout(() => setShowLabel(true), 1800);
    const hideT = setTimeout(() => setShowLabel(false), 6000);
    return () => {
      clearTimeout(t);
      clearTimeout(labelT);
      clearTimeout(hideT);
    };
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {/* Speech bubble label */}
      <span
        className={`hidden sm:inline-flex items-center bg-white text-slate-800 text-sm font-display font-semibold px-3.5 py-2 rounded-full shadow-[0_8px_24px_-8px_rgba(15,23,42,0.25)] border border-slate-200 transition-all duration-300 ${
          showLabel ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        }`}
      >
        Chat with us
        <span className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </span>

      {/* WhatsApp pill */}
      <span className="relative group inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] hover:bg-[#1DBE5A] active:scale-95 transition-all">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative h-7 w-7"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.78 11.78 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.83 11.83 0 0 0 5.64 1.43h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.43Zm-8.48 18.2h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.8 1 1.01-3.7-.23-.38a9.83 9.83 0 0 1-1.5-5.18C2.14 6.4 6.59 1.95 12.04 1.95c2.62 0 5.08 1.02 6.93 2.88a9.7 9.7 0 0 1 2.87 6.94c0 5.45-4.44 9.91-9.8 9.91Zm5.43-7.41c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.67-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.18-.24-.58-.49-.5-.66-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.34Z" />
        </svg>
      </span>
    </a>
  );
}

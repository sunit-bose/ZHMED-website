import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Landing from "@/pages/Landing";
import Booking from "@/pages/Booking";
import Resources from "@/pages/Resources";
import ResourceDetail from "@/pages/ResourceDetail";
import Admin from "@/pages/Admin";
import WhatsAppFab from "@/components/WhatsAppFab";
import { Toaster } from "@/components/ui/sonner";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App min-h-screen flex flex-col bg-[#FAFCFD]">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFab />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;

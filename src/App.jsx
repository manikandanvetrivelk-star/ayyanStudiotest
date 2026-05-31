import { useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar        from "./components/Navbar";
import Hero          from "./components/Hero";
import Marquee       from "./components/Marquee";
import ContactDetails from "./components/ContactDetails";
import Footer         from "./components/Footer";
import Lightbox       from "./components/Lightbox";
import BookingModal   from "./components/BookingModal";
import WorkPopup      from "./components/WorkPopup";

import FlowView from "./views/FlowView";
import GridView from "./views/GridView";
import MapView  from "./views/MapView";

import "./styles/globals.css";
import "./App.css";
import About from "./components/About";

/**
 * App
 * ───
 * Shared page layout and routing.
 */
export default function App() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState(null);
  const [brandPopupOpen, setBrandPopupOpen] = useState(false);
  const [brandPopupMode, setBrandPopupMode] = useState("view");

  const openLightbox  = useCallback((photo) => setActivePhoto(photo), []);
  const closeLightbox = useCallback(() => setActivePhoto(null), []);
  const navigateLightbox = useCallback((photo) => setActivePhoto(photo), []);

  const openBooking = useCallback((type = null) => {
    setBookingType(type);
    setBookingOpen(true);
    setBrandPopupOpen(false);
  }, []);
  const closeBooking = useCallback(() => {
    setBookingOpen(false);
    setBookingType(null);
  }, []);
  const openBrandPopup = useCallback((mode = "view") => {
    setBrandPopupMode(mode);
    setBrandPopupOpen(true);
    setBookingOpen(false);
  }, []);
  const closeBrandPopup = useCallback(() => setBrandPopupOpen(false), []);

  return (
    <div className="app">
      <Navbar onBookClick={() => openBrandPopup("book")} onServicesClick={() => openBrandPopup("view")} />

      <main className="app__main">
        <Marquee />
        <Hero onWorkClick={() => openBrandPopup("view")} onBookClick={() => openBrandPopup("book")} />
        <About/ >
        <ContactDetails />
       
      </main>
      <BookingModal
        isOpen={bookingOpen}
        onClose={closeBooking}
        defaultShootType={bookingType}
      />
      <WorkPopup
        isOpen={brandPopupOpen}
        mode={brandPopupMode}
        onClose={closeBrandPopup}
        onBookNow={openBooking}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#11100d",
            color: "#f5ede0",
            border: "1px solid rgba(201,168,92,0.2)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          },
        }}
      />
      <Lightbox
        photo={activePhoto}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </div>
  );
}

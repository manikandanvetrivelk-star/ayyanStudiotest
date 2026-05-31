import { useEffect } from "react";
import BookingForm from "./BookingForm";
import "./BookingModal.css";

export default function BookingModal({ isOpen, onClose, defaultShootType }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl h-auto max-h-[90vh] overflow-y-auto rounded-[28px] border border-[#c9a85c30] bg-[#0f0b08] p-6 shadow-glow md:p-10 booking-modal-scroll">
        <button
          type="button"
          aria-label="Close booking form"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a85c660] bg-[#14100c] text-xl text-[#f5ede0] transition hover:bg-[#1f1a15]"
        >
          ×
        </button>

        <BookingForm defaultShootType={defaultShootType} onClose={onClose} />
      </div>
    </div>
  );
}

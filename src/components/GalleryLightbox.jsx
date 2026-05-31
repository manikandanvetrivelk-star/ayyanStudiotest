import { useCallback, useEffect, useState } from "react";
import { useLightbox } from "../hooks/useLightbox";

export default function GalleryLightbox({ items, index, onClose, onIndexChange }) {
  const current = index !== null ? { idx: index } : null;

  const item = index !== null ? items[index] : null;
  const src = item ? (typeof item === "string" ? item : item.src || item) : null;

  const handlePrev = useCallback(() => {
    if (index === null) return;
    const next = (index - 1 + items.length) % items.length;
    onIndexChange(next);
  }, [index, items.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (index === null) return;
    const next = (index + 1) % items.length;
    onIndexChange(next);
  }, [index, items.length, onIndexChange]);

  useLightbox(current, onClose, handlePrev, handleNext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // prevent background scrolling while lightbox open
    if (index !== null) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [index]);

  // show loading indicator while main image decodes, and preload neighbors
  useEffect(() => {
    if (index === null) return;
    setLoading(true);

    const img = new Image();
    img.src = src;
    img.onload = () => setLoading(false);

    // preload neighbors
    const prev = new Image();
    const next = new Image();
    prev.src = items[(index - 1 + items.length) % items.length];
    next.src = items[(index + 1) % items.length];

    return () => {
      img.onload = null;
    };
  }, [index, src, items]);

  if (index === null) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label="Image viewer"
    >
      <button
        className="absolute top-6 right-6 z-60 rounded bg-white/10 px-3 py-2 text-sm text-white"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <button
        className="absolute left-6 z-60 rounded bg-white/10 px-3 py-2 text-2xl text-white"
        onClick={handlePrev}
        aria-label="Previous"
      >
        ‹
      </button>

      <div className="flex items-center justify-center">
        {loading && (
          <div className="absolute z-60 flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-white/60" />
          </div>
        )}

        <img
          src={src}
          alt="Preview"
          className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-lg"
          style={{ visibility: loading ? "hidden" : "visible" }}
          loading="eager"
        />
      </div>

      <button
        className="absolute right-6 z-60 rounded bg-white/10 px-3 py-2 text-2xl text-white"
        onClick={handleNext}
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
}

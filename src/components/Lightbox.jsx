import { useCallback } from "react";
import { PHOTOS } from "../data/photos";
import { useLightbox } from "../hooks/useLightbox";
import "./Lightbox.css";

/**
 * Lightbox
 * Full-screen overlay for viewing a single photo.
 * Controlled by parent via `photo` prop (null = closed).
 */
export default function Lightbox({ photo, onClose, onNavigate }) {
  const handlePrev = useCallback(() => {
    if (!photo) return;
    const idx = PHOTOS.findIndex((p) => p.id === photo.id);
    onNavigate(PHOTOS[(idx - 1 + PHOTOS.length) % PHOTOS.length]);
  }, [photo, onNavigate]);

  const handleNext = useCallback(() => {
    if (!photo) return;
    const idx = PHOTOS.findIndex((p) => p.id === photo.id);
    onNavigate(PHOTOS[(idx + 1) % PHOTOS.length]);
  }, [photo, onNavigate]);

  useLightbox(photo, onClose, handlePrev, handleNext);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`lightbox${photo ? " lightbox--open" : ""}`}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label={photo ? `Photo: ${photo.location}` : "Photo viewer"}
    >
      {photo && (
        <>
          <button className="lightbox__close" onClick={onClose} aria-label="Close">
            ESC / CLOSE
          </button>

          <button className="lightbox__nav lightbox__nav--prev" onClick={handlePrev} aria-label="Previous photo">
            ‹
          </button>

          <img
            key={photo.id}
            src={photo.src}
            alt={photo.location}
            className="lightbox__img"
          />

          <button className="lightbox__nav lightbox__nav--next" onClick={handleNext} aria-label="Next photo">
            ›
          </button>

          <div className="lightbox__meta">
            <span className="lightbox__location">{photo.location}</span>
            <div className="lightbox__exif">
              <span>{photo.date}</span>
              <span>{photo.camera}</span>
              <span>{photo.aperture}</span>
              <span>{photo.shutter}</span>
              <span>{photo.iso}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

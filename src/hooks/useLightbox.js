import { useEffect, useCallback } from "react";

/**
 * useLightbox
 * Handles keyboard navigation and escape-to-close for the lightbox.
 *
 * @param {object|null} current  - currently open photo (null = closed)
 * @param {Function}    onClose  - called when user presses Escape
 * @param {Function}    onPrev   - called when user presses ArrowLeft
 * @param {Function}    onNext   - called when user presses ArrowRight
 */
export function useLightbox(current, onClose, onPrev, onNext) {
  const handleKey = useCallback(
    (e) => {
      if (!current) return;
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    },
    [current, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);
}

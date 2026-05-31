import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";

export default function BrandGallery({ title, subtitle, photos, onBack }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openAt = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#c9a85c] transition hover:text-[#e8d5a3]"
          >
            ← Back
          </button>
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#c9a85c]">Explore the collection</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d9cbae]">{subtitle}</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="group overflow-hidden rounded-[32px] border border-white/10 bg-[#0f0b08] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
          >
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              onClick={() => openAt(i)}
              className="h-96 w-full object-cover transition duration-500 group-hover:scale-105 cursor-pointer"
            />
            <div className="space-y-2 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-[#f5ede0]">{photo.title}</span>
                <span className="text-xs uppercase tracking-[0.25em] text-[#c9a85c]">{photo.category}</span>
              </div>
              <p className="text-sm text-[#d9cbae]">{photo.client}</p>
              <p className="text-xs text-[#a8a29e]">{photo.location}</p>
            </div>
          </div>
        ))}
      </div>

      <GalleryLightbox
        items={photos.map((p) => p.src)}
        index={lightboxIndex}
        onClose={close}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}

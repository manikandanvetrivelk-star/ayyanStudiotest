import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";

const SURPRISE_IMAGES = [
  "AYN00281.JPG.jpeg",
  "AYN00282.JPG.jpeg",
  "AYN00285.JPG.jpeg",
  "AYN00290.JPG.jpeg",
  "AYN00292.JPG.jpeg",
  "IMG_3537.HEIC",
  "IMG_3545.HEIC",
  "IMG_3547.HEIC",
  "IMG_3576.HEIC",
  "IMG_3596.HEIC",
];

function SessionGallery({ title, description, images, folder, onBack, onBook, shootType }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openAt = (i) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#c9a85c] transition hover:text-[#e8d5a3]"
          >
            ← Back
          </button>
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-[#c9a85c]">Explore the collection</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#d9cbae]">{description}</p>
        </div>
        
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image, i) => (
          <div
            key={image}
            className="overflow-hidden rounded-[32px] bg-[#0f0b08] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
          >
            <img
              src={`/images/${folder}/${image}`}
              alt="Surprise image"
              loading="lazy"
              className="h-80 w-full object-cover cursor-pointer"
              onClick={() => openAt(i)}
            />
          </div>
        ))}
      </div>

      <GalleryLightbox
        items={images.map((im) => `/images/${folder}/${im}`)}
        index={lightboxIndex}
        onClose={close}
        onIndexChange={setLightboxIndex}
      />
    </div>
  );
}

export default function AyyanSurpriseGallery({ onBack, onBookNow }) {
  return (
    <SessionGallery
      title="Ayyan Surprises"
      description="Birthday, anniversary and surprise event photography designed to make every moment unforgettable."
      images={SURPRISE_IMAGES}
      folder="surprise"
      onBack={onBack}
      onBook={onBookNow}
      shootType="Surprise"
    />
  );
}

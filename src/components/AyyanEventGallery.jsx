const EVENTS_IMAGES = [
  "1Y5A8376.JPG",
  "1Y5A8381.JPG",
  "1Y5A8397.JPG",
  "1Y5A8398.JPG",
  "1Y5A8407.JPG",
  "1Y5A8412.JPG",
  "1Y5A8441.JPG",
  "1Y5A8447.JPG",
  "1Y5A8455.JPG",
  "1Y5A8458.JPG",
  "1Y5A8476.JPG",
  "1Y5A8515.JPG",
  "1Y5A8516.JPG",
  "1Y5A8566.JPG",
  "1Y5A8592.JPG",
  "1Y5A8609.JPG",
  "1Y5A8611.JPG",
  "1Y5A8911.JPG",
  "1Y5A8914.JPG",
  "AYN01615.JPG",
  "DSC03923.JPG",
  "DSC04022.JPG",
  "DSC04023.JPG",
  "DSC04025.JPG",
  "DSC04046.JPG",
];

import { useState } from "react";
import GalleryLightbox from "./GalleryLightbox";

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
              alt="Event image"
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

export default function AyyanEventGallery({ onBack, onBookNow }) {
  return (
    <SessionGallery
      title="Ayyan Events"
      description="Grand ceremonies, ring celebrations and naming rituals brought to life with cinematic storytelling."
      images={EVENTS_IMAGES}
      folder="events"
      onBack={onBack}
      onBook={onBookNow}
      shootType="Event"
    />
  );
}

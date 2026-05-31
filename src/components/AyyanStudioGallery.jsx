import { useState } from "react";
import ShootTypeCard from "./ShootTypeCard";
import BrandGallery from "./BrandGallery";
import { PHOTOS } from "../data/photos";
import GalleryLightbox from "./GalleryLightbox";

const MATERNITY_IMAGES = [
  "AYN00158.jpg",
  "AYN00230.jpg",
  "AYN00346.jpg",
  "AYN00425.jpg",
  "AYN02557.jpg",
  "AYN02562.jpg",
  "AYN03874.jpg",
  "AYN03900.jpg",
  "AYN03925.jpg",
  "AYN03977.jpg",
  "AYN03987.jpg",
  "AYN04521.jpg",
  "AYN04548.jpg",
  "AYN04574.jpg",
  "AYN04688.jpg",
  "DSC00678.jpg",
  "DSC00736.jpg",
  "DSC00772-2.jpg",
];

const NEWBORN_IMAGES = [
  "AYN06314.jpg",
  "AYN06332.jpg",
  "AYN06366.jpg",
  "AYN06377.jpg",
  "AYN07109.jpg",
  "AYN07169.jpg",
  "AYN07193.jpg",
  "AYN07198.jpg",
  "AYN07211.jpg",
  "AYN08810.jpg",
  "AYN08938.jpg",
  "AYN08975.jpg",
  "AYN09522.jpg",
  "DSC04032.jpg",
  "DSC04050.jpg",
  "DSC09831.jpg",
];

const TODDLER_IMAGES = [
  "AYN00314.jpg",
  "AYN03090.jpg",
  "AYN03092.jpg",
  "AYN03397.jpg",
  "AYN03460.jpg",
  "AYN03477.jpg",
  "AYN04397.jpg",
  "AYN09055.jpg",
  "DSC02026.jpg",
  "DSC02033.jpg",
  "DSC02072.jpg",
  "DSC02089.jpg",
  "DSC02778.jpg",
  "DSC02786.jpg",
  "DSC02793.jpg",
  "DSC04994.jpg",
  "DSC05097.jpg",
  "DSC05115.jpg",
  "DSC05239.jpg",
];

const SHOOT_TYPES = [
  {
    key: "maternity",
    image: "/images/metanity_main.jpg",
    title: "Maternity Shoot",
    description: "Beautiful pregnancy portraits capturing this special moment in your journey to motherhood.",
  },
  {
    key: "newborn",
    image: "/images/newborn_main.jpg",
    title: "Newborn Shoot",
    description: "Tender moments with your newborn captured with care, comfort and artistic vision.",
  },
  {
    key: "toddler",
    image: "/images/toddler_main.jpg",
    title: "Toddler Shoot",
    description: "Playful and joyful portraits of your little ones as they grow and explore the world.",
  },
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
              alt="Session image"
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

export default function AyyanStudioGallery({ onBack, onBookNow, mode = "view" }) {
  const [selectedShootType, setSelectedShootType] = useState(null);

  const handleShootTypeCardSelect = (key) => {
    if (mode !== "view" && onBookNow) {
      const formatted = key.charAt(0).toUpperCase() + key.slice(1);
      return onBookNow(formatted);
    }

    return setSelectedShootType(key);
  };

  if (selectedShootType) {
    if (selectedShootType === "maternity") {
      const selectedType = SHOOT_TYPES.find((st) => st.key === selectedShootType);
      return (
        <SessionGallery
          title={selectedType?.title || "Maternity Shoot"}
          description={selectedType?.description || ""}
          images={MATERNITY_IMAGES}
          folder="metanity"
          onBack={() => setSelectedShootType(null)}
          onBook={() => onBookNow?.("Maternity")}
          shootType="Maternity"
        />
      );
    }

    if (selectedShootType === "newborn") {
      const selectedType = SHOOT_TYPES.find((st) => st.key === selectedShootType);
      return (
        <SessionGallery
          title={selectedType?.title || "Newborn Shoot"}
          description={selectedType?.description || ""}
          images={NEWBORN_IMAGES}
          folder="newborn"
          onBack={() => setSelectedShootType(null)}
          onBook={() => onBookNow?.("Newborn")}
          shootType="Newborn"
        />
      );
    }

    if (selectedShootType === "toddler") {
      const selectedType = SHOOT_TYPES.find((st) => st.key === selectedShootType);
      return (
        <SessionGallery
          title={selectedType?.title || "Toddler Shoot"}
          description={selectedType?.description || ""}
          images={TODDLER_IMAGES}
          folder="toddler"
          onBack={() => setSelectedShootType(null)}
          onBook={() => onBookNow?.("Toddler")}
          shootType="Toddler"
        />
      );
    }

    const shootTypePhotos = PHOTOS.filter(
      (photo) => photo.studioShootType === selectedShootType
    ).slice(0, 9);

    return (
      <BrandGallery
        title={SHOOT_TYPES.find((st) => st.key === selectedShootType)?.title || "Studio Session"}
        subtitle={SHOOT_TYPES.find((st) => st.key === selectedShootType)?.description || ""}
        photos={shootTypePhotos.length > 0 ? shootTypePhotos : []}
        onBack={() => setSelectedShootType(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c9a85c]">Studio Sessions</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Ayyan Studio
        </h2>
        <p className="mx-auto max-w-3xl text-sm leading-7 text-[#d9cbae]">
          Choose a shoot type to explore our portfolio. Each session is crafted to capture the beauty and joy of your precious moments.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {SHOOT_TYPES.map((shootType) => (
          <ShootTypeCard
            key={shootType.key}
            shootType={shootType}
            onSelect={handleShootTypeCardSelect}
          />
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#c9a85c] transition hover:text-[#e8d5a3]"
        >
          ← Back to Brands
        </button>
      </div>
    </div>
  );
}

export { SHOOT_TYPES };
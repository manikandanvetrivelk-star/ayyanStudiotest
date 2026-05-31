import { useEffect, useState } from "react";
import BrandLogoCard from "./BrandLogoCard";
import AyyanStudioGallery, { SHOOT_TYPES as STUDIO_SHOOT_TYPES } from "./AyyanStudioGallery";
import AyyanEventGallery from "./AyyanEventGallery";
import AyyanSurpriseGallery from "./AyyanSurpriseGallery";
import ShootTypeCard from "./ShootTypeCard";
import BookingForm from "./BookingForm";

const BRANDS = [
  {
    key: "studio",
    title: "Ayyan Studio",
    subtitle: "Studio photography, portraits and celebration stories from our flagship brand.",
    logo: "/images/Ayyan-studio-logo.PNG",
    component: AyyanStudioGallery,
  },
  {
    key: "events",
    title: "Ayyan Events",
    subtitle: "Event coverage for weddings, engagement ceremonies and naming celebrations.",
    logo: "/images/Ayyan-events-logo.PNG",
    component: AyyanEventGallery,
  },
  {
    key: "surprises",
    title: "Ayyan Surprises",
    subtitle: "Birthday, anniversary and surprise moment photography with a festive touch.",
    logo: "/images/Ayyan-surprise-logo.PNG",
    component: AyyanSurpriseGallery,
  },
];

function formatShootType(key) {
  if (!key) return "";
  return key.charAt(0).toUpperCase() + key.slice(1);
}

export default function WorkPopup({ isOpen, mode = "view", onClose, onBookNow }) {
  const [activeBrand, setActiveBrand] = useState(null);
  const [selectedStudioShoot, setSelectedStudioShoot] = useState(null);
  const isBookingMode = mode === "book";

  useEffect(() => {
    if (!isOpen) {
      setActiveBrand(null);
      setSelectedStudioShoot(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const brand = BRANDS.find((item) => item.key === activeBrand);
  const ActiveGallery = brand?.component ?? null;

  const handleBack = () => {
    if (selectedStudioShoot) {
      setSelectedStudioShoot(null);
      return;
    }
    setActiveBrand(null);
  };

  const renderBrandSelection = () => (
    <div className="space-y-8">
      <div className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c9a85c]">Ayyan work showcase</p>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">
          Choose a logo to explore the collection
        </h2>
        <p className="mx-auto max-w-3xl text-sm leading-7 text-[#d9cbae]">
          Select one of the three brands below to {(isBookingMode ? "book a session" : "view the portfolio")}. The logos are clickable and will show the next step.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {BRANDS.map((brandItem) => (
          <BrandLogoCard
            key={brandItem.key}
            brand={brandItem}
            onSelect={setActiveBrand}
          />
        ))}
      </div>
    </div>
  );

  const renderStudioBookingSelection = () => (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#c9a85c] transition hover:text-[#e8d5a3]"
        >
          ← Back
        </button>

        <div className="space-y-3 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a85c]">Studio Sessions</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Choose the shoot type</h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-[#d9cbae]">
            Pick a type below to open the booking form with the selected session prefilled.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {STUDIO_SHOOT_TYPES.map((shootType) => (
          <ShootTypeCard
            key={shootType.key}
            shootType={shootType}
            onSelect={setSelectedStudioShoot}
          />
        ))}
      </div>
    </div>
  );

  const renderBookingForm = (shootType, title, description) => (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#c9a85c] transition hover:text-[#e8d5a3]"
        >
          ← Back
        </button>

        <div className="max-w-3xl text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c9a85c]">Book a Session</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#d9cbae]">{description}</p>
        </div>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-[#14100c] p-6">
        <BookingForm defaultShootType={shootType} onClose={onClose} />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-7xl max-h-[calc(100vh-4rem)] overflow-hidden rounded-[32px] border border-[#c9a85c30] bg-[#0f0b08] shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          aria-label="Close work popup"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#14100c] text-2xl text-[#f5ede0] transition hover:bg-[#1f1a15]"
        >
          ×
        </button>

        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          {!brand ? (
            renderBrandSelection()
          ) : brand.key === "studio" ? (
            isBookingMode ? (
              selectedStudioShoot ? (
                renderBookingForm(
                  formatShootType(selectedStudioShoot),
                  `${formatShootType(selectedStudioShoot)} Shoot Booking`,
                  `Book your ${formatShootType(selectedStudioShoot)} shoot with the session preselected for a faster checkout.`
                )
              ) : (
                renderStudioBookingSelection()
              )
            ) : (
              <AyyanStudioGallery onBack={() => setActiveBrand(null)} onBookNow={onBookNow} />
            )
          ) : isBookingMode ? (
            renderBookingForm(
              brand.key === "events" ? "Event" : "Surprise",
              brand.title,
              `Fill the booking form for ${brand.title} with the shoot type preset to ${brand.key === "events" ? "Event" : "Surprise"}.`
            )
          ) : (
            <ActiveGallery onBack={() => setActiveBrand(null)} onBookNow={onBookNow} />
          )}
        </div>
      </div>
    </div>
  );
}

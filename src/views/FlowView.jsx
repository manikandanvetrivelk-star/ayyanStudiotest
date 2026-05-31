import { PHOTOS } from "../data/photos";
import GalleryHeader from "../components/GalleryHeader";
import "./FlowView.css";

/**
 * FlowView
 * Full-width vertical scroll — each photo bleeds edge-to-edge.
 * Aspect variant (tall / wide / square) controls max-height.
 * EXIF metadata fades in on hover.
 */
export default function FlowView({ onPhotoClick }) {
  return (
    <section className="flow">
      <div className="flow__wrapper">
        <GalleryHeader title="Flow — Vertical" />

        <div className="flow__list">
          {PHOTOS.map((photo) => (
            <article
              key={photo.id}
              className={`flow__item flow__item--${photo.aspect}`}
              onClick={() => onPhotoClick(photo)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${photo.location}`}
              onKeyDown={(e) => e.key === "Enter" && onPhotoClick(photo)}
            >
              <img
                src={photo.src}
                alt={photo.location}
                className="flow__img"
                loading="lazy"
              />

              <div className="flow__meta">
                <div>
                  <p className="flow__meta-location">{photo.location}</p>
                  <p className="flow__meta-date">{photo.date}</p>
                </div>
                <div className="flow__exif">
                  <span>{photo.aperture}</span>
                  <span>{photo.shutter}</span>
                  <span>{photo.iso}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

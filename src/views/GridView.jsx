import { PHOTOS } from "../data/photos";
import GalleryHeader from "../components/GalleryHeader";
import "./GridView.css";

/**
 * GridView
 * Responsive mosaic grid of square-cropped photos.
 * Location and date overlay appears on hover.
 */
export default function GridView({ onPhotoClick }) {
  return (
    <section className="grid-view">
      <div className="grid-view__wrapper">
        <GalleryHeader title="Grid — Mosaic" />

        <div className="grid-view__grid">
          {PHOTOS.map((photo) => (
            <article
              key={photo.id}
              className="grid-view__item"
              onClick={() => onPhotoClick(photo)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${photo.location}`}
              onKeyDown={(e) => e.key === "Enter" && onPhotoClick(photo)}
            >
              <img
                src={photo.src}
                alt={photo.location}
                className="grid-view__img"
                loading="lazy"
              />

              <div className="grid-view__overlay">
                <p className="grid-view__location">{photo.location}</p>
                <p className="grid-view__date">{photo.date} · {photo.aperture}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

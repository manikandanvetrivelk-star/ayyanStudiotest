import { PHOTOS } from "../data/photos";
import GalleryHeader from "../components/GalleryHeader";
import "./MapView.css";

/**
 * MapView
 * Tabular index of all frames: number — thumbnail + location — EXIF tags.
 * Named "Map" (matching the original site) though it acts as a sortable index.
 */
export default function MapView({ onPhotoClick }) {
  return (
    <section className="map-view">
      <div className="map-view__wrapper">
        <GalleryHeader title="Index — All Frames" />

        <div className="map-view__list" role="list">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.id}
              className="map-view__row"
              role="listitem"
              onClick={() => onPhotoClick(photo)}
              tabIndex={0}
              aria-label={`Open ${photo.location}`}
              onKeyDown={(e) => e.key === "Enter" && onPhotoClick(photo)}
            >
              {/* Index number */}
              <span className="map-view__num">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Thumbnail + location */}
              <div className="map-view__info">
                <img
                  src={photo.src}
                  alt=""
                  aria-hidden="true"
                  className="map-view__thumb"
                  loading="lazy"
                />
                <div>
                  <p className="map-view__location">{photo.location}</p>
                  <p className="map-view__date">{photo.date} · {photo.camera}</p>
                </div>
              </div>

              {/* EXIF pill tags */}
              <div className="map-view__exif">
                {[photo.aperture, photo.shutter, photo.iso].map((val) => (
                  <span key={val} className="map-view__tag">{val}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

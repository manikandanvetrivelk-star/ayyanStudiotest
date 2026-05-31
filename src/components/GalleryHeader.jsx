import { PHOTOS } from "../data/photos";
import "./GalleryHeader.css";

/**
 * GalleryHeader
 * Thin strip above each gallery view showing the current view name and total count.
 */
export default function GalleryHeader({ title }) {
  return (
    <div className="gallery-header">
      <span className="gallery-header__title label">{title}</span>
      <span className="gallery-header__count">{PHOTOS.length} photographs</span>
    </div>
  );
}

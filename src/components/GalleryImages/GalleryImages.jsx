import React from "react";
import "./GalleryImages.css";
import { useGalleryImages } from "../../hooks/useGalleryImages";

function GalleryImages() {
  const {
    hoveredIndex,
    images,
    selectedCount,
    checkedImages,
    handleImageHover,
    handleImageClick,
    handleDeleteSelected,
    handleDragStart,
    handleDragOver,
  } = useGalleryImages();

  return (
    <>
      <div className="gallery-action">
        <div className="selected-count">Selected: {selectedCount}</div>
        {selectedCount > 0 && (
          <button onClick={handleDeleteSelected} className="delete-button">
            Delete Selected
          </button>
        )}
      </div>

      <div className="checkable-images">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${index === 0 ? "big" : ""} ${
              index === hoveredIndex ? "dragging" : ""
            }`}
            onMouseEnter={() => handleImageHover(index)}
            onMouseLeave={() => handleImageHover(null)}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            draggable="true"
          >
            <input
              type="checkbox"
              checked={checkedImages[index]}
              onChange={() => handleImageClick(index)}
              style={{ display: "none" }}
            />
            <img src={image} alt={`Checkable Image ${index + 1}`} />
            {hoveredIndex === index && (
              <div className="overlay">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={checkedImages[index]}
                    onChange={() => handleImageClick(index)}
                  />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default GalleryImages;

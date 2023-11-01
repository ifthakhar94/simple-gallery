// Custom hook to manage gallery state and logic
import { useState } from "react";
import image1 from "./../images/gallery-1.jpg";
import image2 from "./../images/gallery-2.jpg";
import image3 from "./../images/gallery-3.jpg";
import image4 from "./../images/gallery-4.jpg";
import image5 from "./../images/gallery-5.jpg";
import image6 from "./../images/gallery-6.jpg";
import image7 from "./../images/gallery-7.jpg";
import image8 from "./../images/gallery-8.jpg";

function useGalleryImages() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const [images, setImages] = useState([
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ]);

  const [selectedCount, setSelectedCount] = useState(0);

  const [checkedImages, setCheckedImages] = useState(
    new Array(images.length).fill(false)
  );

  const handleImageHover = (index) => {
    setHoveredIndex(index);
  };

  const handleImageClick = (index) => {
    const updatedCheckedImages = [...checkedImages];
    updatedCheckedImages[index] = !checkedImages[index];
    setCheckedImages(updatedCheckedImages);

    const count = updatedCheckedImages.filter((isChecked) => isChecked).length;
    setSelectedCount(count);
  };

  const handleDeleteSelected = () => {
    const updatedImages = images.filter((_, index) => !checkedImages[index]);
    setImages(updatedImages);
    setCheckedImages(new Array(updatedImages.length).fill(false));
    setSelectedCount(0);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();

    if (draggedIndex !== null && draggedIndex !== index) {
      const updatedImages = [...images];
      const draggedImage = updatedImages[draggedIndex];
      updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(index, 0, draggedImage);
      setImages(updatedImages);
      setDraggedIndex(index);
    }
  };

  return {
    hoveredIndex,
    images,
    selectedCount,
    checkedImages,
    handleImageHover,
    handleImageClick,
    handleDeleteSelected,
    handleDragStart,
    handleDragOver,
  };
}

export { useGalleryImages };

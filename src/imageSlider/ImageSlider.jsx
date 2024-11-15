import { useEffect, useState } from "react";
import "./ImageSlider.css";

const API_URL = "https://picsum.photos/v2/list";

const ImageSlider = () => {
  const interval = 3000;
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const getPhotos = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setPhotos(result);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const goToPrevious = () => {
    setCurrentPhoto((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentPhoto((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    getPhotos();
  }, []);

  // Using interval
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer); // good practice of using inervals and timeouts
  }, [photos.length]);

  return (
    <>
      {!photos.length ? (
        <p>Loading...</p>
      ) : (
        <div className="sld-slider">
          <button onClick={goToPrevious}>Previous</button>
          <img
            src={photos[currentPhoto].download_url}
            alt={`Slide ${currentPhoto}`}
            className="sld-image"
          />
          <button onClick={goToNext}>Next</button>
        </div>
      )}
    </>
  );
};

export default ImageSlider;

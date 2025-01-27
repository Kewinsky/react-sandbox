import { useEffect, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
  "https://images.unsplash.com/photo-1546842931-886c185b4c8c",
  "https://images.unsplash.com/photo-1520763185298-1b434c919102",
  "https://images.unsplash.com/photo-1442458017215-285b83f65851",
  "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
  "https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
];

const MemoryGame = () => {
  const [images, setImages] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  // Timer
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const prepareBoard = () => {
    const doubledImages = [...IMAGES, ...IMAGES];

    const trackingBoard = doubledImages.map((image, index) => ({
      id: index,
      src: image,
      isMatched: false,
      isDiscovered: false,
    }));

    const shuffledImages = trackingBoard.sort(() => Math.random() - 0.5);
    setImages(shuffledImages);
  };

  const handleOnClick = (clickedImage) => {
    if (time === 0) {
      setIsActive(true);
    }

    if (clickedImage.isDiscovered || clickedImage.isMatched || lockBoard)
      return;

    setImages((prevImages) => {
      const updatedImages = prevImages.map((image) =>
        image.id === clickedImage.id ? { ...image, isDiscovered: true } : image
      );

      const discoveredImages = updatedImages.filter(
        (image) => image.isDiscovered && !image.isMatched
      );

      if (discoveredImages.length === 2) {
        setLockBoard(true);
        checkPhotos(discoveredImages[0], discoveredImages[1]);
      }

      return updatedImages;
    });
  };

  const checkPhotos = (firstCard, secondCard) => {
    setTimeout(() => {
      if (firstCard.src === secondCard.src) {
        const updatedImages = images.map((image) =>
          image.id === firstCard.id || image.id === secondCard.id
            ? { ...image, isMatched: true }
            : image
        );
        setImages(updatedImages);
      } else {
        const updatedImages = images.map((image) =>
          image.id === firstCard.id || image.id === secondCard.id
            ? { ...image, isDiscovered: false }
            : image
        );
        setImages(updatedImages);
      }
      setLockBoard(false);
    }, 800);
  };

  const handleResetGame = () => {
    setGameWon(false);
    setTimeElapsed(0);
    setIsActive(false);
    prepareBoard();
  };

  useEffect(() => {
    prepareBoard();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const allMatched = images.every((image) => image.isMatched);

    if (allMatched) {
      setGameWon(true);
      setIsActive(false);
    }
  }, [images]);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div>
      {gameWon && (
        <div className="mb-5 text-2xl text-center">
          <div className="mb-2 text-green-400 font-bold">You Win!</div>
          <div className="mb-2">Your time: {time}s</div>
          <button
            onClick={handleResetGame}
            className="animate-bounce underline cursor-pointer"
          >
            Play Again
          </button>
        </div>
      )}
      <Dashboard images={images} handleOnClick={handleOnClick} />
    </div>
  );
};

const Dashboard = ({ images, handleOnClick }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-4 gap-4">
        {images &&
          images.map((image) => (
            <Card key={image.id} image={image} handleOnClick={handleOnClick} />
          ))}
      </div>
    </div>
  );
};

const Card = ({ image, handleOnClick }) => {
  return (
    <div
      className={`w-40 h-40 rounded shadow ${
        !image.isMatched && "cursor-pointer"
      } flex items-center justify-center bg-gray-300`}
      onClick={() => handleOnClick(image)}
    >
      {image.isMatched || image.isDiscovered ? (
        <img
          src={image.src}
          alt="Image"
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <div className="w-full h-full bg-gray-400 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg"></span>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;

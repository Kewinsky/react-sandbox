import React, { useState } from "react";
import "./Sandbox.css";

const emojis = {
  "😠": "Terrible",
  "😕": "Unhappy",
  "😐": "Neutral",
  "😊": "Happy",
  "🤩": "Excited",
};

const Feedback = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmoji, setEmoji] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleClose = () => {
    setIsModalOpen(false);
    setEmoji("");
    setFeedback("");
  };

  return (
    <div>
      <button className="btn" onClick={() => setIsModalOpen(true)}>
        Feedback
      </button>
      <Modal
        isModalOpen={isModalOpen}
        onClose={handleClose}
        selectedEmoji={selectedEmoji}
        setEmoji={setEmoji}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    </div>
  );
};

const Modal = ({
  isModalOpen,
  onClose,
  selectedEmoji,
  setEmoji,
  feedback,
  setFeedback,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold">Feedback</h2>
        <div className="flex flex-col">
          {Object.entries(emojis).map(([emoji, desc]) => (
            <button
              key={desc}
              className={`btn mb-2 ${
                selectedEmoji === desc ? "bg-accent" : ""
              }`}
              value={desc}
              onClick={(e) => setEmoji(e.target.value)}
            >
              {emoji} {desc}
            </button>
          ))}
        </div>
        <textarea
          className="textarea"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Please enter your feedback..."
        ></textarea>
        <button
          className="mt-4 px-4 py-2 btn"
          onClick={onClose}
          disabled={!selectedEmoji}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Feedback;

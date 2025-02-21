import React, { useState } from "react";

const OMITTED_WORDS = ["a", "the", "and", "or", "but"];

const WordOmitter = () => {
  const [inputText, setInputText] = useState("");
  const [omitWords, setOmitWords] = useState(true);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const toggleOmitWords = () => {
    setOmitWords(!omitWords);
  };

  const clearFields = () => {
    setInputText("");
    setOmitWords(true);
  };

  const getProcessedText = () => {
    if (!omitWords || !inputText.trim()) return inputText;

    return inputText
      .split(" ")
      .filter((word) => !OMITTED_WORDS.includes(word.toLowerCase()))
      .join(" ");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <textarea
        placeholder="Type here..."
        value={inputText}
        onChange={handleInputChange}
        data-testid="input-area"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-4 mt-4">
        <button
          onClick={toggleOmitWords}
          data-testid="action-btn"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {omitWords ? "Show All Words" : "Omit Words"}
        </button>
        <button
          onClick={clearFields}
          data-testid="clear-btn"
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Output:</h2>
        <p
          data-testid="output-text"
          className="p-3 bg-white rounded-lg border min-h-[50px]"
        >
          {getProcessedText() || "No text entered..."}
        </p>
      </div>
    </div>
  );
};

export default WordOmitter;

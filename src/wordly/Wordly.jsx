import { useEffect, useState } from "react";
import "./Wordly.css";

const WORD = "hello";
const ATTEMPTS = WORD.length;

const Wordly = () => {
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState(Array(ATTEMPTS).fill(null));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const updateGuesses = guesses.map((guess, i) => {
      if (i === currentAttempt) {
        return input;
      }
      return guess;
    });

    setGuesses(updateGuesses);
    setInput("");
    setCurrentAttempt((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    guesses.map((guess) => {
      if (guess === WORD) {
        setIsSuccess(true);
      }
    });
  }, [guesses]);

  return (
    <div className="wordly-board">
      {guesses.map((guess, i) => (
        <Line key={i} guess={guess} />
      ))}
      <form onSubmit={handleOnSubmit}>
        <input
          className="wordly-input"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          required
          minLength={WORD.length}
          maxLength={WORD.length}
        />
        <button type="submit" className="wordly-button">
          Guess
        </button>
      </form>
      {isSuccess && <SuccessBanner />}
      {!isSuccess && currentAttempt === 5 ? <DefeatBanner /> : null}
    </div>
  );
};

const Line = ({ guess }) => {
  const checkChar = (char, index) => {
    if (char === WORD[index]) {
      return "green";
    }

    if (WORD.includes(char)) {
      return "yellow";
    }

    return "gray";
  };

  return (
    <div className="wordly-line">
      {guess
        ? guess.split("").map((char, i) => {
            const color = checkChar(char, i);
            return <Tile key={i} char={char.toUpperCase()} color={color} />;
          })
        : Array(WORD.length)
            .fill()
            .map((_, i) => <Tile key={i} />)}
    </div>
  );
};

const Tile = ({ char, color }) => {
  return (
    <div className="wordly-tile" style={{ color: color }}>
      {char}
    </div>
  );
};

const SuccessBanner = () => {
  return <p className="wordly-success">Success</p>;
};

const DefeatBanner = () => {
  return <p className="wordly-defeat">Defeat</p>;
};

export default Wordly;

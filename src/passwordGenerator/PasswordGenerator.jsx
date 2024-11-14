import React, { useEffect, useState } from "react";
import "./PasswordGenerator.css";

const PasswordGenerator = () => {
  const [password, setPassword] = useState([]);
  const [isUpper, setIsUpper] = useState(true);
  const [isLower, setIsLower] = useState(true);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);
  const [length, setLength] = useState(12);

  const generatePassword = () => {
    let includedChars = "";
    const uppercaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseString = "abcdefghijklmnopqrstuvwxyz";
    const numbersString = "0123456789";
    const specialCharsString = "!#$%&'()*+,-./:;<=>?@[]^_{|}~";

    if (isUpper) includedChars += uppercaseString;
    if (isLower) includedChars += lowercaseString;
    if (isNumber) includedChars += numbersString;
    if (isSymbols) includedChars += specialCharsString;

    if (includedChars === "") {
      alert("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * includedChars.length);
      generatedPassword += includedChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [isUpper, isLower, isNumber, isSymbols, length]);

  return (
    <div className="pwd-board">
      {password && (
        <div className="pwd-password">
          <p> {password}</p>
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      )}
      <div className="pwd-options">
        <label>
          <input
            type="checkbox"
            name="uppercase"
            id="uppercase"
            checked={isUpper}
            onChange={(e) => setIsUpper(e.target.checked)}
          />
          Include uppercase letters
        </label>

        <label>
          <input
            type="checkbox"
            name="lowercase"
            id="lowercase"
            checked={isLower}
            onChange={(e) => setIsLower(e.target.checked)}
          />
          Include lowercase letters
        </label>

        <label>
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            checked={isNumber}
            onChange={(e) => setIsNumber(e.target.checked)}
          />
          Include numbers
        </label>

        <label>
          <input
            type="checkbox"
            name="symbols"
            id="symbols"
            checked={isSymbols}
            onChange={(e) => setIsSymbols(e.target.checked)}
          />
          Include special symbols
        </label>

        <label>
          Specify length: {length}
          <br />
          <input
            type="range"
            name="length"
            id="length"
            min="5"
            max="30"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default PasswordGenerator;

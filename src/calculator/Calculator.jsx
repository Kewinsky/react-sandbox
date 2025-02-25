import React, { useState } from "react";

const OPEARTIONS = ["+", "-", "*", "/"];

const Calculator = () => {
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [currInput, setCurrInput] = useState("A");
  const [operator, setOperator] = useState("");

  const handleClear = () => {
    if (inputA !== 0) {
      setInputA("");
      setInputB("");
      setOperator("");
      setCurrInput("A");
    }
  };

  const handleDelete = () => {
    if (currInput === "A") {
      setInputA(inputA.slice(0, -1));
    } else {
      setInputB(inputB.slice(0, -1));
    }
  };

  const handleOperator = (e) => {
    if (inputA.length) {
      setOperator(e.target.value);
      setCurrInput("B");
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;

    if (
      value === "0" &&
      (currInput === "A" ? inputA.length === 0 : inputB.length === 0)
    ) {
      return;
    }

    if (currInput === "A") {
      setInputA((prev) => prev + value);
    } else {
      setInputB((prev) => prev + value);
    }
  };

  const handleSubmit = () => {
    if (!inputB.length) return;

    let result = 0;
    switch (operator) {
      case "+":
        result = Number(inputA) + Number(inputB);
        break;
      case "-":
        result = Number(inputA) - Number(inputB);
        break;
      case "*":
        result = Number(inputA) * Number(inputB);
        break;
      case "/":
        result = Number(inputA) / Number(inputB);
        break;
      default:
        break;
    }

    setInputA(result.toFixed(2).toString());
    setInputB("");
    setOperator("");
    setCurrInput("A");
  };

  return (
    <div>
      <div className="flex justify-end w-full border-b text-2xl min-h-8.5">
        {currInput === "A" ? inputA : inputB}
      </div>
      <div className="my-2 grid grid-cols-2 gap-2">
        <button className="btn bg-error" onClick={handleClear}>
          Clear
        </button>
        <button className="btn bg-warning" onClick={handleDelete}>
          Del
        </button>
      </div>
      <div className="flex items-start">
        <div className="grid grid-cols-3 gap-2 mr-2">
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <button
                key={i}
                className="btn"
                value={i + 1}
                onClick={handleInput}
              >
                {i + 1}
              </button>
            ))}
          <button className="btn" value={0} onClick={handleInput}>
            0
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {OPEARTIONS.map((op, i) => (
            <button
              key={i}
              className={`btn ${op === operator ? "bg-info" : null}`}
              onClick={handleOperator}
              value={op}
            >
              {op}
            </button>
          ))}
          <button className="btn bg-success" onClick={handleSubmit}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

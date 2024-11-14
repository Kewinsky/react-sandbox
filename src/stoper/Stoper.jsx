import React, { useCallback, useEffect, useState } from "react";

const Stoper = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isResetActive, setIsResetActive] = useState(false);

  const handleStart = useCallback(() => {
    setIsActive(true);
    setIsResetActive(true);
  }, []);

  const handleStop = useCallback(() => {
    setIsActive(false);
    setIsResetActive(false);
  }, []);

  const handleReset = useCallback(() => {
    setTime(0);
  }, []);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  }, [time, isActive]);

  return (
    <>
      <p>Time: {time}s</p>
      <button onClick={handleStart} disabled={isActive}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isActive}>
        Stop
      </button>
      <button onClick={handleReset} disabled={isResetActive || !time}>
        Reset
      </button>
    </>
  );
};

export default Stoper;

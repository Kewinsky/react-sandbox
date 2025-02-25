import { useState } from "react";

const TrafficLights = () => {
  const [light, setLight] = useState("red");

  useEffect(() => {
    const cycleLights = {
      red: "green",
      green: "yellow",
      yellow: "red",
    };

    const timer = setTimeout(
      () => {
        setLight((prevLight) => cycleLights[prevLight]);
      },
      light === "yellow" ? 1000 : 3000
    );

    return () => clearTimeout(timer);
  }, [light]);

  return (
    <div className="flex flex-col items-center space-y-2 bg-gray-800 p-4 rounded-lg w-24">
      <div
        className={`w-12 h-12 rounded-full ${
          light === "red" ? "bg-red-500" : "bg-red-100"
        }`}
      ></div>
      <div
        className={`w-12 h-12 rounded-full ${
          light === "yellow" ? "bg-yellow-500" : "bg-yellow-100"
        }`}
      ></div>
      <div
        className={`w-12 h-12 rounded-full ${
          light === "green" ? "bg-green-500" : "bg-green-100"
        }`}
      ></div>
    </div>
  );
};

export default TrafficLights;

import { useState } from "react";

const API_URL = "https://robohash.org/";

const GithubRobotGenerator = () => {
  const [input, setInput] = useState("");
  const [robots, setRobots] = useState([1, 2, 3]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // HINT: adding element to the array
    setRobots((prev) => [...prev, input]);

    // also correct but double clicking can lead to wierd behaviour
    // setRobots([...robots, input]);

    setInput("");
  };

  // HINT: removing element from the array
  const handleRemove = (robot) => {
    setRobots(robots.filter((r) => r !== robot));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button>Generate</button>
      </form>
      <div className="grid grid-cols-3 gap-2">
        {robots.map((robot) => (
          <img
            src={API_URL + robot + "?set=set4"}
            alt={`Robot #${robot}`}
            onClick={() => handleRemove(robot)}
          />
        ))}
      </div>
    </>
  );
};

export default GithubRobotGenerator;

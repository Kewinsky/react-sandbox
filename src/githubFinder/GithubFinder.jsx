import { useState } from "react";

const API_URL = "https://api.github.com/users/";

const GithubFinder = () => {
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);

  const getUser = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(API_URL + input);
      const result = await response.json();

      if (result.message) {
        setUser(null);
      } else {
        setUser(result);
        setInput("");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={getUser}>
        <input
          type="text"
          value={input}
          placeholder="Search for users"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {user ? (
        <>
          <User user={user} />
        </>
      ) : (
        <p>{user === null && "No users found."}</p>
      )}
    </div>
  );
};

const User = ({ user }) => {
  return (
    <div>
      <img src={user.avatar_url} alt="avatar" />
      <p>
        {user.name} is working at {user.company} as {user.bio}
      </p>
    </div>
  );
};

export default GithubFinder;

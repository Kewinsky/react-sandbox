import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setPending(true);
      const response = await fetch(url);
      const result = await response.json();

      // only to simulate retriving an error from API
      // throw new Error("Wrong endpoint");

      // only to simulate latency when fetching data from API
      setTimeout(() => {
        setData(result);
        setError(null);
        setPending(false);
      }, 2000);
    } catch (error) {
      setError("Error: " + error.message);
      setPending(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, error, pending };
};

export default useFetch;

import { useEffect, useMemo, useState } from "react";
import "./Countries.css";

const API_URL = "https://restcountries.com/v3.1";

const capitals = [
  "Tokyo", // Japan
  "Paris", // France
  "Canberra", // Australia
  "Ottawa", // Canada
  "Brasília", // Brazil
  "Cairo", // Egypt
  "Moscow", // Russia
  "Nairobi", // Kenya
  "New Delhi", // India
  "Rome", // Italy
];

const Countries = () => {
  const itemsPerPage = 10;
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCountries = async () => {
    const url =
      capital !== "all" ? API_URL + `/capital/${capital}` : API_URL + "/all";

    try {
      const response = await fetch(url);
      const result = await response.json();
      setCountries(result);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Filtering countries by search input or chosen capital
  // Sort by country name
  const filteredData = useMemo(() => {
    return countries
      .filter(
        (country) =>
          country.name.common.toLowerCase().startsWith(search.toLowerCase()) ||
          country.capital === capital
      )
      .sort((a, b) => a.name.common.localeCompare(b.name.common));
  }, [countries, search, capital]);

  // Pagination
  // Calc total pages according to the filtered data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchCountries();
  }, [capital]);

  return (
    <>
      <div className="mb-5 flex flex-col w-40">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search country"
          className="ml-1"
        />
        <select onChange={(e) => setCapital(e.target.value)}>
          <option value="all" defaultValue="all">
            Select capital
          </option>
          {capitals &&
            capitals.map((capital) => (
              <option key={capital} value={capital}>
                {capital}
              </option>
            ))}
        </select>
      </div>

      <table>
        <tr>
          <th>Flag</th>
          <th>Country</th>
          <th>Capital</th>
        </tr>
        {currentData &&
          currentData.map((country) => (
            <tr key={country.name.common}>
              <td>{country.flag}</td>
              <td>{country.name.common}</td>
              <td>{country.capital ?? "-"}</td>
            </tr>
          ))}
      </table>
      <div className="mt-5">
        <button
          onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
        >
          {"<-"}
        </button>
        {Array(totalPages)
          .fill(null)
          .map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`mr-1 ${
                currentPage === i + 1
                  ? "text-2xl text-green-400 animate-bounce"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage((prev) => prev + 1)
          }
        >
          {"->"}
        </button>
      </div>
    </>
  );
};

export default Countries;

import { useEffect, useState } from "react";
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
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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

  // Pagination
  const totalPages = Math.ceil(countries.length / itemsPerPage);
  const indexOfFirstElement = (currentPage - 1) * itemsPerPage;
  const indexOfLastElement = indexOfFirstElement + itemsPerPage;
  const currentData = countries.slice(indexOfFirstElement, indexOfLastElement);

  useEffect(() => {
    fetchCountries();
  }, [capital]);

  return (
    <>
      <Dropdown capitals={capitals} setCapital={setCapital} />
      <table>
        <tr>
          <th>Flag</th>
          <th>Country</th>
          <th>Capital</th>
        </tr>
        {countries &&
          currentData.map((item) => (
            <CountryElement key={item.cca2} country={item} />
          ))}
      </table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const CountryElement = ({ country }) => {
  return (
    <tr className="tr-countries">
      <td>{country.flag}</td>
      <td>{country.name.common}</td>
      <td>{country.capital}</td>
    </tr>
  );
};

const Dropdown = ({ capitals, setCapital }) => {
  return (
    <select
      name="capitals"
      id="capitals"
      onChange={(e) => setCapital(e.target.value)}
    >
      <option value="all" selected>
        Select capital
      </option>
      {capitals.map((capital, i) => (
        <option key={i} value={capital}>
          {capital}
        </option>
      ))}
    </select>
  );
};

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <div>
      <button
        onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
      >
        {"<"}
      </button>
      {Array(totalPages)
        .fill(null)
        .map((_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </button>
        ))}
      <button
        onClick={() =>
          currentPage < totalPages && setCurrentPage((prev) => prev + 1)
        }
      >
        {">"}
      </button>
    </div>
  );
};

export default Countries;

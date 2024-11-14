import React, { useEffect, useState } from "react";
import "./Crypto.css";

const API_KEY = "467054049d99f0e96a8d33e1eea67962";
const API_URL = `https://api.coinlayer.com/list?access_key=${API_KEY}`;

const Crypto = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;

  const filteredData = Object.entries(data).filter(
    ([key, value]) =>
      value.symbol.toLowerCase().includes(search.toLowerCase()) ||
      value.name.toLowerCase().includes(search.toLowerCase())
  );

  const getInfo = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setData(result.crypto);
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      {data && (
        <div className="crypto-board">
          <input
            type="text"
            placeholder="Search for crypto"
            className="crypto-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>Logo</th>
                <th>Symbol</th>
                <th>Name</th>
                <th>Max Supply</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map(([key, value]) => (
                <tr key={key}>
                  <td>
                    <img src={value.icon_url} alt={value.name} width="30" />
                  </td>
                  <td>{value.symbol}</td>
                  <td>{value.name}</td>
                  <td>{value.max_supply.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="crypto-pagination">
            <button onClick={() => paginate(currentPage - 1)}>-</button>
            {Array(totalPages)
              .fill(null)
              .map((_, i) => (
                <button key={i} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              ))}
            <button onClick={() => paginate(currentPage + 1)}>+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Crypto;

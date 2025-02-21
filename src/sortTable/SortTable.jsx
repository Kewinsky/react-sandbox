import React, { useState, useEffect } from "react";
import { ARTICLES_DATA } from "./data";

const SortTable = () => {
  const [sortedArticles, setSortedArticles] = useState([...ARTICLES_DATA]);

  const handleMostUpvoted = () => {
    setSortedArticles([...ARTICLES_DATA].sort((a, b) => b.upvotes - a.upvotes));
  };

  const handleMostRecent = () => {
    setSortedArticles(
      [...ARTICLES_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  };

  useEffect(() => {
    handleMostUpvoted();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center p-6">
        <div className="flex items-center gap-4 mb-6">
          <label className="text-gray-600 uppercase font-semibold">
            Sort By:
          </label>
          <button
            data-testid="most-upvoted-link"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleMostUpvoted}
          >
            Most Upvoted
          </button>
          <button
            data-testid="most-recent-link"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={handleMostRecent}
          >
            Most Recent
          </button>
        </div>
        <Articles articles={sortedArticles} />
      </div>
    </>
  );
};

const Articles = ({ articles }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Upvotes</th>
            <th className="py-3 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, i) => (
            <tr
              data-testid="article"
              key={`article-${i}`}
              className="border-b hover:bg-gray-100"
            >
              <td data-testid="article-title" className="py-3 px-4">
                {article.title}
              </td>
              <td data-testid="article-upvotes" className="py-3 px-4">
                {article.upvotes}
              </td>
              <td data-testid="article-date" className="py-3 px-4">
                {article.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortTable;

import { useEffect, useState } from "react";
import "./LoadMore.css";

const API_URL = "https://dummyjson.com/products";

const LoadMore = () => {
  const limitProducts = 9;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);

  const getProducts = async () => {
    const url = new URL(API_URL);
    url.searchParams.append("limit", limitProducts);
    url.searchParams.append("skip", skip * limitProducts);

    try {
      const response = await fetch(url);
      const result = await response.json();

      if (skip) {
        setProducts((prev) => [...prev, ...result.products]);
      } else {
        setProducts(result.products);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [skip]);

  return (
    <div className="product-wrapper">
      <div className="products-board">
        {products &&
          products.map((item) => (
            <div key={item.id} className="product-tile">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="product-image"
              />
              <p>{item.title}</p>
            </div>
          ))}
      </div>
      <button
        onClick={() => setSkip((prev) => prev + 1)}
        className="load-more-btn"
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMore;

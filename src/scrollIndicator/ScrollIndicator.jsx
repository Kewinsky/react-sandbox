import { useEffect, useState } from "react";
import "./ScrollIndicator.css";
import "../loadMore/LoadMore";

const API_URL = "https://dummyjson.com/products?limit=50";

const ScrollIndicator = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setProducts(result.products);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="scroll-board">
      <IndicatorComponent />
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
    </div>
  );
};

const IndicatorComponent = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    setScrollWidth(scrollPercentage);
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-indicator">
      <div className="progress-bar" style={{ width: `${scrollWidth}%` }}></div>
    </div>
  );
};

export default ScrollIndicator;

import React from "react";
import useFetch from "./useFetch";

const API_URL = "https://dummyjson.com/products?limit=10";

const CustomHook = () => {
  const { data, error, pending } = useFetch(API_URL);

  return (
    <div>
      <h1>Use Fetch Hook</h1>

      {pending && <h3>Loading data! Please wait</h3>}

      {error && <h3>{error}</h3>}

      {data.products &&
        data.products.map((productItem) => (
          <p key={productItem.id}>{productItem.title}</p>
        ))}
    </div>
  );
};

export default CustomHook;

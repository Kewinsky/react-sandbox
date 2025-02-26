import React, { useEffect, useState } from "react";
import "./Sandbox.css";

export const data = [
  { title: "First", id: 0, checked: false },
  { title: "Second", id: 1, checked: false },
  { title: "Third", id: 2, checked: true },
  { title: "Fourth", id: 3, checked: false },
];

const Sandbox = () => {
  const [items, setItems] = useState(data);
  const [selectedItems, setSelectedItems] = useState([]);

  const filterItems = (status) =>
    items.filter((item) => item.checked === status);

  const moveItems = (status, moveAll = false) => {
    setItems((prev) =>
      prev.map((item) =>
        moveAll || selectedItems.some((selected) => selected.id === item.id)
          ? { ...item, checked: status }
          : item
      )
    );

    setSelectedItems([]);
  };

  return (
    <div className="flex">
      <List
        filteredItems={filterItems(false)}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
      <div className="flex items-center">
        <button className="btn" onClick={() => moveItems(false, true)}>
          {"<<"}
        </button>
        <button className="btn" onClick={() => moveItems(false)}>
          {"<"}
        </button>
        <button className="btn" onClick={() => moveItems(true)}>
          {">"}
        </button>
        <button className="btn" onClick={() => moveItems(true, true)}>
          {">>"}
        </button>
      </div>
      <List
        filteredItems={filterItems(true)}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </div>
  );
};

const List = ({ filteredItems, selectedItems, setSelectedItems }) => {
  const handleAddItem = (item) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const isActive = (item) => {
    return selectedItems.some((i) => i.id === item.id);
  };

  return (
    <div className="w-50 m-2 p-2 border rounded-box flex flex-col">
      {filteredItems.map((item) => (
        <button
          className={`btn mb-2 ${isActive(item) && "bg-accent"}`}
          onClick={() => handleAddItem(item)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default Sandbox;

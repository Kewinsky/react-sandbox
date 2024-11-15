import { useState } from "react";
import "./Accordian.css";

const Accordian = () => {
  const [elements, setElements] = useState([
    { id: "1", title: "Title 1", desc: "Lorem ipsum", isExpanded: false },
    { id: "2", title: "Title 2", desc: "Lorem ipsum", isExpanded: false },
    { id: "3", title: "Title 3", desc: "Lorem ipsum", isExpanded: false },
  ]);
  return (
    <>
      {elements.map((element) => (
        <AccordianElement
          key={element.id}
          element={element}
          setElements={setElements}
        />
      ))}
    </>
  );
};

const AccordianElement = ({ element, setElements }) => {
  // Updating status of specific object in an Array
  const handleOnClick = () => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === element.id ? { ...el, isExpanded: !el.isExpanded } : el
      )
    );
  };

  return (
    <p className="acc-element">
      <div className="dupa">
        {element.title}{" "}
        <button onClick={handleOnClick}>
          {element.isExpanded ? "Hide" : "Expand"}
        </button>
      </div>
      {element.isExpanded && <p className="dupka">{element.desc}</p>}
    </p>
  );
};

export default Accordian;

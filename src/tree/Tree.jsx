const data = {
  1: ["a", "b", "c"],
  2: {
    21: ["d", "e", "f"],
    22: {
      221: ["g", "h", "i"],
      222: ["j", "k", "l"],
    },
  },
  3: ["m", "n", "o"],
};

const Tree = () => {
  return (
    <>
      <h1>Tree Structure</h1>
      <TreeElement nestedObject={data} />
    </>
  );
};

const TreeElement = ({ nestedObject }) => {
  return (
    <ul className="list-none pl-4">
      {Object.entries(nestedObject).map(([key, value]) => (
        <li key={key} className="my-1">
          {typeof value === "object" ? (
            <details className="ml-2">
              <summary className="cursor-pointer font-semibold">{key}</summary>
              <TreeElement nestedObject={value} />
            </details>
          ) : (
            <span className="ml-4">{value}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Tree;

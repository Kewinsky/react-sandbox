import { useState } from "react";
import "./Tabs.css";

const Tabs = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const tabs = [
    {
      label: "Tab 1",
      content: "This is content for Tab 1",
    },
    {
      label: "Tab 2",
      content: "This is content for Tab 2",
    },
    {
      label: "Tab 3",
      content: "This is content for Tab 3",
    },
  ];

  return (
    <>
      <div className="tabs">
        {tabs.map((tab, i) => (
          <p
            key={tab.label}
            onClick={() => setCurrentTabIndex(i)}
            className={`tab ${currentTabIndex === i ? "active" : ""}`}
          >
            {tab.label}
          </p>
        ))}
      </div>
      <div className="tab-content">{tabs[currentTabIndex].content}</div>
    </>
  );
};

export default Tabs;

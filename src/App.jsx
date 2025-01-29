import { useState } from "react";
import "./App.css";
import Accordian from "./accordian/Accordian";
import Countries from "./countries/Countries";
import Crypto from "./crypto/Crypto";
import CustomHook from "./customHook/CustomHook";
import DarkMode from "./darkMode/DarkMode";
import Exchange from "./exchange/Exchange";
import GithubFinder from "./githubFinder/GithubFinder";
import ImageSlider from "./imageSlider/ImageSlider";
import LoadMore from "./loadMore/LoadMore";
import Modal from "./modal/Modal";
import Notes from "./notes/Notes";
import PasswordGenerator from "./passwordGenerator/PasswordGenerator";
import Pokedex from "./pokedex/Pokedex";
import QrGenerator from "./qrGenerator/QrGenerator";
import ScrollIndicator from "./scrollIndicator/ScrollIndicator";
import Stars from "./stars/Stars";
import Stoper from "./stoper/Stoper";
import Tabs from "./tabs/Tabs";
import TicTacToe from "./tictactoe/TicTacToe";
import Weather from "./weather/Weather";
import Wordly from "./wordly/Wordly";
import Sandbox from "./sandbox/Sandbox";
import MemoryGame from "./memoryGame/MemoryGame";
import DragNDrop from "./dragNdrop/DragNDrop";
import Quiz from "./quiz/Quiz";
import Typewriter from "./typewriter/Typewriter";
import ContactBook from "./contactBook/ContactBook";

const apps = [
  "accordian",
  "countries",
  "contactBook",
  "crypto",
  "customHook",
  "darkMode",
  "dragndrop",
  "exchange",
  "githubFinder",
  "imageSlider",
  "loadMore",
  "memoryGame",
  "modal",
  "notes",
  "passwordGenerator",
  "pokedex",
  "qrGenerator",
  "scrollIndicator",
  "stars",
  "stoper",
  "tabs",
  "ticTacToe",
  "typewriter",
  "weather",
  "wordly",
  "quiz",
];

const App = () => {
  const [app, setApp] = useState("");

  return (
    <>
      <select value={app} onChange={(e) => setApp(e.target.value)}>
        <option value="">Select an App</option>
        {apps.map((app) => (
          <option key={app} value={app}>
            {app.charAt(0).toUpperCase() + app.slice(1)}
          </option>
        ))}
      </select>
      <SwitchExample app={app} />
      <Sandbox />
    </>
  );
};

const SwitchExample = ({ app }) => {
  const renderContent = () => {
    switch (app) {
      case "accordian":
        return <Accordian />;
      case "countries":
        return <Countries />;
      case "contactBook":
        return <ContactBook />;
      case "crypto":
        return <Crypto />;
      case "customHook":
        return <CustomHook />;
      case "darkMode":
        return <DarkMode />;
      case "dragndrop":
        return <DragNDrop />;
      case "exchange":
        return <Exchange />;
      case "githubFinder":
        return <GithubFinder />;
      case "imageSlider":
        return <ImageSlider />;
      case "loadMore":
        return <LoadMore />;
      case "memoryGame":
        return <MemoryGame />;
      case "modal":
        return <Modal />;
      case "notes":
        return <Notes />;
      case "passwordGenerator":
        return <PasswordGenerator />;
      case "pokedex":
        return <Pokedex />;
      case "qrGenerator":
        return <QrGenerator />;
      case "scrollIndicator":
        return <ScrollIndicator />;
      case "stars":
        return <Stars />;
      case "stoper":
        return <Stoper />;
      case "tabs":
        return <Tabs />;
      case "ticTacToe":
        return <TicTacToe />;
      case "typewriter":
        return <Typewriter />;
      case "weather":
        return <Weather />;
      case "wordly":
        return <Wordly />;
      case "quiz":
        return <Quiz />;
    }
  };

  return <>{renderContent()}</>;
};

export default App;

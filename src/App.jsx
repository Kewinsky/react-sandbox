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
import Tree from "./tree/Tree";
import Typewriter from "./typewriter/Typewriter";
import ContactBook from "./contactBook/ContactBook";
import GithubRobotGenerator from "./githubRobotGenerator/GithubRobotGenerator";
import Todo from "./todo/Todo";
import Form from "./form/Form";
import SortTable from "./sortTable/SortTable";
import WordOmitter from "./omitWords/OmitWords";

const appComponents = {
  accordian: Accordian,
  countries: Countries,
  contactBook: ContactBook,
  crypto: Crypto,
  customHook: CustomHook,
  darkMode: DarkMode,
  dragndrop: DragNDrop,
  exchange: Exchange,
  githubFinder: GithubFinder,
  imageSlider: ImageSlider,
  loadMore: LoadMore,
  memoryGame: MemoryGame,
  modal: Modal,
  notes: Notes,
  passwordGenerator: PasswordGenerator,
  pokedex: Pokedex,
  qrGenerator: QrGenerator,
  scrollIndicator: ScrollIndicator,
  stars: Stars,
  stoper: Stoper,
  tabs: Tabs,
  ticTacToe: TicTacToe,
  typewriter: Typewriter,
  weather: Weather,
  wordly: Wordly,
  quiz: Quiz,
  tree: Tree,
  githubRobotGenerator: GithubRobotGenerator,
  todo: Todo,
  form: Form,
  sortTable: SortTable,
  wordOmitter: WordOmitter,
};

const App = () => {
  const [selectedApp, setSelectedApp] = useState("");

  const SelectedComponent = appComponents[selectedApp];

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold mb-5">React Sandbox</h1>
      <p className="text-lg mb-3">
        Select an app to explore different React functionalities.
      </p>

      <select
        value={selectedApp}
        onChange={(e) => setSelectedApp(e.target.value)}
        className="p-2 border rounded-md shadow-md focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select an App</option>
        {Object.keys(appComponents).map((app) => (
          <option key={app} value={app}>
            {app.charAt(0).toUpperCase() + app.slice(1)}
          </option>
        ))}
      </select>

      <div className="mt-5 w-full justify-items-center p-5 shadow-lg rounded-lg">
        {SelectedComponent ? (
          <SelectedComponent />
        ) : (
          <p>Select an app to load</p>
        )}
      </div>

      <Sandbox />
    </div>
  );
};

export default App;

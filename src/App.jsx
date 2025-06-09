"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "./components/IntroScreen";
import ChoiceBranchScreen from "./components/ChoiceBranchScreen";
import CategorySelectionScreen from "./components/CategorySelectionScreen";
import TournamentScreen from "./components/TournamentScreen";
import ResultScreen from "./components/ResultScreen";
import PacmanGame from "../components/pacman-game";

function App() {
  const [currentScreen, setCurrentScreen] = useState("intro");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [finalWinner, setFinalWinner] = useState(null);

  const handleScreenChange = (screen) => {
    setCurrentScreen(screen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentScreen("tournament");
  };

  const handleTournamentComplete = (winner) => {
    setFinalWinner(winner);
    setCurrentScreen("result");
  };

  const handleRestart = () => {
    setCurrentScreen("intro");
    setSelectedCategory(null);
    setFinalWinner(null);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === "intro" && (
          <IntroScreen
            key="intro"
            onStart={() => handleScreenChange("choice")}
          />
        )}
        {currentScreen === "choice" && (
          <ChoiceBranchScreen
            key="choice"
            onSelectUndecided={() => handleScreenChange("category")}
            onSelectDecided={() => handleScreenChange("pacman")}
          />
        )}
        {currentScreen === "category" && (
          <CategorySelectionScreen
            key="category"
            onCategorySelect={handleCategorySelect}
          />
        )}
        {currentScreen === "tournament" && selectedCategory && (
          <TournamentScreen
            key="tournament"
            category={selectedCategory}
            onComplete={handleTournamentComplete}
          />
        )}
        {currentScreen === "result" && finalWinner && (
          <ResultScreen
            key="result"
            winner={finalWinner}
            onRestart={handleRestart}
          />
        )}
        {currentScreen === "pacman" && (
          <PacmanGame key="pacman" onBack={() => setCurrentScreen("choice")} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

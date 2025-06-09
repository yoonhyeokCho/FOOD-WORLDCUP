"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/intro-screen";
import ChoiceBranchScreen from "@/components/choice-branch-screen";
import CategorySelectionScreen from "@/components/category-selection-screen";
import TournamentScreen from "@/components/tournament-screen";
import ResultScreen from "@/components/result-screen";
import PacmanGame from "@/components/pacman-game";

export type Screen =
  | "intro"
  | "choice"
  | "category"
  | "tournament"
  | "result"
  | "pacman";
export type FoodCategory = "한식" | "중식" | "일식" | "양식" | "기타";

export interface Food {
  id: string;
  name: string;
  image: string;
  category: FoodCategory;
}

export default function FoodWorldCup() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("intro");
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(
    null
  );
  const [finalWinner, setFinalWinner] = useState<Food | null>(null);

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleCategorySelect = (category: FoodCategory) => {
    setSelectedCategory(category);
    setCurrentScreen("tournament");
  };

  const handleTournamentComplete = (winner: Food) => {
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
          <PacmanGame
            key="pacman"
            onBack={() => handleScreenChange("choice")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

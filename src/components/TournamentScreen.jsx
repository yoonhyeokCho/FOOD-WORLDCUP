"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { foodData } from "../data/foodData"

export default function TournamentScreen({ category, onComplete }) {
  const [currentRound, setCurrentRound] = useState([])
  const [currentMatch, setCurrentMatch] = useState(0)
  const [roundName, setRoundName] = useState("16강")
  const [winners, setWinners] = useState([])

  useEffect(() => {
    // Initialize tournament with shuffled foods
    const foods = [...foodData[category]].sort(() => Math.random() - 0.5)
    setCurrentRound(foods)
    setCurrentMatch(0)
    setWinners([])
    setRoundName("16강")
  }, [category])

  const handleFoodSelect = (selectedFood) => {
    const newWinners = [...winners, selectedFood]

    if (currentMatch + 2 < currentRound.length) {
      // More matches in current round
      setCurrentMatch(currentMatch + 2)
      setWinners(newWinners)
    } else {
      // Round complete
      if (newWinners.length === 1) {
        // Tournament complete
        onComplete(newWinners[0])
      } else {
        // Start next round
        setCurrentRound(newWinners)
        setCurrentMatch(0)
        setWinners([])

        // Update round name
        if (newWinners.length === 8) setRoundName("8강")
        else if (newWinners.length === 4) setRoundName("4강")
        else if (newWinners.length === 2) setRoundName("결승")
      }
    }
  }

  if (currentRound.length === 0) return null

  const food1 = currentRound[currentMatch]
  const food2 = currentRound[currentMatch + 1]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-8"
    >
      {/* Round Info */}
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">
          {category} {roundName}
        </h2>
        <p className="text-xl text-gray-300">
          {Math.floor(currentMatch / 2) + 1} / {Math.floor(currentRound.length / 2)} 경기
        </p>
      </motion.div>

      {/* VS Battle */}
      <div className="flex items-center justify-center space-x-8 max-w-6xl w-full">
        <AnimatePresence mode="wait">
          <motion.button
            key={`${food1.id}-${currentMatch}`}
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFoodSelect(food1)}
            className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center space-y-4 hover:shadow-3xl transition-all duration-300 group w-80"
          >
            <img
              src={food1.image || "/placeholder.svg"}
              alt={food1.name}
              className="w-48 h-48 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-300"
            />
            <h3 className="text-2xl font-bold text-gray-800">{food1.name}</h3>
          </motion.button>
        </AnimatePresence>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="text-6xl font-bold text-red-500 mx-8"
        >
          VS
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.button
            key={`${food2.id}-${currentMatch}`}
            initial={{ x: 100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFoodSelect(food2)}
            className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center space-y-4 hover:shadow-3xl transition-all duration-300 group w-80"
          >
            <img
              src={food2.image || "/placeholder.svg"}
              alt={food2.name}
              className="w-48 h-48 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-300"
            />
            <h3 className="text-2xl font-bold text-gray-800">{food2.name}</h3>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${((currentMatch / 2 + winners.length) / (currentRound.length / 2)) * 100}%`,
        }}
        className="mt-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        style={{ maxWidth: "400px" }}
      />
    </motion.div>
  )
}

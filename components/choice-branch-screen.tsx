"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ChoiceBranchScreenProps {
  onSelectUndecided: () => void
  onSelectDecided: () => void
}

export default function ChoiceBranchScreen({ onSelectUndecided, onSelectDecided }: ChoiceBranchScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-screen flex items-center justify-center"
    >
      {/* Background - Wide Open Mouth */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-pink-700 to-red-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-4xl max-h-96 bg-gradient-to-b from-pink-300 to-red-500 rounded-full relative overflow-hidden">
            {/* Open Mouth */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-3/4 bg-black rounded-t-full" />
            {/* Upper Teeth */}
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-6 h-12 bg-white rounded-b-lg shadow-lg" />
              ))}
            </div>
            {/* Lower Teeth */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-6 h-12 bg-white rounded-t-lg shadow-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Choice Options */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold text-white text-center mb-8"
        >
          당신은 어떤 사람인가요?
        </motion.h2>

        <div className="flex flex-col space-y-6">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              onClick={onSelectDecided}
              className="bg-blue-600 hover:bg-blue-700 text-white text-2xl px-16 py-8 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              메뉴를 선택한 사람
            </Button>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              onClick={onSelectUndecided}
              className="bg-red-600 hover:bg-red-700 text-white text-2xl px-16 py-8 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              메뉴를 선택하지 못한 사람
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

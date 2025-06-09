"use client"

import { motion } from "framer-motion"

export default function IntroScreen({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-screen flex items-center justify-center"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-700 to-pink-800">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Animated Mouth */}
          <div className="w-96 h-64 bg-gradient-to-b from-pink-400 to-red-600 rounded-full relative overflow-hidden shadow-2xl">
            <motion.div
              animate={{
                scaleY: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-32 bg-black rounded-t-full"
            />
            {/* Teeth */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-4 h-8 bg-white rounded-b-lg" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl font-bold mb-4 text-shadow-lg"
        >
          음식 월드컵
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-xl mb-8 text-shadow"
        >
          오늘 뭐 먹을지 고민된다면?
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring" }}
        >
          <button
            onClick={onStart}
            className="bg-white text-red-600 hover:bg-gray-100 text-2xl px-12 py-6 rounded-full font-bold shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            START
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

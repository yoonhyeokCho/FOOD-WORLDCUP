"use client"

import { motion } from "framer-motion"
import type { Food } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Share2, RotateCcw } from "lucide-react"

interface ResultScreenProps {
  winner: Food
  onRestart: () => void
}

export default function ResultScreen({ winner, onRestart }: ResultScreenProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "음식 월드컵 결과",
        text: `오늘은 ${winner.name}을(를) 먹자!`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`오늘은 ${winner.name}을(를) 먹자! ${window.location.href}`)
      alert("결과가 클립보드에 복사되었습니다!")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background - Closing Mouth Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-pink-800 to-red-700">
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0.1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full h-full max-w-6xl max-h-96 bg-gradient-to-b from-pink-300 to-red-500 rounded-full relative overflow-hidden">
            {/* Closing Mouth */}
            <motion.div
              initial={{ height: "75%" }}
              animate={{ height: "10%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 bg-black rounded-t-full"
            />

            {/* Teeth Animation */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 100 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-32 left-1/2 transform -translate-x-1/2 flex space-x-2"
            >
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-6 h-12 bg-white rounded-b-lg shadow-lg" />
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -100 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2"
            >
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-6 h-12 bg-white rounded-t-lg shadow-lg" />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Result Content */}
      <div className="relative z-10 text-center text-white">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <img
            src={winner.image || "/placeholder.svg"}
            alt={winner.name}
            className="w-64 h-64 object-cover rounded-full mx-auto shadow-2xl border-8 border-white"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-6xl font-bold mb-4"
        >
          {winner.name}
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="text-3xl mb-8 text-yellow-300"
        >
          오늘은 이걸 먹자! 🎉
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleShare}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xl rounded-full font-bold shadow-2xl flex items-center gap-2"
          >
            <Share2 className="w-6 h-6" />
            결과 공유하기
          </Button>

          <Button
            onClick={onRestart}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl rounded-full font-bold shadow-2xl flex items-center gap-2"
          >
            <RotateCcw className="w-6 h-6" />
            다시 시작하기
          </Button>
        </motion.div>

        {/* Celebration Animation */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 text-6xl"
        >
          🎊
        </motion.div>

        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-0 right-0 text-6xl"
        >
          🎉
        </motion.div>
      </div>

      {/* Sound Effect Indicator */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-8xl font-bold text-white">탁!</div>
      </motion.div>
    </motion.div>
  )
}

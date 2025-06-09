"use client"

import { motion } from "framer-motion"
import type { FoodCategory } from "@/app/page"

interface CategorySelectionScreenProps {
  onCategorySelect: (category: FoodCategory) => void
}

const categories: { name: FoodCategory; emoji: string; color: string }[] = [
  { name: "한식", emoji: "🍚", color: "from-red-500 to-red-700" },
  { name: "중식", emoji: "🥢", color: "from-yellow-500 to-orange-600" },
  { name: "일식", emoji: "🍣", color: "from-pink-500 to-red-500" },
  { name: "양식", emoji: "🍝", color: "from-green-500 to-blue-500" },
  { name: "기타", emoji: "🌮", color: "from-purple-500 to-pink-500" },
]

export default function CategorySelectionScreen({ onCategorySelect }: CategorySelectionScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-8"
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-5xl font-bold text-white mb-12 text-center"
      >
        어떤 음식이 좋으세요?
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl">
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.4 + index * 0.1,
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategorySelect(category.name)}
            className={`relative w-48 h-48 bg-gradient-to-br ${category.color} rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white font-bold text-xl hover:shadow-3xl transition-all duration-300 group`}
          >
            <motion.div
              className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {category.emoji}
            </motion.div>
            <span className="text-2xl font-bold">{category.name}</span>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-gray-400 text-lg mt-8 text-center"
      >
        카테고리를 선택하면 16강 토너먼트가 시작됩니다!
      </motion.p>
    </motion.div>
  )
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Food, FoodCategory } from "@/app/page";

interface TournamentScreenProps {
  category: FoodCategory;
  onComplete: (winner: Food) => void;
}

// Sample food data - replace with actual images
const foodData: Record<FoodCategory, Food[]> = {
  한식: [
    {
      id: "1",
      name: "비빔밥",
      image: "/images/비빔밥.jpg",
      category: "한식",
    },
    {
      id: "2",
      name: "제육볶음",
      image: "/images/제육볶음.jpg",
      category: "한식",
    },
    {
      id: "3",
      name: "김치찌개",
      image: "/images/김치찌개.jpg",
      category: "한식",
    },
    {
      id: "4",
      name: "불고기",
      image: "/images/불고기.jpg",
      category: "한식",
    },
    {
      id: "5",
      name: "냉면",
      image: "/images/냉면.jpg",
      category: "한식",
    },
    {
      id: "6",
      name: "삼겹살",
      image: "/images/삼겹살.jpg",
      category: "한식",
    },
    {
      id: "7",
      name: "떡볶이",
      image: "/images/떡볶이.jpg",
      category: "한식",
    },
    {
      id: "8",
      name: "치킨",
      image: "/images/치킨.jpg",
      category: "한식",
    },
    {
      id: "9",
      name: "갈비탕",
      image: "/images/갈비탕.jpg",
      category: "한식",
    },
    {
      id: "10",
      name: "순두부찌개",
      image: "/images/순두부찌개.jpg",
      category: "한식",
    },
    {
      id: "11",
      name: "잡채",
      image: "/images/잡채.jpg",
      category: "한식",
    },
    {
      id: "12",
      name: "김밥",
      image: "/images/김밥.jpg",
      category: "한식",
    },
    {
      id: "13",
      name: "된장찌개",
      image: "/images/된장찌개.jpg",
      category: "한식",
    },
    {
      id: "14",
      name: "갈비",
      image: "/images/갈비.jpg",
      category: "한식",
    },
    {
      id: "15",
      name: "보쌈",
      image: "/images/보쌈.jpg",
      category: "한식",
    },
    {
      id: "16",
      name: "족발",
      image: "/images/족발.jpg",
      category: "한식",
    },
  ],
  중식: [
    {
      id: "17",
      name: "짜장면",
      image: "/images/짜장면.jpg",
      category: "중식",
    },
    {
      id: "18",
      name: "짬뽕",
      image: "/images/짬뽕.jpg",
      category: "중식",
    },
    {
      id: "19",
      name: "탕수육",
      image: "/images/탕수육.jpg",
      category: "중식",
    },
    {
      id: "20",
      name: "마파두부",
      image: "/images/마파두부.jpg",
      category: "중식",
    },
    {
      id: "21",
      name: "볶음밥",
      image: "/images/볶음밥.jpg",
      category: "중식",
    },
    {
      id: "22",
      name: "깐풍기",
      image: "/images/깐풍기.jpg",
      category: "중식",
    },
    {
      id: "23",
      name: "양장피",
      image: "/images/양장피.jpg",
      category: "중식",
    },
    {
      id: "24",
      name: "유린기",
      image: "/images/유린기.jpg",
      category: "중식",
    },
    {
      id: "25",
      name: "팔보채",
      image: "/images/팔보채.jpg",
      category: "중식",
    },
    {
      id: "26",
      name: "라조기",
      image: "/images/라조기.jpg",
      category: "중식",
    },
    {
      id: "27",
      name: "고추잡채",
      image: "/images/고추잡채.jpg",
      category: "중식",
    },
    {
      id: "28",
      name: "멘보샤",
      image: "/images/멘보샤.jpg",
      category: "중식",
    },
    {
      id: "29",
      name: "꿔바로우",
      image: "/images/꿔바로우.jpg",
      category: "중식",
    },
    {
      id: "30",
      name: "동파육",
      image: "/images/동파육.jpg",
      category: "중식",
    },
    {
      id: "31",
      name: "마라탕",
      image: "/images/마라탕.jpg",
      category: "중식",
    },
    {
      id: "32",
      name: "훠궈",
      image: "/images/훠궈.jpg",
      category: "중식",
    },
  ],
  일식: [
    {
      id: "33",
      name: "초밥",
      image: "/images/초밥.jpg",
      category: "일식",
    },
    {
      id: "34",
      name: "라멘",
      image: "/images/라멘.jpg",
      category: "일식",
    },
    {
      id: "35",
      name: "돈카츠",
      image: "/images/돈카츠.jpg",
      category: "일식",
    },
    {
      id: "36",
      name: "우동",
      image: "/images/우동.jpg",
      category: "일식",
    },
    {
      id: "37",
      name: "텐동",
      image: "/images/텐동.png",
      category: "일식",
    },
    {
      id: "38",
      name: "야키토리",
      image: "/images/야키토리.png",
      category: "일식",
    },
    {
      id: "39",
      name: "오코노미야키",
      image: "/images/오코노미야키.png",
      category: "일식",
    },
    {
      id: "40",
      name: "타코야키",
      image: "/images/NOT_FOUND.jpg",
      category: "일식",
    },
    {
      id: "41",
      name: "가츠동",
      image: "/images/가츠동.png",
      category: "일식",
    },
    {
      id: "42",
      name: "규동",
      image: "/images/규동.png",
      category: "일식",
    },
    {
      id: "43",
      name: "사시미",
      image: "/images/사시미.png",
      category: "일식",
    },
    {
      id: "44",
      name: "모츠나베",
      image: "/images/모츠나베.png",
      category: "일식",
    },
    {
      id: "45",
      name: "샤브샤브",
      image: "/images/샤브샤브.png",
      category: "일식",
    },
    {
      id: "46",
      name: "스키야키",
      image: "/images/스키야키.png",
      category: "일식",
    },
    {
      id: "48",
      name: "온타마동",
      image: "/images/온타마동.png",
      category: "일식",
    },
  ],
  양식: [
    {
      id: "49",
      name: "스테이크",
      image: "/images/스테이크.png",
      category: "양식",
    },
    {
      id: "50",
      name: "파스타",
      image: "/images/파스타.png",
      category: "양식",
    },
    {
      id: "51",
      name: "피자",
      image: "/images/피자.png",
      category: "양식",
    },
    {
      id: "52",
      name: "햄버거",
      image: "/images/햄버거.png",
      category: "양식",
    },
    {
      id: "53",
      name: "리조또",
      image: "/images/리조또.png",
      category: "양식",
    },
    {
      id: "54",
      name: "샐러드",
      image: "/images/샐러드.png",
      category: "양식",
    },
    {
      id: "55",
      name: "오믈렛",
      image: "/images/오믈렛.png",
      category: "양식",
    },
    {
      id: "56",
      name: "샌드위치",
      image: "/images/샌드위치.png",
      category: "양식",
    },
    {
      id: "57",
      name: "그라탕",
      image: "/images/그라탕.png",
      category: "양식",
    },
    {
      id: "58",
      name: "스프",
      image: "/images/스프.png",
      category: "양식",
    },
    {
      id: "59",
      name: "바게트",
      image: "/images/바게트.png",
      category: "양식",
    },
    {
      id: "60",
      name: "크로와상",
      image: "/images/크로와상.png",
      category: "양식",
    },
    {
      id: "61",
      name: "퀘사디아",
      image: "/images/퀘사디아.png",
      category: "양식",
    },
    {
      id: "62",
      name: "부리또",
      image: "/images/부리또.png",
      category: "양식",
    },
    {
      id: "63",
      name: "타코",
      image: "/images/타코.png",
      category: "양식",
    },
    {
      id: "64",
      name: "나초",
      image: "/images/나초.png",
      category: "양식",
    },
  ],
  기타: [
    {
      id: "47",
      name: "카레",
      image: "/images/카레.png",
      category: "기타",
    },
    {
      id: "65",
      name: "쌀국수",
      image: "/images/쌀국수.png",
      category: "기타",
    },
    {
      id: "66",
      name: "팟타이",
      image: "/images/팟타이.png",
      category: "기타",
    },
    {
      id: "67",
      name: "케밥",
      image: "/images/케밥.png",
      category: "기타",
    },
    {
      id: "68",
      name: "팔라펠",
      image: "/images/팔라펠.png",
      category: "기타",
    },
    {
      id: "69",
      name: "후무스",
      image: "/images/후무스.png",
      category: "기타",
    },
    {
      id: "70",
      name: "비리야니",
      image: "/images/비리야니.png",
      category: "기타",
    },
    {
      id: "71",
      name: "탄두리",
      image: "/images/탄두리.png",
      category: "기타",
    },
    {
      id: "72",
      name: "쿠스쿠스",
      image: "/images/쿠스쿠스.png",
      category: "기타",
    },
    {
      id: "73",
      name: "타진",
      image: "/images/타진.png",
      category: "기타",
    },
    {
      id: "74",
      name: "파에야",
      image: "/images/파에야.png",
      category: "기타",
    },
    {
      id: "75",
      name: "가스파초",
      image: "/images/가스파초.png",
      category: "기타",
    },
    {
      id: "76",
      name: "세비체",
      image: "/images/세비체.png",
      category: "기타",
    },
    {
      id: "77",
      name: "엠파나다",
      image: "/images/엠파나다.png",
      category: "기타",
    },
    {
      id: "78",
      name: "아사이볼",
      image: "/images/아사이볼.png",
      category: "기타",
    },
    {
      id: "79",
      name: "포케볼",
      image: "/images/포케볼.png",
      category: "기타",
    },
  ],
};

export default function TournamentScreen({
  category,
  onComplete,
}: TournamentScreenProps) {
  const [currentRound, setCurrentRound] = useState<Food[]>([]);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [roundName, setRoundName] = useState("16강");
  const [winners, setWinners] = useState<Food[]>([]);

  useEffect(() => {
    // Initialize tournament with shuffled foods
    const foods = [...foodData[category]].sort(() => Math.random() - 0.5);
    setCurrentRound(foods);
    setCurrentMatch(0);
    setWinners([]);
    setRoundName("16강");
  }, [category]);

  const handleFoodSelect = (selectedFood: Food) => {
    const newWinners = [...winners, selectedFood];

    if (currentMatch + 2 < currentRound.length) {
      // More matches in current round
      setCurrentMatch(currentMatch + 2);
      setWinners(newWinners);
    } else {
      // Round complete
      if (newWinners.length === 1) {
        // Tournament complete
        onComplete(newWinners[0]);
      } else {
        // Start next round
        setCurrentRound(newWinners);
        setCurrentMatch(0);
        setWinners([]);

        // Update round name
        if (newWinners.length === 8) setRoundName("8강");
        else if (newWinners.length === 4) setRoundName("4강");
        else if (newWinners.length === 2) setRoundName("결승");
      }
    }
  };

  if (currentRound.length === 0) return null;

  const food1 = currentRound[currentMatch];
  const food2 = currentRound[currentMatch + 1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-8"
    >
      {/* Round Info */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-white mb-2">
          {category} {roundName}
        </h2>
        <p className="text-xl text-gray-300">
          {Math.floor(currentMatch / 2) + 1} /{" "}
          {Math.floor(currentRound.length / 2)} 경기
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
          width: `${
            ((currentMatch / 2 + winners.length) / (currentRound.length / 2)) *
            100
          }%`,
        }}
        className="mt-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        style={{ maxWidth: "400px" }}
      />
    </motion.div>
  );
}

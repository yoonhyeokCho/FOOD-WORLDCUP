"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

interface PacmanGameProps {
  onBack: () => void;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;

// 간단한 미로 맵 (1: 벽, 0: 빈 공간, 2: 음식)
const MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
  [1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
  [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export default function PacmanGame({ onBack }: PacmanGameProps) {
  const [pacmanPos, setPacmanPos] = useState<Position>({ x: 1, y: 1 });
  const [direction, setDirection] = useState<string>("right");
  const [score, setScore] = useState(0);
  const [gameMap, setGameMap] = useState(MAZE.map((row) => [...row]));
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  // 키보드 입력 처리
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (isGameOver || isWin) return;

      const { key } = event;
      const newPos = { ...pacmanPos };
      let newDirection = direction;

      switch (key) {
        case "ArrowUp":
        case "w":
        case "W":
          newPos.y = Math.max(0, pacmanPos.y - 1);
          newDirection = "up";
          break;
        case "ArrowDown":
        case "s":
        case "S":
          newPos.y = Math.min(GRID_SIZE - 1, pacmanPos.y + 1);
          newDirection = "down";
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          newPos.x = Math.max(0, pacmanPos.x - 1);
          newDirection = "left";
          break;
        case "ArrowRight":
        case "d":
        case "D":
          newPos.x = Math.min(GRID_SIZE - 1, pacmanPos.x + 1);
          newDirection = "right";
          break;
        default:
          return;
      }

      // 벽 충돌 검사
      if (gameMap[newPos.y] && gameMap[newPos.y][newPos.x] !== 1) {
        setPacmanPos(newPos);
        setDirection(newDirection);

        // 음식 먹기
        if (gameMap[newPos.y][newPos.x] === 2) {
          const newMap = [...gameMap];
          newMap[newPos.y][newPos.x] = 0;
          setGameMap(newMap);
          setScore((prev) => prev + 10);

          // 승리 조건 확인
          const remainingFood = newMap
            .flat()
            .filter((cell) => cell === 2).length;
          if (remainingFood === 0) {
            setIsWin(true);
          }
        }
      }
    },
    [pacmanPos, direction, gameMap, isGameOver, isWin]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const resetGame = () => {
    setPacmanPos({ x: 1, y: 1 });
    setDirection("right");
    setScore(0);
    setGameMap(MAZE.map((row) => [...row]));
    setIsGameOver(false);
    setIsWin(false);
  };

  const getPacmanEmoji = () => {
    switch (direction) {
      case "up":
        return "🔼";
      case "down":
        return "🔽";
      case "left":
        return "◀️";
      case "right":
      default:
        return "▶️";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex flex-col items-center justify-center p-4"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between w-full max-w-4xl mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          뒤로가기
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            🍔 음식 팩맨 🍔
          </h1>
          <div className="text-xl text-yellow-300 font-bold">점수: {score}</div>
        </div>

        <button
          onClick={resetGame}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          다시 시작
        </button>
      </div>

      {/* 게임 보드 */}
      <div className="relative bg-black border-4 border-blue-500 rounded-lg p-4">
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {gameMap.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-5 h-5 flex items-center justify-center text-xs ${
                  cell === 1
                    ? "bg-blue-600 border border-blue-400"
                    : cell === 2
                    ? "bg-black"
                    : "bg-black"
                }`}
              >
                {cell === 2 && "🍕"}
                {pacmanPos.x === x && pacmanPos.y === y && (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    {getPacmanEmoji()}
                  </motion.div>
                )}
              </div>
            ))
          )}
        </div>

        {/* 게임 오버 오버레이 */}
        {(isGameOver || isWin) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"
          >
            <div className="text-center text-white">
              <div className="text-4xl mb-4">
                {isWin ? "🎉 승리! 🎉" : "💀 게임 오버 💀"}
              </div>
              <div className="text-xl mb-4">최종 점수: {score}</div>
              <button
                onClick={resetGame}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
              >
                다시 시작
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* 조작법 */}
      <div className="mt-4 text-center text-white">
        <div className="text-lg font-bold mb-2">조작법</div>
        <div className="text-sm text-gray-300">
          방향키 또는 WASD로 이동 • 🍕 피자를 모두 먹으면 승리!
        </div>
      </div>

      {/* 게임 상태 */}
      <div className="mt-4 flex gap-4 text-white">
        <div className="bg-blue-600/50 px-4 py-2 rounded-lg">
          남은 음식: {gameMap.flat().filter((cell) => cell === 2).length}개
        </div>
        <div className="bg-purple-600/50 px-4 py-2 rounded-lg">
          현재 위치: ({pacmanPos.x}, {pacmanPos.y})
        </div>
      </div>
    </motion.div>
  );
}

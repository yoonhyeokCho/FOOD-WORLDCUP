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
const MAZE = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2],
  [1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1],
  [1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1],
  [1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1],
  [1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export default function PacmanGame({ onBack }: PacmanGameProps) {
  const [pacmanPos, setPacmanPos] = useState<Position>({ x: 1, y: 1 });
  const [direction, setDirection] = useState("right");
  const [score, setScore] = useState(0);
  const [gameMap, setGameMap] = useState(MAZE.map((row) => [...row]));
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [ghosts, setGhosts] = useState<Position[]>([
    { x: 18, y: 1 },
    { x: 18, y: 18 },
    { x: 1, y: 18 },
  ]);

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
          newPos.y -= 1;
          newDirection = "up";
          break;
        case "ArrowDown":
        case "s":
        case "S":
          newPos.y += 1;
          newDirection = "down";
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          newPos.x -= 1;
          newDirection = "left";
          break;
        case "ArrowRight":
        case "d":
        case "D":
          newPos.x += 1;
          newDirection = "right";
          break;
        default:
          return;
      }

      if (
        newPos.y >= 0 &&
        newPos.y < GRID_SIZE &&
        newPos.x >= 0 &&
        newPos.x < GRID_SIZE &&
        gameMap[newPos.y][newPos.x] !== 1
      ) {
        setPacmanPos(newPos);
        setDirection(newDirection);

        if (gameMap[newPos.y][newPos.x] === 2) {
          const newMap = [...gameMap];
          newMap[newPos.y][newPos.x] = 0;
          setGameMap(newMap);
          setScore((prev) => prev + 10);

          const remaining = newMap.flat().filter((c) => c === 2).length;
          if (remaining === 0) setIsWin(true);
        }
      }
    },
    [pacmanPos, direction, gameMap, isGameOver, isWin]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  // 고스트 이동
  useEffect(() => {
    if (isGameOver || isWin) return;

    const interval = setInterval(() => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          const dx = pacmanPos.x - ghost.x;
          const dy = pacmanPos.y - ghost.y;
          const next = { ...ghost };

          if (Math.abs(dy) > Math.abs(dx)) {
            if (dy > 0 && gameMap[ghost.y + 1]?.[ghost.x] !== 1) next.y += 1;
            else if (dy < 0 && gameMap[ghost.y - 1]?.[ghost.x] !== 1)
              next.y -= 1;
          } else {
            if (dx > 0 && gameMap[ghost.y]?.[ghost.x + 1] !== 1) next.x += 1;
            else if (dx < 0 && gameMap[ghost.y]?.[ghost.x - 1] !== 1)
              next.x -= 1;
          }

          return next;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [pacmanPos, gameMap, isGameOver, isWin]);

  // 고스트 충돌
  useEffect(() => {
    if (ghosts.some((g) => g.x === pacmanPos.x && g.y === pacmanPos.y)) {
      setIsGameOver(true);
    }
  }, [ghosts, pacmanPos]);

  const resetGame = () => {
    setPacmanPos({ x: 1, y: 1 });
    setDirection("right");
    setScore(0);
    setGameMap(MAZE.map((row) => [...row]));
    setIsGameOver(false);
    setIsWin(false);
    setGhosts([
      { x: 18, y: 1 },
      { x: 18, y: 18 },
      { x: 1, y: 18 },
    ]);
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
    <motion.div className="w-full h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="flex justify-between w-full max-w-4xl mb-4 text-white">
        <button onClick={onBack} className="bg-gray-700 px-4 py-2 rounded-lg">
          <ArrowLeft className="inline-block mr-2" />
          뒤로가기
        </button>
        <div className="text-xl font-bold">점수: {score}</div>
        <button
          onClick={resetGame}
          className="bg-green-700 px-4 py-2 rounded-lg"
        >
          다시 시작
        </button>
      </div>

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
                  cell === 1 ? "bg-blue-600 border border-blue-400" : "bg-black"
                }`}
              >
                {cell === 2 && "🍕"}

                {ghosts.map(
                  (g, i) =>
                    g.x === x &&
                    g.y === y && (
                      <motion.div
                        key={`ghost-${i}`}
                        className="text-red-400"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        👻
                      </motion.div>
                    )
                )}

                {pacmanPos.x === x && pacmanPos.y === y && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  >
                    {getPacmanEmoji()}
                  </motion.div>
                )}
              </div>
            ))
          )}
        </div>

        {(isGameOver || isWin) && (
          <motion.div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg text-white text-center">
            <div>
              <div className="text-4xl mb-4">
                {isWin ? "🎉 승리!" : "💀 게임 오버"}
              </div>
              <div className="text-xl mb-4">점수: {score}</div>
              <button
                onClick={resetGame}
                className="bg-green-600 px-6 py-3 rounded-lg"
              >
                다시 시작
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-4 text-white">
        <div>WASD 또는 방향키로 이동 • 🍕 모두 먹으면 승리!</div>
      </div>
    </motion.div>
  );
}

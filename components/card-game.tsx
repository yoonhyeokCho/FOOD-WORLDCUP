import React, { useState, useEffect } from "react";

interface Card {
  id: number;
  emoji: string;
}

const EMOJI_CARDS: string[] = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
].flatMap((emoji) => [emoji, emoji]);

const shuffleCards = (array: string[]): Card[] => {
  return array
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({ id: index, emoji }));
};

export function CardGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = shuffleCards(EMOJI_CARDS);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setIsChecking(false);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = flippedCards;

      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        setMatchedCards((prev) => [...prev, cards[firstIndex].emoji]);
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (
      isChecking ||
      flippedCards.includes(index) ||
      matchedCards.includes(cards[index].emoji)
    ) {
      return;
    }
    setFlippedCards((prev) => [...prev, index]);
  };

  const allMatched = matchedCards.length === EMOJI_CARDS.length / 2;

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl text-center">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800">메모리 게임</h1>
      </div>

      <div className="mb-6 text-lg text-gray-600">
        <p>움직임: {moves}회</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => {
          const isFlipped =
            flippedCards.includes(index) || matchedCards.includes(card.emoji);
          const isMatched = matchedCards.includes(card.emoji);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={isChecking || allMatched}
              className="relative w-full aspect-square perspective cursor-pointer"
            >
              <div
                className={`w-full h-full transition-transform duration-500 transform-style preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front Face */}
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-400 to-pink-400 rounded-xl text-white text-4xl flex justify-center items-center font-bold">
                  ?
                </div>

                {/* Back Face */}
                <div
                  className={`absolute w-full h-full backface-hidden rounded-xl text-4xl flex justify-center items-center rotate-y-180 ${
                    isMatched
                      ? "bg-green-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {card.emoji}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {allMatched && (
        <p className="text-green-500 text-xl font-bold mb-4">
          🎉 축하합니다! 모든 카드를 맞췄습니다! 🎉
        </p>
      )}

      <button
        onClick={initializeGame}
        className="bg-gradient-to-r from-pink-400 to-indigo-400 text-white font-bold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all"
      >
        게임 다시하기
      </button>
    </div>
  );
}

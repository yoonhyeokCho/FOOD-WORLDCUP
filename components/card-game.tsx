import React, { useState, useEffect } from "react";
import "./CardGame.css";

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
    <div className="App">
      <div className="header">
        <h1>메모리 게임</h1>
      </div>
      <div className="stats">
        <p>움직임: {moves}회</p>
      </div>

      <div className="card-grid">
        {cards.map((card, index) => {
          const isFlipped =
            flippedCards.includes(index) || matchedCards.includes(card.emoji);
          const isMatched = matchedCards.includes(card.emoji);

          return (
            <button
              key={card.id}
              className={`card ${isFlipped ? "flipped" : ""} ${
                isMatched ? "matched" : ""
              }`}
              onClick={() => handleCardClick(index)}
              disabled={isChecking || allMatched}
            >
              <div className="card-inner">
                <div className="card-face card-front">?</div>
                <div className="card-face card-back">{card.emoji}</div>
              </div>
            </button>
          );
        })}
      </div>

      {allMatched && (
        <p className="congrats">🎉 축하합니다! 모든 카드를 맞췄습니다! 🎉</p>
      )}

      <button className="reset-button" onClick={initializeGame}>
        게임 다시하기
      </button>
    </div>
  );
}

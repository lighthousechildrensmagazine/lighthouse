"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Send, Gamepad2, Rocket, Sun, Moon, Ghost, Music, Sparkles, Brain, Lightbulb } from "lucide-react";
import Link from "next/link";

// Card Data for Memory Game
const CARD_ICONS = [
  { name: "Rocket", icon: Rocket },
  { name: "Sun", icon: Sun },
  { name: "Moon", icon: Moon },
  { name: "Ghost", icon: Ghost },
  { name: "Gamepad", icon: Gamepad2 },
  { name: "Music", icon: Music },
  // 6 pairs = 12 cards
];

interface Card {
  id: number;
  icon: any;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

// Facts Data
const matchFacts = [
  {
    icon: "🍯",
    fact: "Honey never spoils!",
    details: "Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible."
  },
  {
    icon: "🐙",
    fact: "Octopuses have 3 hearts!",
    details: "Two hearts pump blood to the gills, while the third circulates it to the rest of the body. Also, their blood is blue!"
  },
  {
    icon: "🍌",
    fact: "Bananas are berries...",
    details: "...but strawberries aren't! In botany, a berry is a fruit produced from the ovary of a single flower with seeds inside."
  },
  {
    icon: "🪐",
    fact: "A day on Venus is longer than a year!",
    details: "Venus rotates so slowly that it takes longer to spin once on its axis than it does to orbit the Sun."
  },
  {
    icon: "🧊",
    fact: "Wombat poop is cube-shaped!",
    details: "This strange shape stops it from rolling away, which helps wombats mark their territory on rocks and logs."
  }
];

export default function ActivitiesPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fact Carousel State
  const [activeFact, setActiveFact] = useState(0);

  const nextFact = () => {
    setActiveFact((prev) => (prev + 1) % matchFacts.length);
  };

  const prevFact = () => {
    setActiveFact((prev) => (prev - 1 + matchFacts.length) % matchFacts.length);
  };

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(nextFact, 5000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Game on Mount
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Duplicate icons to create pairs
    const pairs = [...CARD_ICONS, ...CARD_ICONS];

    // Shuffle
    const shuffled = pairs
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        id: index,
        icon: item.icon,
        name: item.name,
        isFlipped: false,
        isMatched: false,
      }));

    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setGameWon(false);
    setIsProcessing(false);
  };

  const handleCardClick = (index: number) => {
    // Prevent clicking if busy, already flipped, or matched
    if (isProcessing || cards[index].isFlipped || cards[index].isMatched) return;

    // Flip the card
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // Check match if 2 cards flipped
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves(prev => prev + 1);

      const [firstIndex, secondIndex] = newFlipped;

      if (newCards[firstIndex].name === newCards[secondIndex].name) {
        // Match found!
        newCards[firstIndex].isMatched = true;
        newCards[secondIndex].isMatched = true;
        setCards(newCards);
        setFlippedIndices([]);
        setIsProcessing(false);

        // Check Win
        if (newCards.every(card => card.isMatched)) {
          setGameWon(true);
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Memory Match Game Section */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-4xl md:text-5xl font-hand font-bold text-indigo-600">
              Memory Match!
            </h1>
          </div>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl">
            Flip the cards to find matching pairs! Can you find them all?
          </p>

          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/50 shadow-xl max-w-4xl mx-auto">

            {/* Game Controls / Status */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-xl font-bold text-indigo-900">
                Moves: <span className="text-lime-600">{moves}</span>
              </div>
              <button
                onClick={initializeGame}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-semibold flex items-center gap-2"
              >
                <Brain className="w-4 h-4" /> Restart
              </button>
            </div>

            {/* Win Message */}
            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-6 bg-lime-100 text-lime-800 rounded-2xl text-center border border-lime-200"
              >
                <h3 className="text-2xl font-bold mb-2">🎉 You Won! 🎉</h3>
                <p>Amazing job! You found all pairs in {moves} moves.</p>
                <button
                  onClick={initializeGame}
                  className="mt-4 px-6 py-2 bg-lime-500 text-white rounded-full font-bold hover:bg-lime-600 transition-colors shadow-lg"
                >
                  Play Again
                </button>
              </motion.div>
            )}

            {/* Game Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  className="aspect-square cursor-pointer perspective-1000"
                  onClick={() => handleCardClick(card.id)}
                >
                  <motion.div
                    className="w-full h-full relative preserve-3d transition-transform duration-500"
                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Card Back (Face Down) */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-lime-400 to-lime-600 rounded-xl shadow-md flex items-center justify-center border-2 border-lime-400/30">
                      <Brain className="w-8 h-8 text-white/40" />
                    </div>

                    {/* Card Front (Face Up) */}
                    <div
                      className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-md flex items-center justify-center border-4 ${card.isMatched ? "border-lime-400 bg-lime-50" : "border-white bg-white"
                        }`}
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <card.icon
                        className={`w-10 h-10 ${card.isMatched ? "text-lime-600" : "text-indigo-600"}`}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Did You Know? Fact Carousel */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Lightbulb className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-hand font-bold text-indigo-600">
              Did You Know?
            </h2>
          </div>

          <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-indigo-50 overflow-hidden min-h-[300px] flex items-center">
            {/* Carousel Content */}
            <div className="w-full relative z-10">
              <motion.div
                key={activeFact}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-6xl mb-6">{matchFacts[activeFact].icon}</div>
                <h3 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-4">
                  {matchFacts[activeFact].fact}
                </h3>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {matchFacts[activeFact].details}
                </p>
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {matchFacts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFact(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === activeFact ? "bg-indigo-600 w-8" : "bg-indigo-200"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevFact}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white text-indigo-600 transition-colors z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
              onClick={nextFact}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white text-indigo-600 transition-colors z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 z-0" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2 z-0" />
          </div>
        </motion.section>

        {/* Submit Section */}
        <motion.section variants={itemVariants}>
          <div className="bg-gradient-to-br from-indigo-500 to-lime-400 rounded-3xl p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Got a story? Submit here!
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              We love hearing from our students! Share your stories, articles,
              artwork, or ideas with us.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
            >
              Submit
              <Send className="w-5 h-5" />
            </Link>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}


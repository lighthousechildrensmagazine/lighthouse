"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Laugh } from "lucide-react";

const jokes = [
  {
    id: 1,
    question: "Why don't scientists trust atoms?",
    answer: "Because they make up everything!",
  },
  {
    id: 2,
    question: "What do you call a fake noodle?",
    answer: "An impasta!",
  },
  {
    id: 3,
    question: "Why did the math book look so sad?",
    answer: "Because it had too many problems!",
  },
  {
    id: 4,
    question: "What's a computer's favorite snack?",
    answer: "Microchips!",
  },
  {
    id: 5,
    question: "Why don't eggs tell jokes?",
    answer: "They'd crack each other up!",
  },
  {
    id: 6,
    question: "What do you call a bear with no teeth?",
    answer: "A gummy bear!",
  },
];

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

export default function ActivitiesPage() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Jokes Section */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Laugh className="w-8 h-8 text-lime-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-600">
              Jokes of the Month
            </h1>
          </div>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl">
            Click on any card to reveal the punchline! 😄
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jokes.map((joke) => {
              const isFlipped = flippedCards.has(joke.id);
              return (
                <motion.div
                  key={joke.id}
                  variants={itemVariants}
                  onClick={() => toggleFlip(joke.id)}
                  className="flip-card h-48 cursor-pointer"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring" as const }}
                    className="flip-card-inner"
                  >
                    {/* Front of card */}
                    <div className="flip-card-front">
                      <div className="bg-gradient-to-br from-indigo-400 to-lime-400 rounded-3xl p-6 h-full flex flex-col items-center justify-center text-white shadow-lg">
                        <Laugh className="w-12 h-12 mb-4" />
                        <p className="text-lg font-semibold text-center">
                          {joke.question}
                        </p>
                        <p className="text-sm mt-4 opacity-80">Click to reveal!</p>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div className="flip-card-back">
                      <div className="bg-gradient-to-br from-lime-400 to-indigo-400 rounded-3xl p-6 h-full flex flex-col items-center justify-center text-white shadow-lg">
                        <p className="text-lg font-semibold text-center">
                          {joke.answer}
                        </p>
                        <p className="text-sm mt-4 opacity-80">Click to flip back!</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
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
            <motion.a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
            >
              Submit Your Work
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}


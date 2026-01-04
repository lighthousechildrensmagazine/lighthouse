"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Sparkles, Users, PenTool, Award, FileText, Puzzle, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef } from "react";

const missionItems = [
  {
    icon: Sparkles,
    title: "Divine Illumination",
    description: "This section brings timeless wisdom to life through simple and engaging lessons inspired by the Qur'an. Children explore values such as honesty, kindness, patience, gratitude, and responsibility—presented in a way that is easy to understand and meaningful for everyday life. These lessons encourage children to grow into compassionate and principled individuals.",
  },
  {
    icon: Award,
    title: "Legendary Personalities",
    description: "Meet the great minds and inspiring leaders from history—educators, scientists, thinkers, reformers, and role models. Through their stories, young readers learn about perseverance, curiosity, courage, and dedication, discovering how ordinary people achieved extraordinary things and how their lessons still matter today.",
  },
  {
    icon: FileText,
    title: "Open Space",
    description: "A platform for young voices to shine! This section features stories, poems, drawings, and artwork submitted by students. Open Space encourages creativity, imagination, and self-expression, giving children the joy of seeing their work published and appreciated.",
  },
  {
    icon: Puzzle,
    title: "Fun Section",
    description: "Learning is even better when it's fun! Packed with puzzles, riddles, brain teasers, quizzes, and mini challenges, this section keeps young minds sharp while making reading an exciting adventure.",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for the "Exploding" desk effect
  // Background stays largely static or moves slowly
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Objects move outward (x/y) and rotate slightly from their initial positions

  // Scissors (Top Left - Mid)
  const yScissors = useTransform(scrollYProgress, [0, 0.5], ["0%", "-150%"]);
  const xScissors = useTransform(scrollYProgress, [0, 0.5], ["0%", "-50%"]);
  const rScissors = useTransform(scrollYProgress, [0, 0.5], [0, -45]);
  const oScissors = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Book (Top Right)
  const yBook = useTransform(scrollYProgress, [0, 0.5], ["0%", "-120%"]);
  const xBook = useTransform(scrollYProgress, [0, 0.5], ["0%", "80%"]);
  const rBook = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const oBook = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Paint (Bottom Center)
  const yPaint = useTransform(scrollYProgress, [0, 0.5], ["0%", "150%"]);
  const xPaint = useTransform(scrollYProgress, [0, 0.5], ["0%", "0%"]);
  const rPaint = useTransform(scrollYProgress, [0, 0.5], [0, 0]);
  const oPaint = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Clips (Bottom Center/Right) -> Increased Size
  const yClips = useTransform(scrollYProgress, [0, 0.5], ["0%", "150%"]);
  const xClips = useTransform(scrollYProgress, [0, 0.5], ["0%", "60%"]);
  const rClips = useTransform(scrollYProgress, [0, 0.5], [0, 90]);
  const oClips = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Pencil (Top Center/Left)
  const yPencil = useTransform(scrollYProgress, [0, 0.5], ["0%", "-200%"]);
  const xPencil = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const rPencil = useTransform(scrollYProgress, [0, 0.5], [0, -90]);
  const oPencil = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Ruler (Right Mid)
  const yRuler = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"]);
  const xRuler = useTransform(scrollYProgress, [0, 0.5], ["0%", "150%"]);
  const rRuler = useTransform(scrollYProgress, [0, 0.5], [0, 45]);
  const oRuler = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Book2 (Bottom Left Corner)
  const yBook2 = useTransform(scrollYProgress, [0, 0.5], ["0%", "120%"]);
  const xBook2 = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);
  const rBook2 = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const oBook2 = useTransform(scrollYProgress, [0, 0.4], [1, 0]);


  // Central Text moves up slightly and scales out
  const scaleText = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const yText = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);
  const oText = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="relative min-h-screen">
      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-[-1]">
        <Image
          src="/desk.png"
          alt="Desk Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Scroll Container for Hero */}
      <div ref={containerRef} className="h-[150vh] relative z-0">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

          {/* Background removed from here as it is now global */}

          {/* Pencil (Top Left Corner) - Scaled 1.5x */}
          <motion.div
            style={{ y: yPencil, x: xPencil, rotate: rPencil, opacity: oPencil }}
            className="absolute top-[5%] left-[5%] w-36 md:w-48 z-10"
          >
            <Image src="/pencil.png" alt="Pencil" width={300} height={300} className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          {/* Scissors (Top Left Mid) - Moved Left */}
          <motion.div
            style={{ y: yScissors, x: xScissors, rotate: rScissors, opacity: oScissors }}
            className="absolute top-[18%] left-[5%] w-60 md:w-96 z-10"
          >
            <Image src="/scissors.png" alt="Scissors" width={300} height={300} className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          {/* Book (Top Right) */}
          <motion.div
            style={{ y: yBook, x: xBook, rotate: rBook, opacity: oBook }}
            className="absolute top-[8%] right-[8%] md:right-[12%] w-56 md:w-80 z-10"
          >
            <Image src="/book.png" alt="Book" width={400} height={400} className="w-full h-auto drop-shadow-2xl" />
          </motion.div>

          {/* Ruler (Right Mid) */}
          <motion.div
            style={{ y: yRuler, x: xRuler, rotate: rRuler, opacity: oRuler }}
            className="absolute top-[40%] right-[2%] w-32 md:w-48 z-10"
          >
            <Image src="/ruler.png.png" alt="Ruler" width={400} height={100} className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          {/* Paint Set (Bottom Center) - Moved Further Down */}
          <motion.div
            style={{ y: yPaint, x: xPaint, rotate: rPaint, opacity: oPaint }}
            className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-48 md:w-72 z-10"
          >
            <Image src="/paint.png" alt="Paint Set" width={400} height={400} className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          {/* Book 2 (Bottom Left Corner) - Moved Down/Left */}
          <motion.div
            style={{ y: yBook2, x: xBook2, rotate: rBook2, opacity: oBook2 }}
            className="absolute bottom-[2%] left-[2%] w-56 md:w-80 z-10"
          >
            <Image src="/book2.png" alt="Book Stack" width={400} height={400} className="w-full h-auto drop-shadow-2xl" />
          </motion.div>

          {/* Clips (Bottom Right) */}
          <motion.div
            style={{ y: yClips, x: xClips, rotate: rClips, opacity: oClips }}
            className="absolute bottom-[10%] right-[15%] w-32 md:w-48 z-10"
          >
            <Image src="/clips.png" alt="Clips" width={400} height={400} className="w-full h-auto drop-shadow-lg" />
          </motion.div>

          {/* Center Text Container */}
          <motion.div
            style={{ scale: scaleText, y: yText, opacity: oText }}
            className="relative z-20 w-full max-w-4xl px-4 flex flex-col items-center text-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-[#1e1b4b] mb-6 mt-12 relative z-10 drop-shadow-2xl">
              Lighting the Path for
              <br />
              <span className="text-lime-500 drop-shadow-md">Curious Young Hearts</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#1e1b4b] max-w-2xl mx-auto mb-10 font-bold leading-relaxed drop-shadow-lg p-4">
              Welcome to Lighthouse, a children's magazine created to inspire, educate, and uplift young minds.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="text-[#1e1b4b] drop-shadow-lg"
            >
              <ChevronDown size={48} strokeWidth={3} />
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10 bg-orange-50/0">

        {/* Latest Issue Card */}
        <section className="mb-20 mt-20">
          <h2 className="text-3xl font-display font-bold text-[#1e1b4b] mb-6 text-center">
            Latest Issue
          </h2>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative w-full max-w-sm"
            >
              <div
                className="relative bg-white border border-gray-300 p-6 transform rotate-2 hover:rotate-3 transition-transform"
                style={{
                  boxShadow: '5px 5px 0px 0px rgba(0,0,0,0.2)',
                }}
              >
                {/* Tape */}
                <Image
                  src="/tape1.png"
                  alt="Tape"
                  width={140}
                  height={70}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                />
                <div className="aspect-[3/4] bg-gradient-to-br from-indigo-400 to-lime-400 flex items-center justify-center mb-4">
                  <BookOpen className="w-24 h-24 text-white opacity-80" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1e1b4b] mb-2">
                  Issue #1
                </h3>
                <p className="text-[#1e1b4b] mb-4">
                  Spring 2024 - Fresh Perspectives
                </p>
                <Link href="/issues">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-lime-400 text-slate-900 rounded-full py-3 text-center font-semibold hover:bg-lime-500 transition-colors"
                  >
                    Read Now
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-display font-bold text-[#1e1b4b] mb-6 text-center">
            What You'll Find Inside Lighthouse
          </h2>
          <p className="text-lg text-[#1e1b4b] max-w-3xl mx-auto mb-12 text-center">
            Lighthouse is thoughtfully divided into exciting sections, each offering something special for growing minds:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {missionItems.map((item, index) => {
              // Randomly select a tape image
              const tapeNumber = useMemo(() => Math.floor(Math.random() * 3) + 1, [index]);
              // Different rotation angles for each sticky note
              const rotations = [-2, 1.5, -1, 2];
              const rotation = rotations[index % rotations.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5, rotate: rotation + 1 }}
                  className="relative bg-yellow-50 border border-yellow-200 p-8 transform transition-transform"
                  style={{
                    rotate: `${rotation}deg`,
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.15), 0px 0px 0px 1px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Tape */}
                  <Image
                    src={`/tape${tapeNumber}.png`}
                    alt="Tape"
                    width={140}
                    height={70}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                  />
                  <h3 className="text-xl font-display font-bold text-[#1e1b4b] mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-[#1e1b4b]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

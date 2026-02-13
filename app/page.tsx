"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Sparkles, Users, PenTool, Award, FileText, Puzzle, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import { fetchIssues, Issue } from "@/lib/api";

function LatestIssueCard() {
  const [latestIssue, setLatestIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues().then(data => {
      if (data.length > 0) {
        setLatestIssue(data[0]); // Data is already sorted newest first
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center font-bold">Loading latest issue...</div>;
  if (!latestIssue) return <div className="text-center">No issues found yet!</div>;

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      className="relative w-full max-w-xs"
    >
      <div
        className="relative bg-white border border-gray-300 p-5 transform rotate-2 hover:rotate-3 transition-transform"
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
          className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 w-36 h-auto"
        />

        <div className="aspect-[210/297] relative mb-4 bg-gray-100">
          {latestIssue.coverImage ? (
            <Image
              src={latestIssue.coverImage}
              alt={latestIssue.title}
              fill
              className="object-contain object-top"
              unoptimized // Google Drive images don't optimize well via Next.js
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Cover</div>
          )}
        </div>

        <h3 className="text-2xl font-hand font-bold text-[#1e1b4b] mb-2">
          {latestIssue.title}
        </h3>
        <p className="text-[#1e1b4b] mb-4">
          {latestIssue.date}
        </p>
        <div
          className="cursor-pointer"
          onClick={() => {
            // Force Google Drive Preview Mode (Reader)
            window.open(`https://drive.google.com/file/d/${latestIssue.id}/preview`, "_blank");
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-lime-400 text-slate-900 rounded-full py-3 text-center font-semibold hover:bg-lime-500 transition-colors"
          >
            Read Now
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

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
      <div ref={containerRef} className="h-[125vh] relative z-0">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

          {/* Background removed from here as it is now global */}

          {/* Pencil (Top Left Corner) - Scaled 1.5x */}
          <motion.div
            style={{ y: yPencil, x: xPencil, rotate: rPencil, opacity: oPencil }}
            className="absolute top-[7%] left-[-10%] md:left-[5%] w-32 md:w-56 z-10"
          >
            <Image src="/pencil.png" alt="Pencil" width={400} height={400} className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          {/* Scissors (Top Left Mid) - Moved Down to Avoid Overlap */}
          <motion.div
            style={{ y: yScissors, x: xScissors, rotate: rScissors, opacity: oScissors }}
            className="absolute top-[25%] left-[-2%] md:left-[12%] w-25 md:w-60 z-10"
          >
            <Image src="/scissors.png" alt="Scissors" width={200} height={200} className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          {/* Book (Top Right) */}
          <motion.div
            style={{ y: yBook, x: xBook, rotate: rBook, opacity: oBook }}
            className="absolute top-[8%] right-[-5%] md:right-[12%] w-32 md:w-80 z-10"
          >
            <Image src="/book.png" alt="Book" width={400} height={400} className="w-full h-auto drop-shadow-2xl" priority />
          </motion.div>

          {/* Ruler (Right Mid) */}
          <motion.div
            style={{ y: yRuler, x: xRuler, rotate: rRuler, opacity: oRuler }}
            className="absolute top-[40%] right-[-5%] md:right-[2%] w-24 md:w-48 z-10"
          >
            <Image src="/ruler.png.png" alt="Ruler" width={400} height={100} className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          {/* Paint Set (Bottom Center) - Moved Further Down */}
          <motion.div
            style={{ y: yPaint, x: xPaint, rotate: rPaint, opacity: oPaint }}
            className="absolute -bottom-[5%] md:-bottom-[13%] left-1/2 -translate-x-1/2 w-40 md:w-72 z-10"
          >
            <Image src="/paint.png" alt="Paint Set" width={400} height={400} className="w-full h-auto drop-shadow-xl" />
          </motion.div>

          {/* Book 2 (Bottom Left Corner) - Moved Down/Left */}
          <motion.div
            style={{ y: yBook2, x: xBook2, rotate: rBook2, opacity: oBook2 }}
            className="absolute bottom-[5%] left-[-5%] md:left-[2%] w-32 md:w-80 z-10"
          >
            <Image src="/book2.png" alt="Book Stack" width={400} height={400} className="w-full h-auto drop-shadow-2xl" />
          </motion.div>

          {/* Clips (Bottom Right) */}
          <motion.div
            style={{ y: yClips, x: xClips, rotate: rClips, opacity: oClips }}
            className="absolute bottom-[10%] right-[5%] md:right-[15%] w-28 md:w-56 z-10"
          >
            <Image src="/clips.png" alt="Clips" width={500} height={500} className="w-full h-auto drop-shadow-lg" />
          </motion.div>

          {/* Center Text Container */}
          <motion.div
            style={{ scale: scaleText, y: yText, opacity: oText }}
            className="relative z-20 w-full max-w-4xl px-4 flex flex-col items-center text-center"
          >
            <h1 className="text-3xl md:text-6xl font-hand font-bold text-[#1e1b4b] mb-6 mt-12 relative z-10 drop-shadow-2xl">
              Lighting the Path for
              <br />
              <span className="text-lime-400 drop-shadow-md">Curious Young Hearts</span>
            </h1>
            <p className="text-lg md:text-2xl text-[#1e1b4b] max-w-2xl mx-auto mb-10 font-bold leading-relaxed drop-shadow-lg p-4">
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
        <section className="mb-50 mt-10">
          <h2 className="text-3xl font-hand font-bold text-[#1e1b4b] mb-6 text-center">
            Latest Issue
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-xs transform rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Dynamic Latest Issue from API */}
              <LatestIssueCard />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-orange-50 border border-orange-200 rounded-3xl p-8 md:p-12 transform -rotate-1 shadow-xl max-w-4xl mx-auto"
            style={{
              boxShadow: '8px 8px 0px 0px rgba(0,0,0,0.1)',
            }}
          >
            {/* Top Tape */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 z-10 rotate-2">
              <Image src="/tape1.png" alt="Tape" fill className="object-contain" />
            </div>

            <h2 className="text-3xl md:text-4xl font-hand font-bold text-[#1e1b4b] mb-8 text-center">
              About Us
            </h2>

            <div className="space-y-6 text-[#1e1b4b] text-lg leading-relaxed">
              <p>
                <span className="font-bold text-indigo-800">Lighthouse</span> is a children's magazine designed to guide young minds with light, values, and imagination. Just as a lighthouse shows the right path in the dark, our magazine aims to illuminate the hearts and thoughts of children with moral clarity, creativity, and purpose.
              </p>
              <p>
                In a world where children are surrounded by fast entertainment and conflicting influences, Lighthouse serves as a meaningful alternative - one that blends learning with joy, stories with wisdom, and fun with values.
              </p>

              <div className="bg-white/60 rounded-2xl p-6 mt-8 border border-orange-100">
                <h3 className="text-xl font-hand font-bold text-indigo-800 mb-3">Our Aim</h3>
                <p>
                  To prepare the future generation with strong moral and ethical values, enabling them to grow into visionary assets for society.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-hand font-bold text-indigo-800 mb-4 mt-6">Our Objectives</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    "To popularize noble thoughts and positive values among children aged 10–14 years",
                    "To provide an engaging and value-based alternative to mainstream entertainment",
                    "To cultivate reading, thinking, and writing skills among children",
                    "To encourage children to express themselves through creativity, stories, and ideas"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-lime-500 text-xl font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-bold text-center mt-8 text-indigo-900">
                Each issue of Lighthouse is thoughtfully curated to educate, inspire, and engage young readers through diverse sections.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-hand font-bold text-[#1e1b4b] mb-6 text-center">
            What You'll Find Inside Lighthouse
          </h2>
          <p className="text-lg text-[#1e1b4b] max-w-3xl mx-auto mb-12 text-center">
            Lighthouse is thoughtfully divided into exciting sections, each offering something special for growing minds:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {missionItems.map((item, index) => {
              // Deterministically select a tape image based on index
              const tapeNumber = (index % 3) + 1;
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
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 w-36 h-auto"
                  />
                  <h3 className="text-xl font-hand font-bold text-[#1e1b4b] mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-[#1e1b4b]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-hand font-bold text-[#1e1b4b] mb-12 text-center">
            Meet the Lighthouse team 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Suhaib Ahmed Khan",
                qualification: "Engineer, AI&DS",
                role: "Editor",
                image: "/suhaib.png"
              },
              {
                name: "Muaz Ahmed Qureshi",
                qualification: "Engineer, ECE",
                role: "Manager",
                image: "/muaz.png"
              },
              {
                name: "Md Jaffer Sulaiman",
                qualification: "Engineer, AI&ML",
                role: "Designer",
                image: "/jaffer.png"
              },
              {
                name: "Musab Latifi",
                qualification: "Engineer, AI&ML",
                role: "Media Manager",
                image: "/musab.png"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg border border-indigo-100"
              >
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full border-4 border-lime-400"
                  />
                </div>
                <h3 className="text-xl font-hand font-bold text-indigo-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-slate-600 mb-1">
                  {member.qualification}
                </p>
                <p className="text-sm text-lime-600 font-bold uppercase tracking-wider">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Connect With Us Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-hand font-bold text-[#1e1b4b] mb-12 text-center">
            Connect with us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto place-items-center">

            {/* WhatsApp */}
            <motion.a
              href="https://chat.whatsapp.com/He3SJn84vuM3IwpVCgVnxP"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3 group w-full"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#25D366] rounded-full flex items-center justify-center text-white transition-shadow">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.1185.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <span className="font-bold text-[#1e1b4b] text-lg text-center">WhatsApp Channel</span>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/lighthousechildrensmagazine/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3 group w-full"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-2xl flex items-center justify-center text-white transition-shadow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="font-bold text-[#1e1b4b] text-lg text-center">Instagram</span>
            </motion.a>

            {/* Facebook */}
            <motion.a
              href="https://www.facebook.com/lighthousemagazines"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-3 group w-full"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1877F2] rounded-full flex items-center justify-center text-white transition-shadow">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span className="font-bold text-[#1e1b4b] text-lg text-center">Facebook</span>
            </motion.a>

          </div>
        </section>
      </div >
    </div >
  );
}

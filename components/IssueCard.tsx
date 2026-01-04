"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface IssueCardProps {
  id: string;
  title: string;
  issueNumber: number;
  date: string;
  onClick: () => void;
}

export default function IssueCard({
  id,
  title,
  issueNumber,
  date,
  onClick,
}: IssueCardProps) {
  // Randomly select a tape image based on the card id for consistency
  const tapeNumber = useMemo(() => {
    return (parseInt(id) % 3) + 1;
  }, [id]);

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative bg-white border border-gray-300 cursor-pointer overflow-hidden"
      style={{
        boxShadow: '5px 5px 0px 0px rgba(0,0,0,0.2)',
      }}
    >
      {/* Tape */}
      <Image
        src={`/tape${tapeNumber}.png`}
        alt="Tape"
        width={80}
        height={40}
        className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
      />
      <div className="aspect-[3/4] bg-gradient-to-br from-indigo-400 to-lime-400 flex items-center justify-center">
        <BookOpen className="w-20 h-20 text-white opacity-80" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-[#1e1b4b] mb-2">
          {title}
        </h3>
        <p className="text-sm text-[#1e1b4b] mb-1">Issue #{issueNumber}</p>
        <p className="text-sm text-[#1e1b4b]">{date}</p>
      </div>
    </motion.div>
  );
}


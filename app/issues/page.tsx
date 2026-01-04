"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import IssueCard from "@/components/IssueCard";
import Modal from "@/components/Modal";

const issues = [
  {
    id: "1",
    title: "Spring 2024 - Fresh Perspectives",
    issueNumber: 1,
    date: "March 2024",
    pdfUrl: "https://drive.google.com/file/d/12345/preview",
  },
  {
    id: "2",
    title: "Winter 2024 - Cozy Stories",
    issueNumber: 2,
    date: "December 2023",
    pdfUrl: "https://drive.google.com/file/d/12345/preview",
  },
  {
    id: "3",
    title: "Fall 2023 - New Beginnings",
    issueNumber: 3,
    date: "September 2023",
    pdfUrl: "https://drive.google.com/file/d/12345/preview",
  },
  {
    id: "4",
    title: "Summer 2023 - Adventure Time",
    issueNumber: 4,
    date: "June 2023",
    pdfUrl: "https://drive.google.com/file/d/12345/preview",
  },
  {
    id: "5",
    title: "Spring 2023 - Blooming Ideas",
    issueNumber: 5,
    date: "March 2023",
    pdfUrl: "https://drive.google.com/file/d/12345/preview",
  },
  {
    id: "6",
    title: "Winter 2023 - Holiday Special",
    issueNumber: 6,
    date: "December 2022",
    pdfUrl: "https://drive.google.com/file/d/12345/preview",
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

export default function IssuesPage() {
  const [selectedIssue, setSelectedIssue] = useState<typeof issues[0] | null>(
    null
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-28">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4 text-center"
        >
          All Issues
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-600 mb-12 text-center max-w-2xl mx-auto"
        >
          Explore our collection of past and current magazine issues. Click on
          any cover to read!
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {issues.map((issue) => (
            <motion.div key={issue.id} variants={itemVariants}>
              <IssueCard
                id={issue.id}
                title={issue.title}
                issueNumber={issue.issueNumber}
                date={issue.date}
                onClick={() => setSelectedIssue(issue)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {selectedIssue && (
        <Modal
          isOpen={!!selectedIssue}
          onClose={() => setSelectedIssue(null)}
          pdfUrl={selectedIssue.pdfUrl}
          title={selectedIssue.title}
        />
      )}
    </div>
  );
}


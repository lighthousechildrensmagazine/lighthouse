"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IssueCard from "@/components/IssueCard";
import Modal from "@/components/Modal";
// import { issues as rawIssues } from "@/data/issues"; // REMOVED
import { fetchIssues, Issue } from "@/lib/api";

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
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    fetchIssues().then(data => {
      setIssues(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-2xl font-display text-indigo-900 animate-pulse">Loading Library...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 pt-48">
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

        {issues.length === 0 ? (
          <div className="text-center text-xl text-gray-500">No issues found. Please check back later!</div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {issues.map((issue) => (
              <motion.div key={issue.id} variants={itemVariants}>
                <IssueCard
                  id={issue.id}
                  title={issue.title}
                  issueNumber={issue.issueNumber || 0}
                  date={issue.date}
                  coverImage={issue.coverImage}
                  onClick={() => setSelectedIssue(issue)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
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


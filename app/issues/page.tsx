"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IssueCard from "@/components/IssueCard";
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

        {issues.length === 0 ? (
          <div className="text-center text-xl text-gray-500">No issues found. Please check back later!</div>
        ) : (
          <div className="space-y-16">
            {/* Group issues by year and sort descending */}
            {Object.entries(
              issues.reduce((acc, issue) => {
                // Try to parse year from date string
                let year = 'Other';
                try {
                  const date = new Date(issue.date);
                  if (!isNaN(date.getFullYear())) {
                    year = date.getFullYear().toString();
                  } else {
                    // Fallback to finding 4 digits
                    const match = issue.date.match(/\b\d{4}\b/);
                    if (match) year = match[0];
                  }
                } catch (e) {
                  const match = issue.date.match(/\b\d{4}\b/);
                  if (match) year = match[0];
                }

                if (!acc[year]) acc[year] = [];
                acc[year].push(issue);
                return acc;
              }, {} as Record<string, Issue[]>)
            )
              .sort(([yearA], [yearB]) => {
                if (yearA === 'Other') return 1;
                if (yearB === 'Other') return -1;
                return parseInt(yearB) - parseInt(yearA);
              })
              .map(([year, yearIssues]) => (
                <motion.div key={year} variants={containerVariants} className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-display font-bold text-indigo-900">
                      {year}
                    </h2>
                    <div className="h-px bg-indigo-900 flex-grow"></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {yearIssues.map((issue) => (
                      <motion.div key={issue.id} variants={itemVariants}>
                        <IssueCard
                          id={issue.id}
                          title={issue.title}
                          issueNumber={issue.issueNumber || 0}
                          date={issue.date}
                          coverImage={issue.coverImage}
                          onClick={() => {
                            // Force Google Drive Standard View (with Toolbar)
                            window.open(`https://drive.google.com/file/d/${issue.id}/view`, "_blank");
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}


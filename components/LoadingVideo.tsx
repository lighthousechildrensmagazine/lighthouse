"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("lighthouse_visited");
    
    if (!hasVisited) {
      setIsVisible(true);
      setShowVideo(true);
    }
  }, []);

  const handleVideoEnd = () => {
    setShowVideo(false);
    localStorage.setItem("lighthouse_visited", "true");
  };

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [showVideo]);

  return (
    <AnimatePresence>
      {isVisible && showVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src="/loading1.mp4"
            className="w-full h-full object-contain"
            muted={false}
            playsInline
            onEnded={handleVideoEnd}
            autoPlay
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}


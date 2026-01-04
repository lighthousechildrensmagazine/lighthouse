"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function Modal({ isOpen, onClose, pdfUrl, title }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-indigo-600">{title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title={title}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


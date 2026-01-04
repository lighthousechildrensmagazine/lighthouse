"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/issues", label: "Issues" },
  { href: "/activities", label: "Fun Zone" },
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
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4"
    >
      <motion.div
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className="bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-slate-200/50 px-6 py-2 flex items-center justify-between"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex items-center">
          <Image
            src="/logo1.png"
            alt="Lighthouse Logo"
            width={85}
            height={85}
            className="object-contain"
          />
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          variants={containerVariants}
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Subscribe Button */}
        <motion.div variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/subscribe"
              className="inline-block px-6 py-2 bg-lime-400 text-slate-900 rounded-full font-semibold text-sm hover:bg-lime-500 transition-colors shadow-md hover:shadow-lg"
            >
              Subscribe
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
}


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/issues", label: "Issues" },
  { href: "/activities", label: "Fun Zone" },
  { href: "/submit", label: "Submit" },
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

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const,
    },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !isMobileMenuOpen) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center w-full pointer-events-none"
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
          className="bg-white/90 backdrop-blur-md rounded-[2rem] shadow-lg border border-slate-200/50 px-6 py-2 w-full max-w-6xl pointer-events-auto"
        >
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <motion.div variants={itemVariants} className="flex items-center">
              <Link href="/">
                <Image
                  src="/logo1.png"
                  alt="Lighthouse Logo"
                  width={85}
                  height={85}
                  className="h-8 md:h-10 w-auto object-contain"
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
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
                      className={`relative px-4 py-2 text-base font-hand font-bold transition-colors ${isActive
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

            {/* Desktop Subscribe & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <motion.div variants={itemVariants} className="hidden md:block">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/subscribe"
                    className="inline-block px-6 py-2 bg-lime-400 text-slate-900 rounded-full font-semibold text-sm hover:bg-lime-500 transition-colors shadow-md hover:shadow-lg"
                  >
                    Subscribe
                  </Link>
                </motion.div>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-indigo-600 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={mobileMenuVariants}
                className="md:hidden overflow-hidden flex flex-col items-center gap-4 pt-4 pb-2 border-t border-slate-100 mt-2"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-hand font-bold transition-colors ${pathname === link.href
                      ? "text-indigo-600"
                      : "text-slate-600 hover:text-indigo-600"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link
                    href="/subscribe"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-block px-8 py-3 bg-lime-400 text-slate-900 rounded-full font-semibold text-sm hover:bg-lime-500 transition-colors shadow-md"
                  >
                    Subscribe
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.nav>
    </>
  );
}


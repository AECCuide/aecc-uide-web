'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { navGlowVariants } from './menuBarData';
import { MenuBarMobile } from './components/menuBarMobile.tsx';
import { MenuBarDesktop } from './components/menuBarDesktop.tsx';

export function MenuBar() {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <motion.nav
      className="fixed p-1 lg:flex lg:min-h-12 lg:gap-sm lg:bg-manitoulinBlack lg:px-4 from-background/80 to-background/40 backdrop-blur-lg border border-border/40 shadow-lg overflow-hidden bg-(--background-bar) top-0 left-0 right-0 z-50"
      initial="initial"
      whileHover="hover"
    >
      <motion.div
        className={`absolute -inset-2 bg-gradient-radial from-transparent ${
          isDarkTheme
            ? 'via-purple-400/30 via-50%'
            : 'via-purple-400/20 via-50%'
        } to-transparent rounded-3xl z-0 pointer-events-none`}
        variants={navGlowVariants}
      />

      {/* Vista móvil */}
      <MenuBarMobile />

      {/* Vista escritorio */}
      <MenuBarDesktop />
    </motion.nav>
  );
}

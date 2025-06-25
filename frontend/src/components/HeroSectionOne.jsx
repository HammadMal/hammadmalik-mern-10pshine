"use client";

import { motion } from "motion/react";

import { AnimatedTooltipPreview } from "./AnimatedTooltipPreview";

export function HeroSectionOne() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
        {/* Gradient overlay - same as user reviews */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Your original content unchanged */}
        <div className="relative px-4 py-10 md:py-20">
          <h1
            className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-200">
            {"Capture your thoughts, organize your ideas"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block">
                  {word}
                </motion.span>
              ))}
          </h1>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400">
            Experience seamless note-taking with powerful organization tools. Keep your thoughts structured, searchable, and always accessible across all your devices.
          </motion.p>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex items-center justify-center gap-20">
            <div className="flex items-center gap-3">
              <AnimatedTooltipPreview />
              <span className="text-sm font-medium mb-9">100+ Users</span>
            </div>

            <button
              className="mb-8 mr-10 w-60 transform rounded-lg bg-black px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Start Taking Notes
            </button>
          </motion.div>
        </div>
      </div>
  );
}
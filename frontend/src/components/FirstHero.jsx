"use client";

import { motion } from "motion/react";
import { UserAvatarsDemo } from "./UserAvatarsDemo";
import { FlipWords } from "./FlipWords";

import Spotlight  from "./Spotlight";

export function FirstHero() {
  const words = ["memories", "concepts", "thoughts"];

  return (

    <>
    
    <div className="absolute inset-0 w-full h-full z-0">

      <Spotlight />

    </div>
    
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center mb-30">

      {/* Hero Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold text-slate-700 dark:text-slate-200 leading-tight">
          {"Capture  your"
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
          <span className="inline-block text-center">
            <FlipWords words={words} className="text-slate-700 dark:text-slate-200 font-bold" />
          </span>
          <br />
          {"Organize your ideas"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index + 10}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: (index + 2) * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block">
                {word}
              </motion.span>
            ))}
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 px-4 text-center text-base sm:text-lg font-normal text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Experience seamless note-taking with powerful organization tools. Keep everything structured, searchable, and always accessible across all your devices.
        </motion.p>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6 sm:gap-8 lg:gap-20">
          
          {/* User Avatars and Count */}
          <div className="flex flex-col items-center order-2 sm:order-1">
            <div className="flex items-center">
              <UserAvatarsDemo />
            </div>
            <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400 -mt-2">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">Trusted by 100+ users</span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            className="w-full sm:w-auto px-8 py-3 transform rounded-lg bg-black text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-lg hover:shadow-xl order-1 sm:order-2 mb-11"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Taking Notes
          </motion.button>
        </motion.div>
      </div>
    </div>

    </>
  );
}

export default FirstHero;
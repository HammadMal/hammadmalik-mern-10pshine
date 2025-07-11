"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export const FAQS = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "transparent",
    "transparent", 
    "transparent",
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1))", // cyan-500 to emerald-500 with opacity
    "linear-gradient(to bottom right, rgba(236, 72, 153, 0.1), rgba(99, 102, 241, 0.1))", // pink-500 to indigo-500 with opacity
    "linear-gradient(to bottom right, rgba(249, 115, 22, 0.1), rgba(234, 179, 8, 0.1))", // orange-500 to yellow-500 with opacity
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[30rem] justify-center space-x-10 rounded-md p-10 
                 scrollbar-hide overflow-y-auto 
                 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      ref={ref}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div 
              key={item.title + index} 
              className="my-20"
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  scale: activeCard === index ? 1.02 : 1,
                }}
                className="text-2xl font-bold text-white mb-4"
                transition={{ duration: 0.3 }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-lg mt-4 max-w-2xl text-gray-300 leading-relaxed"
                transition={{ duration: 0.3 }}
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-80 w-80 overflow-hidden rounded-2xl lg:block",
          "backdrop-blur-sm border border-white/10 shadow-2xl",
          contentClassName
        )}
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  );
};
import React from "react";
import { motion } from "motion/react";

const SponsorsSection = () => {
  const sponsors = [
    {
      name: "Google",
      href: "https://google.com",
      logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg"
    },
    {
      name: "Meta",
      href: "https://meta.com", 
      logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg"
    },
    {
      name: "Microsoft",
      href: "https://microsoft.com",
      logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg"
    },
    {
      name: "Amazon",
      href: "https://amazon.com",
      logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg"
    },
    {
      name: "Apple",
      href: "https://apple.com",
      logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg"
    },
    {
      name: "Netflix",
      href: "https://netflix.com",
      logoUrl: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg"
    }
  ];

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background effects */}
      
      {/* Floating orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p 
            className="text-sm font-semibold uppercase text-gray-400 tracking-wider mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trusted Partners
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Backed by{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              industry leaders
            </span>
          </motion.h2>
        </motion.div>

        {/* Glassmorphism container */}
        <motion.div
          className="
            relative backdrop-blur-sm bg-white/5 border border-white/10 
            rounded-3xl shadow-2xl p-8 md:p-12
            hover:bg-white/10 hover:border-white/20
            transition-all duration-500 group
          "
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ 
            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
          }}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            {/* Sponsors grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
              {sponsors.map((sponsor, index) => (
                <motion.a
                  key={index}
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={sponsor.name}
                  className="
                    group/sponsor relative flex items-center justify-center
                    p-4 rounded-xl transition-all duration-300
                    hover:bg-white/10 hover:scale-110
                    text-gray-400 hover:text-white
                  "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 25px -10px rgba(255, 255, 255, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Sponsor logo */}
                  <div className="transform transition-transform duration-300 group-hover/sponsor:scale-105">
                    <img 
                      src={sponsor.logoUrl} 
                      alt={sponsor.name}
                      className="w-auto h-6 object-contain filter invert"
                    />
                  </div>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover/sponsor:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
                </motion.a>
              ))}
            </div>

            {/* Bottom text */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <p className="text-gray-400 text-sm">
                Join hundreds of companies already using our platform
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {[
            { number: "500+", label: "Companies" },
            { number: "50K+", label: "Active Users" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SponsorsSection;
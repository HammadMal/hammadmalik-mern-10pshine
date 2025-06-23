import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

function NavItem({ text, onClick, isActive = false }) {
  return (
    <motion.div 
      className={`
        relative py-3 px-5 cursor-pointer text-sm font-medium transition-all duration-300
        ${isActive 
          ? 'text-white' 
          : 'text-gray-300 hover:text-white'
        }
        hover:bg-white/5 rounded-full backdrop-blur-sm
      `}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        backgroundColor: "rgba(255, 255, 255, 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
          layoutId="activeIndicator"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        />
      )}
    </motion.div>
  );
}

function Navbar() {
  const [activeItem, setActiveItem] = useState("Experience");
  const [navItems, setNavItems] = useState([
    { text: "Experience", onClick: () => handleNavClick("Experience") },
    { text: "Features", onClick: () => handleNavClick("Features") },
    { text: "Pricing", onClick: () => handleNavClick("Pricing") },
    { text: "About", onClick: () => handleNavClick("About") },
  ]);

  const handleNavClick = (itemText) => {
    setActiveItem(itemText);
    console.log(`Navigate to ${itemText}`);
  };

  useEffect(() => {
    async function fetchNavItems() {
      try {
        // Fetch logic here when needed
      } catch (error) {
        console.error("Failed to fetch navigation items", error);
      }
    }
    fetchNavItems();
  }, []);

  return (
    <motion.div 
      className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center gap-12">
        {/* Logo Section */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white font-bold text-lg">✦</span>
          </motion.div>
          <span className="text-white font-bold text-xl tracking-tight">
            NoteTaker
          </span>
        </motion.div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NavItem 
                text={item.text} 
                onClick={item.onClick}
                isActive={activeItem === item.text}
              />
            </motion.div>
          ))}
        </nav>

        {/* CTA Button */}
        <motion.button
          className="
            relative px-6 py-3 text-sm font-semibold text-black
            bg-white rounded-full hover:bg-gray-100 
            transition-all duration-300
            shadow-lg hover:shadow-2xl transform hover:-translate-y-1
            overflow-hidden group
          "
          onClick={() => console.log("Get Started button clicked")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="relative z-10">Get Started</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden text-white p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Navbar;
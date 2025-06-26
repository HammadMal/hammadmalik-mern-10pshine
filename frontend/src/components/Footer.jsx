import React from "react";
import { motion } from "motion/react";

import brainhive from "../assets/brainhive.png"; 

const Footer = () => {
  const footerNavs = [
    {
      label: "Product",
      items: [
        { href: "javascript:void()", name: "Features" },
        { href: "javascript:void()", name: "Integrations" },
        { href: "javascript:void()", name: "Pricing" },
        { href: "javascript:void()", name: "API" },
      ],
    },
    {
      label: "Company",
      items: [
        { href: "javascript:void()", name: "About" },
        { href: "javascript:void()", name: "Blog" },
        { href: "javascript:void()", name: "Careers" },
        { href: "javascript:void()", name: "Press" },
      ],
    },
    {
      label: "Resources",
      items: [
        { href: "javascript:void()", name: "Documentation" },
        { href: "javascript:void()", name: "Help Center" },
        { href: "javascript:void()", name: "Community" },
        { href: "javascript:void()", name: "Tutorials" },
      ],
    },
    {
      label: "Legal",
      items: [
        { href: "javascript:void()", name: "Privacy" },
        { href: "javascript:void()", name: "Terms" },
        { href: "javascript:void()", name: "Security" },
        { href: "javascript:void()", name: "Cookies" },
      ],
    },
  ];

  const socialIcons = [
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      name: "GitHub", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: "Discord",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.191.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
    },
  ];

  return (
    <motion.footer 
      className="relative mt-20 pt-16 pb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Newsletter Section */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1 max-w-lg text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white mb-2">
              Stay in the loop
            </h3>
            <p className="text-gray-400">
              Get the latest updates, tips, and insights delivered straight to your inbox.
            </p>
          </div>
          
          <div className="flex-1 max-w-md w-full">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="
                    w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                    text-white placeholder-gray-400 outline-none
                    focus:border-blue-500/50 focus:bg-white/10
                    transition-all duration-300
                  "
                />
              </div>
              <motion.button 
                className="
                  px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600
                  text-white font-medium rounded-xl
                  hover:from-blue-600 hover:to-purple-700
                  transition-all duration-300 transform hover:scale-105
                  shadow-lg hover:shadow-xl
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerNavs.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {section.label}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <img src ={brainhive} alt="BrainHive Logo" className="w-10 h-10 rounded-full" />
            
            <div>
              <p className="text-white font-semibold">NoteHive</p>
              <p className="text-gray-400 text-xs">© 2024 All rights reserved.</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialIcons.map((social, idx) => (
              <motion.a
                key={idx}
                href="javascript:void()"
                className="
                  p-2 text-gray-400 hover:text-white 
                  hover:bg-white/5 rounded-lg
                  transition-all duration-300
                "
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
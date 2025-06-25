import React from "react";
import { motion } from "motion/react";

const UserReviewCards = () => {
  const testimonials = [
    {
      name: "Daniella Chen",
      role: "Product Manager",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      review: "The note-taking experience is incredibly smooth and intuitive. The AI-powered organization features have transformed how I manage my daily thoughts and project ideas. It's exactly what I've been looking for in a productivity tool."
    },
    {
      name: "Jane Rodriguez",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      review: "Beautiful interface design that actually enhances productivity. The sync across devices is seamless and the search functionality is incredibly powerful."
    },
    {
      name: "Yanick Thompson",
      role: "Software Developer",
      avatar: "https://randomuser.me/api/portraits/women/18.jpg",
      review: "As a developer, I appreciate the clean architecture and fast performance. The markdown support and code syntax highlighting make it perfect for technical documentation."
    },
    {
      name: "Sarah Kim",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      review: "The collaborative features and real-time sync have revolutionized how my team works together. We can brainstorm, organize, and execute ideas all in one place."
    },
    {
      name: "Andy Watson",
      role: "Marketing Manager",
      avatar: "https://randomuser.me/api/portraits/women/62.jpg",
      review: "The smart categorization and tag suggestions save me hours every week. It's like having a personal assistant that understands exactly how I think and work."
    },
    {
      name: "Emily Parker",
      role: "Research Analyst",
      avatar: "https://randomuser.me/api/portraits/women/19.jpg",
      review: "The security features give me peace of mind when storing sensitive research data. The encryption is robust and the privacy controls are exactly what I need."
    }
  ];

  return (
    <div className="relative py-20 mt-20" id="reviews">
      {/* Background gradient */}
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        {/* Header */}
        <motion.div 
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              thousands
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what our users have to say about their note-taking experience
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="
                relative break-inside-avoid p-8 
                bg-white/5 backdrop-blur-sm border border-white/10 
                rounded-2xl shadow-xl hover:shadow-2xl
                transition-all duration-300 hover:scale-[1.02]
                hover:bg-white/10 hover:border-white/20
                group
              "
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* User Info */}
                <div className="flex gap-4 mb-6">
                  <motion.img
                    className="w-12 h-12 rounded-full ring-2 ring-white/20 object-cover"
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    width="48"
                    height="48"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <div>
                    <h6 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h6>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-300 leading-relaxed">
                  "{testimonial.review}"
                </p>

                {/* Rating Stars */}
                <div className="flex gap-1 mt-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-400 text-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: (index * 0.1) + (i * 0.05) }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-400 mb-6">
            Join thousands of satisfied users
          </p>
          <motion.button
            className="
              px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600
              text-white font-semibold rounded-xl
              hover:from-blue-600 hover:to-purple-700
              transition-all duration-300 transform hover:scale-105
              shadow-lg hover:shadow-xl
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default UserReviewCards;
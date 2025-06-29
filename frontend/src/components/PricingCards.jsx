import React from "react";
import { motion } from "motion/react";

const PricingCards = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      description: "Perfect for getting started with note-taking",
      features: [
        { name: "Create unlimited notes", included: true },
        { name: "Basic organization tools", included: true },
        { name: "Sync across 2 devices", included: true },
        { name: "AI-powered search", included: false },
        { name: "Advanced collaboration", included: false },
        { name: "Priority support", included: false }
      ],
      cta: "Get Started Free",
      href: "/signup",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "/mo",
      description: "For power users who need advanced features",
      features: [
        { name: "Everything in Free", included: true },
        { name: "AI-powered search & insights", included: true },
        { name: "Unlimited device sync", included: true },
        { name: "Advanced collaboration tools", included: true },
        { name: "Custom templates & themes", included: true },
        { name: "Priority support", included: true }
      ],
      cta: "Start Pro Trial",
      href: "/billing",
      popular: true
    }
  ];

  return (
    <div id="pricing" className="relative py-20 overflow-hidden mt-20">
      {/* Background effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-purple-950/5 to-transparent" /> */}
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Simple{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              pricing
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Choose the perfect plan for your note-taking needs. Upgrade or downgrade at any time.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`
                relative flex flex-col rounded-3xl shadow-2xl overflow-hidden
                backdrop-blur-sm bg-white/5 border border-white/10
                hover:bg-white/10 hover:border-white/20
                transition-all duration-500 group
                ${plan.popular ? 'ring-2 ring-blue-500/50' : ''}
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 inset-x-0">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium py-2 px-4 text-center">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`relative p-8 sm:p-10 ${plan.popular ? 'pt-16' : ''}`}>
                {/* Plan name and price */}
                <h3 className="text-xl font-semibold text-blue-400 mb-4">
                  {plan.name}
                </h3>
                <div className="flex items-baseline text-5xl font-bold text-white mb-2">
                  {plan.price}
                  <span className="text-lg font-semibold text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-400 text-base leading-7">
                  {plan.description}
                </p>
              </div>

              {/* Features section */}
              <div className="flex flex-1 flex-col p-2">
                <div className="flex flex-1 flex-col justify-between rounded-2xl bg-white/5 backdrop-blur-sm p-6 sm:p-8 border border-white/10">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + index * 0.2 + featureIndex * 0.1 }}
                      >
                        <div className="flex-shrink-0">
                          {feature.included ? (
                            <svg
                              className="h-6 w-6 text-green-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="h-6 w-6 text-gray-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </div>
                        <p className={`ml-3 text-sm leading-6 ${feature.included ? 'text-gray-300' : 'text-gray-500'}`}>
                          {feature.name}
                        </p>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
                  >
                    <motion.a
                      href={plan.href}
                      className={`
                        inline-block w-full rounded-xl px-6 py-4 text-center text-sm font-semibold leading-5 
                        transition-all duration-300 transform hover:scale-105
                        ${plan.popular 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl' 
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {plan.cta}
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom guarantee */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <p className="text-gray-400 text-sm mb-4">
            ✨ 30-day money-back guarantee • Cancel anytime • No hidden fees
          </p>
          <div className="flex items-center justify-center gap-8 text-xs text-gray-500">
            <span>🔒 Secure payments</span>
            <span>📱 Cancel anytime</span>
            <span>💬 24/7 support</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingCards;
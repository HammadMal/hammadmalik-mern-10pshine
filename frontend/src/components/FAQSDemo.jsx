"use client";
import React from "react";
import {FAQS } from "./FAQS.jsx";

const content = [
  {
    title: "How does NoteHive sync across devices?",
    description:
      "NoteHive uses real-time cloud synchronization to keep your notes updated across all your devices instantly. Whether you're on your phone, tablet, or computer, your notes are always accessible and up-to-date. Our secure cloud infrastructure ensures your data is protected while maintaining lightning-fast sync speeds.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white rounded-lg">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🔄</div>
          <h3 className="text-xl font-bold mb-2">Real-time Sync</h3>
          <p className="text-sm opacity-90">Instant updates across all devices</p>
        </div>
      </div>
    ),
  },
  {
    title: "Is my data secure with NoteHive?",
    description:
      "Absolutely. NoteHive uses end-to-end encryption to protect your notes. Your data is encrypted both in transit and at rest using industry-standard AES-256 encryption. We follow strict privacy policies and never access or share your personal notes. You maintain complete control over your data with options to export or delete at any time.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--indigo-500))] text-white rounded-lg">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Bank-level Security</h3>
          <p className="text-sm opacity-90">End-to-end encrypted notes</p>
        </div>
      </div>
    ),
  },
  {
    title: "Can I collaborate with my team on notes?",
    description:
      "Yes! NoteHive offers powerful collaboration features that allow you to share notes and work together in real-time. You can invite team members to specific notes or folders, set permissions for viewing or editing, and see live changes as they happen. Comments and mentions keep everyone in the loop during collaborative sessions.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white rounded-lg">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
          <p className="text-sm opacity-90">Share and edit together in real-time</p>
        </div>
      </div>
    ),
  },
  {
    title: "What makes NoteHive's AI features special?",
    description:
      "NoteHive's AI goes beyond basic search. Our intelligent system automatically categorizes your notes, suggests relevant tags, and can even help you find connections between different ideas. The AI-powered smart search understands context and can find notes even when you don't remember exact keywords. It learns from your usage patterns to become more helpful over time.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--blue-500))] text-white rounded-lg">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2">Smart AI Assistant</h3>
          <p className="text-sm opacity-90">Intelligent organization and search</p>
        </div>
      </div>
    ),
  },
  {
    title: "How do I get started with NoteHive?",
    description:
      "Getting started is simple! Sign up for a free account and you'll have access to all basic features immediately. You can import existing notes from other platforms, start creating new ones, or explore our templates. Our onboarding guide will walk you through key features, and our support team is always ready to help you make the most of NoteHive.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--green-500),var(--teal-500))] text-white rounded-lg">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Quick Start</h3>
          <p className="text-sm opacity-90">Begin taking notes in minutes</p>
        </div>
      </div>
    ),
  },
];

export function FAQSDemo() {
  return (
    <div className="w-full py-20 relative overflow-hidden">
      {/* Background effects - same as sponsors section */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      {/* Header Section */}
      <div className="text-center mb-16 px-6 relative">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 mt-20">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Everything you need to know about NoteHive and how it can transform your note-taking experience
        </p>
      </div>
      
      <div className="relative">
        <FAQS content={content} contentClassName="bg-transparent backdrop-blur-sm border border-white/10" />
      </div>
    </div>
  );
}
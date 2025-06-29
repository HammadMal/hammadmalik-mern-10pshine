"use client";

import React from "react";
import { WobbleCard } from "./WobbleCard";
import { GraduationCap, Briefcase, Lightbulb, BookOpen, Users, Code } from "lucide-react";

export function WobbleCardDemo() {
  return (
    <div className="w-full py-20">
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Perfect for{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            every workflow
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          From students to professionals, researchers to creators - NoteHive adapts to your unique note-taking needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full px-6">
        
        {/* Students - Large Card */}
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-emerald-600 to-green-700 min-h-[500px] lg:min-h-[400px]"
          className="relative">
          <div className="max-w-lg z-10 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white backdrop-blur-sm">
                #1 Student Choice
              </span>
            </div>
            <h2 className="text-left text-balance text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              Students & Academics
            </h2>
            <p className="text-left text-lg text-emerald-100 leading-relaxed mb-6">
              Organize lecture notes, research papers, and study materials effortlessly. Link concepts across subjects, create study guides, and never lose an important idea again.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <h4 className="text-white font-semibold text-sm mb-1">Lecture Notes</h4>
                <p className="text-emerald-200 text-xs">Record and organize</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <h4 className="text-white font-semibold text-sm mb-1">Research</h4>
                <p className="text-emerald-200 text-xs">Citations & sources</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <h4 className="text-white font-semibold text-sm mb-1">Study Guides</h4>
                <p className="text-emerald-200 text-xs">Auto-generated</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <h4 className="text-white font-semibold text-sm mb-1">Group Projects</h4>
                <p className="text-emerald-200 text-xs">Collaborate easily</p>
              </div>
            </div>
          </div>
          
          {/* Academic Visualization */}
          <div className="absolute -right-5 -bottom-5 opacity-20">
            <div className="relative w-60 h-60">
              <div className="absolute inset-0 bg-white/10 rounded-lg rotate-12"></div>
              <div className="absolute inset-2 bg-white/20 rounded-lg rotate-6"></div>
              <div className="absolute inset-4 bg-white/30 rounded-lg"></div>
              <BookOpen className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white" />
            </div>
          </div>
        </WobbleCard>

        {/* Professionals */}
        <WobbleCard containerClassName="col-span-1 min-h-[400px] bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4">
              Business Professionals
            </h2>
            <p className="text-left text-base text-blue-100 leading-relaxed mb-6">
              Meeting minutes, project planning, client notes, and strategic thinking. Keep your professional life organized and accessible.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Meeting minutes & action items</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Client relationship management</span>
              </div>
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Project documentation</span>
              </div>
            </div>
          </div>
        </WobbleCard>

        {/* Researchers */}
        <WobbleCard containerClassName="col-span-1 min-h-[400px] bg-gradient-to-br from-purple-600 to-pink-600">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4">
              Researchers & Writers
            </h2>
            <p className="text-left text-base text-purple-100 leading-relaxed">
              Collect research, organize sources, and develop ideas. From initial concepts to final publications.
            </p>
            
            {/* Research workflow */}
            <div className="flex flex-col gap-2 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-1 bg-white/30 rounded"></div>
                <span className="text-xs text-purple-200">Source Collection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-white/40 rounded"></div>
                <span className="text-xs text-purple-200">Data Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-1 bg-white/50 rounded"></div>
                <span className="text-xs text-purple-200">Writing & Publishing</span>
              </div>
            </div>
          </div>
        </WobbleCard>

        {/* Developers */}
        <WobbleCard containerClassName="col-span-1 min-h-[400px] bg-gradient-to-br from-slate-700 to-gray-800">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Code className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4">
              Developers & Designers
            </h2>
            <p className="text-left text-base text-slate-300 leading-relaxed">
              Document APIs, save code snippets, track bugs, and brainstorm solutions. Perfect for technical documentation.
            </p>
            
            {/* Code mockup */}
            <div className="bg-black/30 rounded-lg p-3 mt-4 font-mono text-xs">
              <div className="text-green-400">// Quick note</div>
              <div className="text-blue-400">const ideas = [];</div>
              <div className="text-yellow-400">// Remember this bug fix</div>
            </div>
          </div>
        </WobbleCard>

        {/* Content Creators */}
        <WobbleCard containerClassName="col-span-1 min-h-[400px] bg-gradient-to-br from-rose-600 to-pink-700">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4">
              Content Creators
            </h2>
            <p className="text-left text-base text-rose-100 leading-relaxed mb-6">
              Capture inspiration, plan content calendars, and organize creative projects. From initial ideas to published content.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-200 text-sm">
                <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
                <span>Content ideas & inspiration</span>
              </div>
              <div className="flex items-center gap-2 text-rose-200 text-sm">
                <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
                <span>Editorial calendar planning</span>
              </div>
              <div className="flex items-center gap-2 text-rose-200 text-sm">
                <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
                <span>Script & outline drafts</span>
              </div>
            </div>
          </div>
        </WobbleCard>

        {/* Teams - Full Width */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-gradient-to-r from-orange-600 to-red-600 min-h-[400px] lg:min-h-[300px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            <div className="max-w-lg z-10 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white backdrop-blur-sm">
                  Enterprise Ready
                </span>
              </div>
              <h2 className="text-left text-balance text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                Teams & Organizations
              </h2>
              <p className="text-left text-lg text-orange-100 leading-relaxed mb-6">
                Scale your knowledge management across entire teams. Share institutional knowledge, onboard new members, and maintain organizational memory.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold text-sm mb-2">Knowledge Base</h4>
                  <p className="text-orange-200 text-xs">Centralized information</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-2">Onboarding</h4>
                  <p className="text-orange-200 text-xs">New team member docs</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-2">Best Practices</h4>
                  <p className="text-orange-200 text-xs">Shared processes</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-2">Collaboration</h4>
                  <p className="text-orange-200 text-xs">Real-time editing</p>
                </div>
              </div>
            </div>
            
            {/* Team visualization */}
            <div className="relative lg:block hidden">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-white font-semibold mb-4">Team Workspace</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">
                    <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-xs font-bold text-white">A</div>
                    <div>
                      <div className="text-white text-sm">Alice updated "Project Roadmap"</div>
                      <div className="text-orange-200 text-xs">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">
                    <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-xs font-bold text-white">B</div>
                    <div>
                      <div className="text-white text-sm">Bob shared "API Documentation"</div>
                      <div className="text-orange-200 text-xs">1 hour ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white/10 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white">C</div>
                    <div>
                      <div className="text-white text-sm">Charlie commented on "Meeting Notes"</div>
                      <div className="text-orange-200 text-xs">3 hours ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WobbleCard>
      </div>
    </div>
  );
}
"use client";
import { FileText, Lock, Search, Settings, Sparkles, Cloud } from "lucide-react";
import { GlowingEffect } from "./GlowingEffect.jsx";


export function GlowingEffectDemo() {
  return (

    <>
    
    <div className="px-4 py-10 md:py-20">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
        Amazing{' '}   
        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
               Features
        </span>

        </h1>
    </div>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <GridItem
        icon={<FileText className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Organize your thoughts seamlessly"
        description="Create, edit, and organize your notes with our intuitive interface designed for productivity." />
      <GridItem
        icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Customizable workspace"
        description="Tailor your note-taking experience with themes, layouts, and organizational tools that fit your workflow." />
      <GridItem
        icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Secure & private by design"
        description="Your notes are encrypted and stored securely. Only you have access to your thoughts and ideas." />
      <GridItem
        icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="AI-powered smart features"
        description="Auto-categorization, smart tags, and intelligent search help you find and organize content effortlessly." />
      <GridItem
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Powerful search capabilities"
        description="Find any note instantly with our advanced search that works across text, tags, and even handwritten content." />
      <GridItem
        icon={<Cloud className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Sync across all devices"
        description="Access your notes anywhere, anytime. Real-time synchronization keeps your content updated across all your devices." />
    </ul>
    </>
  );
}

const GridItem = ({
  icon,
  title,
  description
}) => {
  return (
    <li className="min-h-[18rem] h-full list-none">
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01} />
        <div
          className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3
                className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2
                className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default GlowingEffectDemo;
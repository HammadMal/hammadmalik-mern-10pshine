import React from "react";

import { HeroSectionOne } from "./HeroSectionOne";
import Navbar from "./Navbar";

import Particles from './Particles';

import GlowingEffectDemo from "./GlowingEffectDemo";

import Footer from "./Footer";




import { GoogleGeminiEffect } from "./GoogleGeminiEffect";
import { useScroll, useTransform } from "motion/react";

import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo";


// import { HeroSectionOne } from "./HeroSectionOne";

export default function FirstPage() {
    const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    });

    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

    return (
        <>
            {/* Full-page background dot grid */}
            <div className="fixed inset-0 w-full h-full z-0">
                {/* <DotGrid
                    dotSize={2}
                    gap={18}
                    baseColor="#FFFFFF"
                    activeColor="#FFFFFF"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                /> */}

                <Particles
      particleColors={['#60A5FA', '#818CF8', '#A78BFA']}
      particleCount={2000}
      particleSpread={5}
      speed={0.05}
      particleBaseSize={15}
      moveParticlesOnHover={false}
      alphaParticles={false}
      disableRotation={false}
    />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <div className="relative z-10 mx-auto my-10 flex max-w-7xl flex-col items-center justify-center min-h-screen pt-20">
                {/* Add more content here as needed */}

                <HeroSectionOne />

                            <div
                className="h-[400vh] bg-transparent w-full dark:border dark:border-black/[0.1] rounded-md relative pt-40 overflow-clip"
                ref={ref}
                >
                <GoogleGeminiEffect
                    pathLengths={[
                    pathLengthFirst,
                    pathLengthSecond,
                    pathLengthThird,
                    pathLengthFourth,
                    pathLengthFifth,
                    ]}
                />
                </div>

                <GlowingEffectDemo />

                {/* <AnimatedTestimonialsDemo /> */}
                

                





                <Footer />



                

            </div>
        </>
    );
}
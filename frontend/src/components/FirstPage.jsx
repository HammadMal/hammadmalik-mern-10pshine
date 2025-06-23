import React from "react";

import { HeroSectionOne } from "./HeroSectionOne";
import Navbar from "./Navbar";
// import DotGrid from './DotGrid';

import Particles from './Particles';

import Footer from "./Footer";

// import { HeroSectionOne } from "./HeroSectionOne";

export default function FirstPage() {
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

                <Footer />

                

            </div>
        </>
    );
}
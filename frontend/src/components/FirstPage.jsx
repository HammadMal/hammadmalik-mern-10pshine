import React from "react";

import { HeroSectionOne } from "./HeroSectionOne";
// import { Navbar } from "./Navbar";

import DotGrid from './DotGrid';

export default function FirstPage() {
    return (
        <>
            {/* Full-page background dot grid */}
            <div className="fixed inset-0 w-full h-full z-0">
                <DotGrid
                    dotSize={2}
                    gap={18}
                    baseColor="#FFFFFF"
                    activeColor="#FFFFFF"
                    proximity={120}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 mx-auto my-10 flex max-w-7xl flex-col items-center justify-center min-h-screen">
                {/* <Navbar /> */}
                {/* Add more content here as needed */}
            </div>
        </>
    );
}
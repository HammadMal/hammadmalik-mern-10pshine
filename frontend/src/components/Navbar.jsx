import react ,{useState,useEffect, useRef  } from "react";

// import { useNavigate } from "react-router-dom";




// import transparent from "../assets/aa.png";

import brainhive from "../assets/brainhive.png";



const Navbar = () => {

    // const ref = useRef(null);
    // const navigate = useNavigate();

    

    // const handleSignIn = () => {
    //     if (ref.current) {
    //       ref.current.continuousStart(); // Start loading animation
    //       let progress = 0;
    //       const interval = setInterval(() => {
    //         progress += 20;
    //         if (progress >= 90) {
    //           clearInterval(interval);
    //           ref.current.complete(); // Complete animation
    //           setTimeout(() => navigate("/login"), 200);
    //         } else {
    //           ref.current.static(progress);
    //         }
    //       }, 100);
    //     } else {
    //       console.error("Loading bar ref is null");
    //     }
    //   };


  return (

          <header className="relative z-10 py-4 px-6 md:px-12 h-24">
                          {/* <LoadingBar color="#3F7D58" ref={ref} height={3} /> */}

    
            <div className="max-w-7xl mx-auto flex justify-between items-center mt-1">
              <div className="flex items-center space-x-2">
              <div>
                  <img src={brainhive} alt="Logo" className="w-12 h-12" />
                </div>
                <span className="text-white font-bold text-xl">NoteHive</span>
              </div>
              <nav className="hidden md:flex space-x-8 mr-12">
                <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
                <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
                <a href="#Reviews" className="text-white/80 hover:text-white transition-colors">Reviews</a>
    
              </nav>
              <button 
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </header>
  );
}       

export default Navbar;
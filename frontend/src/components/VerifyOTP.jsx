import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Orb from './Orb';

import { ToastContainer, toast } from 'react-toastify';


const VerifyOTP = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    otp: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    if (formData.otp.length !== 6) {
      toast('Please enter a valid 6-digit OTP');
      return;
    }
    navigate('/new-password');
  };

  const handleResendOTP = () => {
    console.log('Resend OTP clicked');
  };

  return (
    <>
        <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-20">
        {/* Grid */}
        <div className="grid items-center md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div style={{ width: '100%', height: '450px', position: 'relative' }} className="mb-8">
              <Orb
                hoverIntensity={0.3}
                rotateOnHover={false}
                hue={1}
                forceHoverState={false}
              />
            </div>
            <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
              NoteHive: Revolutionizing note-taking for 2024
            </p>

            {/* Title */}
            <div className="mt-4 md:mb-12 max-w-2xl">
              <p className="text-white-600">
                Join thousands of users who trust NoteHive for intelligent note-taking. Experience AI-powered organization, real-time sync, and secure cloud storage.
              </p>
            </div>
            {/* End Title */}
          </div>
          {/* End Col */}

          <div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                {/* Card */}
                <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-neutral-900">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Verify OTP</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                      Enter the 6-digit code sent to your email
                    </p>
                  </div>

                  <div className="mt-5">
                    {/* OTP */}
                    <div>
                      <div className="relative">
                        <input 
                          type="text" 
                          id="otp" 
                          name="otp"
                          value={formData.otp}
                          onChange={handleInputChange}
                          maxLength="6"
                          className="peer p-3 sm:p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 text-center text-lg tracking-widest" 
                          placeholder="000000"
                        />
                        <label htmlFor="otp" className="absolute top-0 start-0 p-3 sm:p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                          Enter OTP
                        </label>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button 
                        type="submit" 
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Verify OTP
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        Didn't receive the code?
                        <button 
                          type="button"
                          onClick={handleResendOTP}
                          className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 ml-1"
                        >
                          Resend OTP
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                {/* End Card */}
              </div>
            </form>
            {/* End Form */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
    </>
  );
};

export default VerifyOTP;
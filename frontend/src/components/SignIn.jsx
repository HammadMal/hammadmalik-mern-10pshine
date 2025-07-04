import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {Link} from 'react-router-dom';

import Orb from './Orb'; 

const SignIn = () => {
  
  let navigate = useNavigate();




  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    newPassword: '',
    currentPassword: '',
    acceptTerms: false
  });

  
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordFocus = () => {
    setShowPasswordStrength(true);
  };

  const handlePasswordBlur = () => {
    setShowPasswordStrength(false);
  };

  const checkPasswordStrength = (password) => {
    const checks = {
      minLength: password.length >= 6,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return checks;
  };

  const passwordChecks = checkPasswordStrength(formData.newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (

    <>


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
              {/* <h1 className="mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-neutral-200">
                Capture, organize, and sync your thoughts seamlessly
              </h1> */}
              <p className="text-white-600">
                Join thousands of users who trust NoteHive for intelligent note-taking. Experience AI-powered organization, real-time sync, and secure cloud storage.
              </p>
            </div>
            {/* End Title */}

            {/* End Blockquote */}
          </div>
          {/* End Col */}

          <div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                {/* Card */}
                <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-neutral-900">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign In to get started</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                      New to NotesHive?
                      <Link 
                        className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 ml-1" 
                        to="/signup"
                      >
                        Sign up here
                      </Link>
                    </p>
                  </div>

                  <div className="mt-5">
                    <button 
                      type="button" 
                      onClick={handleGoogleSignup}
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    >
                      <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                        <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
                        <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
                        <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
                        <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
                      </svg>
                      Sign In with Google
                    </button>

<div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-700 dark:after:border-neutral-700">or</div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      

                     

                      {/* Email */}
                      <div>
                        <div className="relative">
                          <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="peer p-3 sm:p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2" 
                            placeholder="you@email.com"
                          />
                          <label htmlFor="email" className="absolute top-0 start-0 p-3 sm:p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                            Email
                          </label>
                        </div>
                      </div>

                      

                      {/* New Password */}
                      <div className="relative col-span-full">
                        <div className="relative">
                          <input 
                            type="password" 
                            id="newPassword" 
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            className="peer p-3 sm:p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2" 
                            placeholder="********"
                          />
                          <label htmlFor="newPassword" className="absolute top-0 start-0 p-3 sm:p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                             Password
                          </label>
                        </div>

                        {/* Password Strength Indicator */}
                  
                      </div>

                      {/* Current Password */}

                    </div>
                    {/* End Grid */}


                    {/* End Checkbox */}

                    <div className="mt-5">
                      <button 
                        type="submit" 
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        Sign In
                      </button>

                    <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                        <a href="#" className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500">
                        Forgot your password?
                        </a>
                    </p>
                    </div>
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

}

export default SignIn;   
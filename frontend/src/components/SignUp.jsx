import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Orb from './Orb'; 

const SignUp = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    acceptTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, username } = formData;

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
    if (!password) {
      return {
        minLength: false,
        lowercase: false,
        uppercase: false,
        numbers: false,
        specialChars: false
      };
    }

    const checks = {
      minLength: password.length >= 6,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      specialChars: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return checks;
  };

  const passwordChecks = checkPasswordStrength(formData.password);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password || !formData.username) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          email: formData.email,
          password: formData.password,
          username: formData.username
        },
        { withCredentials: true }
      );
      
      const { success, message } = data;
      
      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response) {
        toast.error(error.response.data.message || 'Signup failed');
      } else if (error.request) {
        toast.error('Unable to connect to server. Please try again.');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }

    // Clear form after submission
    setFormData({
      email: "",
      password: "",
      username: "",
      acceptTerms: false
    });
  };

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-20">
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

            <div className="mt-4 md:mb-12 max-w-2xl">
              <p className="text-white-600">
                Join thousands of users who trust NoteHive for intelligent note-taking. Experience AI-powered organization, real-time sync, and secure cloud storage.
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-neutral-900">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Start your free trial</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                      Already have an account?
                      <Link className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 ml-1" to="/signin">
                        Sign in here
                      </Link>
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="my-6 border-t border-gray-200 dark:border-neutral-700"></div>

                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Username */}
                      <div className="col-span-full">
                        <div className="relative">
                          <input 
                            type="text" 
                            id="username" 
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className="peer p-3 sm:p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2" 
                            placeholder="Your username"
                          />
                          <label htmlFor="username" className="absolute top-0 start-0 p-3 sm:p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                            Username
                          </label>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-span-full">
                        <div className="relative">
                          <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="peer p-3 sm:p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2" 
                            placeholder="you@email.com"
                          />
                          <label htmlFor="email" className="absolute top-0 start-0 p-3 sm:p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                            Email
                          </label>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="relative col-span-full">
                        <div className="relative">
                          <input 
                            type={showPassword ? "text" : "password"}
                            id="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            required
                            className="peer p-3 sm:p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2" 
                            placeholder="********"
                          />
                          <label htmlFor="password" className="absolute top-0 start-0 p-3 sm:p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                            Password
                          </label>
                          
                          {/* Toggle Password Visibility Button */}
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
                          >
                            {showPassword ? (
                              <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                <line x1="2" x2="22" y1="2" y2="22"></line>
                              </svg>
                            ) : (
                              <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {showPasswordStrength && formData.password && (
                          <div className="absolute z-10 w-full bg-gray-100 rounded-lg p-4 dark:bg-neutral-950 mt-2">
                            <div className="flex mt-2 -mx-1">
                              {Object.values(passwordChecks).map((check, index) => (
                                <div
                                  key={index}
                                  className={`h-2 flex-auto rounded-full mx-1 ${
                                    check ? 'bg-teal-500' : 'bg-blue-500 opacity-50'
                                  }`}
                                />
                              ))}
                            </div>

                            <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                              Your password must contain:
                            </h4>

                            <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
                              <li className={`flex items-center gap-x-2 ${passwordChecks.minLength ? 'text-teal-500' : ''}`}>
                                <span className={passwordChecks.minLength ? 'block' : 'hidden'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                                <span className={passwordChecks.minLength ? 'hidden' : 'block'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </span>
                                Minimum number of characters is 6.
                              </li>
                              <li className={`flex items-center gap-x-2 ${passwordChecks.lowercase ? 'text-teal-500' : ''}`}>
                                <span className={passwordChecks.lowercase ? 'block' : 'hidden'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                                <span className={passwordChecks.lowercase ? 'hidden' : 'block'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </span>
                                Should contain lowercase.
                              </li>
                              <li className={`flex items-center gap-x-2 ${passwordChecks.uppercase ? 'text-teal-500' : ''}`}>
                                <span className={passwordChecks.uppercase ? 'block' : 'hidden'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                                <span className={passwordChecks.uppercase ? 'hidden' : 'block'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </span>
                                Should contain uppercase.
                              </li>
                              <li className={`flex items-center gap-x-2 ${passwordChecks.numbers ? 'text-teal-500' : ''}`}>
                                <span className={passwordChecks.numbers ? 'block' : 'hidden'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                                <span className={passwordChecks.numbers ? 'hidden' : 'block'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </span>
                                Should contain numbers.
                              </li>
                              <li className={`flex items-center gap-x-2 ${passwordChecks.specialChars ? 'text-teal-500' : ''}`}>
                                <span className={passwordChecks.specialChars ? 'block' : 'hidden'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </span>
                                <span className={passwordChecks.specialChars ? 'hidden' : 'block'}>
                                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </span>
                                Should contain special characters.
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="mt-5 flex items-center">
                      <div className="flex">
                        <input 
                          id="acceptTerms" 
                          name="acceptTerms" 
                          type="checkbox" 
                          checked={formData.acceptTerms}
                          onChange={handleInputChange}
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                        />
                      </div>
                      <div className="ms-3">
                        <label htmlFor="acceptTerms" className="text-sm dark:text-white">
                          I accept the <a className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500" href="#">Terms and Conditions</a>
                        </label>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                          </>
                        ) : (
                          'Get started'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
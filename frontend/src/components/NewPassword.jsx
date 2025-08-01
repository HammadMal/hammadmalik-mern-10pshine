import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Orb from './Orb';

import { ToastContainer, toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:4000';

const NewPassword = () => {
  let navigate = useNavigate();
  const location = useLocation();
  
  // Get email and OTP from previous component
  const email = location.state?.email || '';
  const otp = location.state?.otp || '';

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if no email or OTP
  useEffect(() => {
    if (!email || !otp) {
      toast.error('Invalid access. Please start from forgot password.');
      navigate('/forgot-password');
    }
  }, [email, otp, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  // Check if password meets minimum requirements
  const isPasswordValid = passwordChecks.minLength;
  const passwordsMatch = formData.newPassword === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Validation
    if (!isPasswordValid) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          otp: otp,
          newPassword: formData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }
      
      // Show success message
      toast.success(data.message || 'Password reset successfully!');
      
      // Navigate to sign in after successful reset
      setTimeout(() => {
        navigate('/signin', { 
          state: { 
            message: 'Password reset successful! Please sign in with your new password.' 
          } 
        });
      }, 2000);

    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Don't render if no email or OTP
  if (!email || !otp) {
    return null;
  }

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
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Create New Password</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                      Enter your new password for <span className="font-medium text-blue-600">{email}</span>
                    </p>
                  </div>

                  <div className="mt-5">
                    {/* Grid */}
                    <div className="grid gap-4">
                      {/* New Password */}
                      <div className="relative">
                        <div className="relative">
                          <input 
                            type="password" 
                            id="newPassword" 
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                            disabled={loading}
                            className="peer p-3 sm:p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2" 
                            placeholder="********"
                            required
                          />
                          <label htmlFor="newPassword" className="absolute top-0 start-0 p-3 sm:p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                            New Password
                          </label>
                        </div>

                        {/* Password Strength Indicator */}
                        {showPasswordStrength && formData.newPassword && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-md dark:bg-neutral-800">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className={`flex items-center gap-2 ${passwordChecks.minLength ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{passwordChecks.minLength ? '✓' : '✗'}</span>
                                <span>6+ characters</span>
                              </div>
                              <div className={`flex items-center gap-2 ${passwordChecks.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{passwordChecks.lowercase ? '✓' : '✗'}</span>
                                <span>Lowercase</span>
                              </div>
                              <div className={`flex items-center gap-2 ${passwordChecks.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{passwordChecks.uppercase ? '✓' : '✗'}</span>
                                <span>Uppercase</span>
                              </div>
                              <div className={`flex items-center gap-2 ${passwordChecks.numbers ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{passwordChecks.numbers ? '✓' : '✗'}</span>
                                <span>Numbers</span>
                              </div>
                              <div className={`flex items-center gap-2 col-span-2 ${passwordChecks.specialChars ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{passwordChecks.specialChars ? '✓' : '✗'}</span>
                                <span>Special characters</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password */}
                      <div className="relative">
                        <div className="relative">
                          <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="peer p-3 sm:p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2" 
                            placeholder="********"
                            required
                          />
                          <label htmlFor="confirmPassword" className="absolute top-0 start-0 p-3 sm:p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:scale-90 peer-focus:translate-x-0.5 peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
                            Confirm Password
                          </label>
                        </div>

                        {/* Password Match Indicator */}
                        {formData.confirmPassword && (
                          <div className="mt-2">
                            <div className={`text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                              {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* End Grid */}

                    <div className="mt-5">
                      <button 
                        type="submit" 
                        disabled={loading || !isPasswordValid || !passwordsMatch || !formData.newPassword || !formData.confirmPassword}
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {loading ? 'Resetting Password...' : 'Reset Password'}
                      </button>
                    </div>

                    <div className="mt-4 text-center">
                      <Link 
                        to="/verify-otp"
                        state={{ email }}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200 mr-4"
                      >
                        ← Back to OTP verification
                      </Link>
                    </div>

                    <div className="mt-2 text-center">
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        Remember your password?
                        <Link 
                          className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 ml-1" 
                          to="/signin"
                        >
                          Sign in here
                        </Link>
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

export default NewPassword;
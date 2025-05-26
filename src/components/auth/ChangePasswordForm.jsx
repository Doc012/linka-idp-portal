import { useState } from 'react';
import { motion } from 'framer-motion';

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Check password strength when new password is updated
    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordFeedback('');
      return;
    }

    let strength = 0;
    let feedback = '';

    // Length check
    if (password.length >= 8) {
      strength += 25;
    } else {
      feedback = 'Password should be at least 8 characters';
    }

    // Contains uppercase
    if (/[A-Z]/.test(password)) {
      strength += 25;
    } else if (!feedback) {
      feedback = 'Add an uppercase letter';
    }

    // Contains number
    if (/\d/.test(password)) {
      strength += 25;
    } else if (!feedback) {
      feedback = 'Add a number';
    }

    // Contains special char
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 25;
    } else if (!feedback) {
      feedback = 'Add a special character';
    }

    setPasswordStrength(strength);

    if (strength === 100) {
      setPasswordFeedback('Strong password');
    } else if (strength >= 75) {
      setPasswordFeedback('Good password');
    } else if (strength >= 50) {
      setPasswordFeedback('Fair password');
    } else if (strength >= 25) {
      setPasswordFeedback('Weak password');
    } else {
      setPasswordFeedback(feedback || 'Very weak password');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 100) return 'bg-green-500';
    if (passwordStrength >= 75) return 'bg-blue-500';
    if (passwordStrength >= 50) return 'bg-yellow-500';
    if (passwordStrength >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getPasswordStrengthTextColor = () => {
    if (passwordStrength >= 100) return 'text-green-600';
    if (passwordStrength >= 75) return 'text-blue-600';
    if (passwordStrength >= 50) return 'text-yellow-600';
    if (passwordStrength >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate that passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Change password form submitted:', formData);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg overflow-hidden transform hover:shadow-xl transition-all duration-300"
      >
        <div className="px-6 py-8 sm:px-10">
          <div className="mb-6 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
            >
              <svg className="mx-auto h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>
            <motion.h2 
              className="mt-4 text-3xl font-extrabold text-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Change Your Password
            </motion.h2>
            <motion.p 
              className={`mt-2 text-sm ${isSubmitted ? 'text-green-600' : 'text-gray-600'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {!isSubmitted 
                ? 'Create a new password for your account' 
                : 'Your password has been successfully updated!'}
            </motion.p>
          </div>
          
          {!isSubmitted ? (
            <motion.form 
              className="space-y-6" 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    required
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pl-10 block w-full px-3 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    placeholder="Enter your current password"
                  />
                  <div 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="pl-10 block w-full px-3 py-3 rounded-md border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                      placeholder="Enter new password"
                    />
                    <div 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Password strength indicator */}
                {formData.newPassword && (
                  <motion.div 
                    className="mt-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${getPasswordStrengthColor()}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    </div>
                    <p className={`text-xs mt-1 ${getPasswordStrengthTextColor()}`}>
                      {passwordFeedback}
                    </p>
                  </motion.div>
                )}
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 block w-full px-3 py-3 rounded-md border ${
                        formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-150`}
                      placeholder="Confirm your new password"
                    />
                    {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                    <motion.p 
                      className="mt-1 text-xs text-red-500"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Passwords don't match
                    </motion.p>
                  )}
                </div>
              </div>
              
              <div>
                <motion.button
                  type="submit"
                  disabled={isLoading || (formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword)}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white ${
                    isLoading || (formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword)
                      ? 'bg-indigo-400 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  } transition-all duration-200 ease-in-out transform hover:scale-[1.02]`}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      Change Password
                    </>
                  )}
                </motion.button>
              </div>
              
              <div className="mt-4 text-center">
                <a href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                  Back to login
                </a>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <motion.p 
                className="text-lg font-medium text-gray-900 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                Password Changed
              </motion.p>
              <motion.p 
                className="text-sm text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Your password has been successfully updated.
              </motion.p>
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <a 
                  href="/login" 
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-colors"
                >
                  Back to Login
                </a>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePasswordForm;
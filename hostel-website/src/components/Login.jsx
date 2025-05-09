import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
// Remove this line since it's not being used
// import { BookRoom } from '../components/BookRoom';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  // Add new state variables for OTP verification
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [hasSelected, setHasSelected] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    studentId: '',
    adminId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Add OTP handling functions
  const handleSendOTP = async () => {
    if (!formData.email) {
      alert('Please enter email first');
      return;
    }
    setOtpSent(true);
    alert('OTP sent to your email!');
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      setEmailVerified(true);
      alert('Email verified successfully!');
    } else {
      alert('Invalid OTP');
    }
  };

  // Modify handleSubmit to include email verification check
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdmin && !isSignIn && !emailVerified) {
      alert("Please verify your email first!");
      return;
    }
    if (!isAdmin && !isSignIn && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Add authentication success handling
    onLoginSuccess();

    // Navigate based on user type
    if (isAdmin) {
      navigate('/student-complaint'); // Navigate to admin dashboard/complaints page
    } else {
      navigate('/book-room'); // Navigate to student booking page
    }

    console.log('Form submitted:', { 
      ...formData, 
      userType: isAdmin ? 'admin' : 'student', 
      mode: isSignIn ? 'signin' : 'signup' 
    });
  };

  const switchMode = (mode) => {
    setIsSignIn(mode);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      studentId: ''
    });
  };

  const toggleUserType = (adminMode) => {
    setIsAdmin(adminMode);
    setIsSignIn(true);
    setHasSelected(true);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      studentId: ''
    });
  };

  const handleBack = () => {
    setHasSelected(false);
    setIsSignIn(true);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      studentId: ''
    });
  };

  const handleSignUp = () => {
    navigate('/admission'); // This will redirect to the admission page
  };

  return (
    <div className="auth-container">
      <div className={`auth-wrapper ${isAdmin ? 'admin-mode' : 'student-mode'}`}>
        {hasSelected && (
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
        )}
        
        {!hasSelected ? (
          <div className="user-toggle">
            <button 
              className={`toggle-type ${!isAdmin ? 'active' : ''}`}
              onClick={() => toggleUserType(false)}
            >
              Student
            </button>
            <button 
              className={`toggle-type ${isAdmin ? 'active' : ''}`}
              onClick={() => toggleUserType(true)}
            >
              Administrator
            </button>
          </div>
        ) : (
          <div className="selected-type">
            {isAdmin ? 'Administrator Portal' : 'Student Portal'}
          </div>
        )}

        <div className="auth-header">
          <h1>
            {isAdmin 
              ? (isSignIn ? 'Administrator Login' : 'Administrator Registration')
              : (isSignIn ? 'Student Login' : 'Student Registration')}
          </h1>
          <p>
            {isAdmin 
              ? (isSignIn ? 'Please sign in with your admin credentials' : 'Create new administrator account')
              : (isSignIn ? 'Welcome back, please login to your account' : 'Create your student account')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Add admin registration fields */}
          {isAdmin && !isSignIn && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter administrator name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="adminId">Administrator ID</label>
                <input
                  type="text"
                  id="adminId"
                  name="adminId"
                  placeholder="Enter administrator ID"
                  value={formData.adminId}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          
          <div className="form-group">
            <label htmlFor="email">
              {isAdmin ? 'Admin Email' : 'Email Address'}
            </label>
            <div className="email-verification-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder={`Enter ${isAdmin ? 'admin' : 'your'} email`}
                value={formData.email}
                onChange={handleChange}
                required
              />
              {isAdmin && !isSignIn && !emailVerified && (
                <button 
                  type="button" 
                  onClick={handleSendOTP} 
                  className="otp-button"
                  disabled={!formData.email}
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>

          {isAdmin && !isSignIn && otpSent && !emailVerified && (
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <div className="email-verification-group">
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                  required
                />
                <button 
                  type="button" 
                  onClick={handleVerifyOTP} 
                  className="otp-button"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}

          {isAdmin && !isSignIn && emailVerified && (
            <div className="verification-status success">
              ✓ Email Verified Successfully
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isAdmin && !isSignIn && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className={`auth-button ${isAdmin ? 'admin-button' : ''}`}>
            {isAdmin 
              ? (isSignIn ? 'Administrator Sign In' : 'Create Administrator Account')
              : (isSignIn ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Add admin account creation option */}
        {isAdmin && (
          <div className="auth-footer">
            {isSignIn ? (
              <p>Need an admin account? <button className="switch-btn" onClick={() => switchMode(false)}>Create Account</button></p>
            ) : (
              <p>Already have an admin account? <button className="switch-btn" onClick={() => switchMode(true)}>Sign In</button></p>
            )}
          </div>
        )}

        {/* Student footer remains the same */}
        {!isAdmin && (
          <div className="auth-footer">
            {isSignIn ? (
              <p>Don't have an account? <button className="switch-btn" onClick={handleSignUp}>Apply for Admission</button></p>
            ) : (
              <p>Already have an account? <button className="switch-btn" onClick={() => switchMode(true)}>Sign In</button></p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

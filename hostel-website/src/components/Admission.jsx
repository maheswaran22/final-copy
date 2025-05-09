import React, { useState } from "react";
import "./admission.css";

const Admission = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    department: '',
    year: '',
    photo: null,
    aadharCard: null,
    marksheet: null,
    incomeCertificate: null,
    communityCertificate: null
  });

  const [passwordError, setPasswordError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Password validation
    if ((name === 'password' || name === 'confirmPassword') && formData.confirmPassword) {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else if (name === 'password' && value !== formData.confirmPassword) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    const maxSize = name === 'photo' ? 1024 * 1024 : 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size should not exceed ${maxSize === 1024 * 1024 ? '1MB' : '2MB'}`);
      e.target.value = '';
      return;
    }

    if (name === 'photo' && !file.type.includes('jpeg')) {
      alert('Please upload a JPG/JPEG image file');
      e.target.value = '';
      return;
    }

    if (name !== 'photo' && file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      e.target.value = '';
      return;
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: file
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailVerified) {
      alert("Please verify your email before submitting.");
      return;
    }

    if (passwordError) {
      alert("Please fix password mismatch.");
      return;
    }

    console.log("Form submitted:", formData);
    // You can now send `formData` to backend here
  };

  return (
    <div className="container">
      <h1>Hostel Admission Form</h1>
      <form onSubmit={handleSubmit}>

        {/* Name, Father, Mother */}
        <div className="input-name">
          <h4>Enter your Name</h4>
          <i className="fa fa-user"></i>
          <input type="text" name="name" className="name" placeholder="Full Name"
            value={formData.name} onChange={handleChange} required />
        </div>

        <div className="input-name">
          <h4>Enter your Father Name</h4>
          <i className="fa fa-user"></i>
          <input type="text" name="fatherName" className="name" placeholder="Father Name"
            value={formData.fatherName} onChange={handleChange} required />
        </div>

        <div className="input-name">
          <h4>Enter your Mother Name</h4>
          <i className="fa fa-user"></i>
          <input type="text" name="motherName" className="name" placeholder="Mother Name"
            value={formData.motherName} onChange={handleChange} required />
        </div>

        {/* Email & OTP */}
        <div className="input-name">
          <h4>Enter your Mail id</h4>
          <i className="fa fa-envelope"></i>
          <input type="email" name="email" className="text-name" placeholder="Email"
            value={formData.email} onChange={handleChange} required />
          {!emailVerified && (
            <button type="button" onClick={handleSendOTP} className="otp-button" disabled={!formData.email}>
              Send OTP
            </button>
          )}
        </div>

        {otpSent && !emailVerified && (
          <div className="input-name">
            <h4>Enter OTP</h4>
            <i className="fa fa-key"></i>
            <input type="text" className="text-name" placeholder="Enter 6-digit OTP"
              value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" required />
            <button type="button" onClick={handleVerifyOTP} className="otp-button">Verify OTP</button>
          </div>
        )}

        {emailVerified && (
          <div className="verification-status">
            <p className="success-message">✓ Email Verified</p>
          </div>
        )}

        {/* Password */}
        <div className="input-name">
          <h4>Create Password</h4>
          <i className="fa fa-lock"></i>
          <input type="password" name="password" className="text-name" placeholder="Create Password"
            value={formData.password} onChange={handleChange} required minLength="8" />
        </div>

        <div className="input-name">
          <h4>Confirm Password</h4>
          <i className="fa fa-lock"></i>
          <input type="password" name="confirmPassword" className="text-name" placeholder="Confirm Password"
            value={formData.confirmPassword} onChange={handleChange} required minLength="8" />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        {/* Phone */}
        <div className="input-name">
          <h4>Enter your Phone number</h4>
          <i className="fa fa-phone"></i>
          <input type="tel" name="phone" className="text-name" placeholder="Phone Number"
            value={formData.phone} onChange={handleChange} required />
        </div>

        {/* Gender */}
        <div className="input-name">
          <i className="fa fa-users" aria-hidden="true"></i>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Department */}
        <div className="input-name">
          <h4>Select your Department</h4>
          <i className="fa fa-graduation-cap"></i>
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science Engineering</option>
            <option value="ECE">Electronics and Communication Engineering</option>
            <option value="EEE">Electrical and Electronics Engineering</option>
            <option value="MECH">Mechanical Engineering</option>
            <option value="CIVIL">Civil Engineering</option>
            <option value="IT">Information Technology</option>
          </select>
        </div>

        {/* Year */}
        <div className="input-name">
          <h4>Select your Year</h4>
          <i className="fa fa-calendar"></i>
          <select name="year" value={formData.year} onChange={handleChange} required>
            <option value="">Select Year</option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
            <option value="4">Fourth Year</option>
          </select>
        </div>

        {/* File Uploads */}
        {[
          { name: "photo", label: "Upload Recent Passport Size Photo (JPG only, max 1MB)", accept: ".jpg,.jpeg" },
          { name: "aadharCard", label: "Upload Aadhar Card (PDF only, max 2MB)", accept: ".pdf" },
          { name: "marksheet", label: "Upload Previous Year Marksheet (PDF only, max 2MB)", accept: ".pdf" },
          { name: "incomeCertificate", label: "Upload Income Certificate (PDF only, max 2MB)", accept: ".pdf" },
          { name: "communityCertificate", label: "Upload Community Certificate (PDF only, max 2MB)", accept: ".pdf" }
        ].map((fileInput) => (
          <div className="file-section" key={fileInput.name}>
            <p>{fileInput.label}</p>
            <div className="file-upload">
              <input
                type="file"
                name={fileInput.name}
                id={fileInput.name}
                accept={fileInput.accept}
                onChange={handleFileChange}
                required
              />
              <label htmlFor={fileInput.name} className="file-label">
                <i className="fa fa-cloud-upload"></i> Choose File
              </label>
              <span className="file-name">{formData[fileInput.name]?.name || "No file chosen"}</span>
            </div>
          </div>
        ))}

        <button type="submit" className="button">Submit Application</button>
      </form>
    </div>
  );
};

export default Admission;

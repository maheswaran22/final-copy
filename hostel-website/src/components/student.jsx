import React, { useState } from 'react';
import './styles.css';

const StudentComplaint = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [complaints] = useState([
    { 
      id: 1, 
      studentName: 'John Doe',
      roomNo: 'A101',
      title: 'Water Issue', 
      description: 'No water supply in bathroom', 
      status: 'Pending',
      date: '2024-02-20'
    },
    { 
      id: 2, 
      studentName: 'Jane Smith',
      roomNo: 'B102',
      title: 'Electrical Problem', 
      description: 'Fan not working', 
      status: 'Resolved',
      date: '2024-02-19'
    }
  ]);
  const [blockADetails] = useState({
    totalRooms: 20,
    occupied: 0,
    available: 20
  });

  const [blockBDetails] = useState({
    totalRooms: 20,
    occupied: 0,
    available: 20
  });

  const [currentResidents] = useState([]);

  const renderComplaints = () => (
    <div className="complaints-section">
      <h1>Student Complaints</h1>
      <div className="complaints-list">
        {complaints.map(complaint => (
          <div key={complaint.id} className={`complaint-card ${complaint.status.toLowerCase()}`}>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
            <div className="complaint-meta">
              <span className="student-info">
                {complaint.studentName} - Room {complaint.roomNo}
              </span>
              <span className="date">{complaint.date}</span>
            </div>
            <span className="status">{complaint.status}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">
          <img src="/logo.png" alt="UCE-DINDIGUL" />
          <h2>UCE-DINDIGUL</h2>
        </div>
        
        <div className="stats-container">
          <div className="stat-item">
            <h3>Total Rooms</h3>
            <span>20</span>
          </div>
          <div className="stat-item">
            <h3>Occupied</h3>
            <span>0</span>
          </div>
          <div className="stat-item">
            <h3>Available</h3>
            <span>20</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a 
            href="#" 
            className={activeTab === 'home' ? 'active' : ''} 
            onClick={() => setActiveTab('home')}
          >
            Home
          </a>
          <a 
            href="#" 
            className={activeTab === 'complaints' ? 'active' : ''} 
            onClick={() => setActiveTab('complaints')}
          >
            Complaints
          </a>
        </nav>

        <button className="sign-out-btn">SIGN OUT</button>
      </div>

      <main className="main-content">
        {activeTab === 'home' ? (
          <>
            <h1>Admin Dashboard</h1>
            <div className="hostel-overview">
              <h2>Hostel Rooms Overview</h2>
              
              <div className="blocks-container">
                <div className="block-card">
                  <h3>Block A (Boys)</h3>
                  <div className="block-stats">
                    <p>Total Rooms: {blockADetails.totalRooms}</p>
                    <p>Occupied: {blockADetails.occupied}</p>
                    <p>Available: {blockADetails.available}</p>
                  </div>
                </div>

                <div className="block-card">
                  <h3>Block B (Girls)</h3>
                  <div className="block-stats">
                    <p>Total Rooms: {blockBDetails.totalRooms}</p>
                    <p>Occupied: {blockBDetails.occupied}</p>
                    <p>Available: {blockBDetails.available}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="residents-section">
              <h2>Current Residents</h2>
              <table className="residents-table">
                <thead>
                  <tr>
                    <th>Room No</th>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {currentResidents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No residents currently registered. The hostel rooms are available for booking.
                      </td>
                    </tr>
                  ) : (
                    currentResidents.map(resident => (
                      <tr key={resident.id}>
                        <td>{resident.roomNo}</td>
                        <td>{resident.name}</td>
                        <td>{resident.course}</td>
                        <td>{resident.year}</td>
                        <td>{resident.contact}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          renderComplaints()
        )}
      </main>
    </div>
  );
};

export default StudentComplaint;
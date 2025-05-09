import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './BookRoom.css';

// Sidebar Component
const Sidebar = ({ activeSection, onProfileClick }) => (
  <aside className="sidebar">
    <div className="sidebar-header">
      <h2>Hostel Portal</h2>
    </div>
    <nav className="sidebar-menu">
      <div className={`menu-item ${activeSection === 'profile' ? 'active' : ''}`} onClick={onProfileClick}>
        <i className="menu-icon fas fa-user"></i> <span>Profile</span>
      </div>
      
      <Link to="/payments" className={`menu-item ${activeSection === 'payments' ? 'active' : ''}`}>
        <i className="menu-icon fas fa-rupee-sign"></i> <span>Payments</span>
      </Link>
    </nav>
  </aside>
);

// Dashboard Component
// const Dashboard = ({ currentRoom }) => (
//   <div className="dashboard">
//     <h2>Dashboard</h2>
//     <div className="room-info">
//       <h3>Current Room</h3>
//       <p>{currentRoom}</p>
//     </div>
//   </div>
// );

// // BookRoom Component
// const BookRoom = () => {
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [filter, setFilter] = useState('all');

//   const rooms = [
//     { id: 1, number: 'A-101', beds: 4, available: 2, price: 5000, type: '4-bed' },
//     { id: 2, number: 'A-102', beds: 4, available: 1, price: 5000, type: '4-bed' },
//     { id: 3, number: 'B-101', beds: 2, available: 2, price: 6000, type: '2-bed' },
//     { id: 4, number: 'B-102', beds: 2, available: 0, price: 6000, type: '2-bed' }
//   ];

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//     setSelectedRoom(null);
//   };

//   const filteredRooms = rooms.filter(room => {
//     if (filter === 'available') return room.available > 0;
//     if (filter === '4-bed') return room.type === '4-bed';
//     if (filter === '2-bed') return room.type === '2-bed';
//     return true;
//   });

//   const handleBookRoom = (room) => setSelectedRoom(room);

//   return (
//     <div className="booking-section">
//       <div className="section-header">
//         <h2>Book a Room</h2>
//         <p>Select from available rooms below</p>
//       </div>
//       <div className="room-filters">
//         {['all', 'available', '4-bed', '2-bed'].map(f => (
//           <button
//             key={f}
//             className={`filter-btn ${filter === f ? 'active' : ''}`}
//             onClick={() => handleFilterChange(f)}
//           >
//             {f === 'all' ? 'All Rooms' : f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="room-list">
//         {filteredRooms.map(room => (
//           <div
//             key={room.id}
//             className={`room-card ${room.available === 0 ? 'occupied' : ''} ${selectedRoom?.id === room.id ? 'selected' : ''}`}
//           >
//             <h4>Room {room.number}</h4>
//             <div className="room-features">
//               <span><i className="fas fa-bed"></i> {room.beds} Beds</span>
//               <span><i className="fas fa-check-circle"></i> {room.available} Available</span>
//             </div>
//             <div className="room-price">₹{room.price}/month</div>
//             <button onClick={() => handleBookRoom(room)} disabled={room.available === 0}>
//               {room.available === 0 ? 'Fully Occupied' : 'Book Now'}
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedRoom && (
//         <div className="selected-room-details">
//           <h3>Selected Room Details</h3>
//           <div className="detail-grid">
//             <div><label>Room Number:</label> <span>{selectedRoom.number}</span></div>
//             <div><label>Room Type:</label> <span>{selectedRoom.type}</span></div>
//             <div><label>Available Beds:</label> <span>{selectedRoom.available}</span></div>
//             <div><label>Price per Month:</label> <span>₹{selectedRoom.price}</span></div>
//           </div>
//           <button onClick={() => alert(`Proceeding to book Room ${selectedRoom.number}`)}>Proceed to Book</button>
//         </div>
//       )}
//     </div>
//   );
// };

// Payments Component
const Payments = ({ openPaymentModal }) => (
  <div className="payments">
    <h2>Payments</h2>
    <div className="payment-item">
      <h3>Room A-101</h3>
      <p>Single Bed</p>
      <p>Price: ₹5000/month</p>
      <button onClick={() => openPaymentModal('A-101', '1', '5000')}>Book Now</button>
    </div>
  </div>
);

// PaymentModal Component
const PaymentModal = ({ show, onClose, paymentInfo, onPaymentComplete }) => {
  if (!show) return null;
  return (
    <div className="payment-modal">
      <h2>Payment Details</h2>
      <p>Room: {paymentInfo.roomNumber}</p>
      <p>Bed: {paymentInfo.bedNumber}</p>
      <p>Amount: ₹{paymentInfo.price}</p>
      <button onClick={onPaymentComplete}>Complete Payment</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

// Update ProfilePanel component to show by default
const ProfilePanel = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileUploaded(true);
      alert('Receipt uploaded successfully!');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-avatar"><i className="fas fa-user-graduate"></i></div>
        <h3>Ramesh Kumar</h3>
        <div><label>Student ID:</label><span> CSE2024001 </span></div>
        <div><label>Course:</label><span> Computer Science </span></div>
        <div><label>Year:</label><span> 1st Year </span></div>
        <div><label>Age:</label><span> 19 </span></div>
        <div><label>Room Number:</label><span> 101 </span></div>
        <div><label>Room Type:</label><span> Single AC </span></div>
        <div><label>Fee Status:</label><span> Paid </span></div>
        <div className={`upload-box ${fileUploaded ? 'uploaded' : ''}`} onClick={() => document.getElementById('fileInput').click()}>
          <div className="upload-content">
            <i className="fas fa-cloud-upload-alt"></i>
            <span>{fileUploaded ? 'Uploaded' :'Click to Upload Receipt'}</span>
            <i className="fas fa-chevron-right arrow-icon"></i>
          </div>
          <input type="file" id="fileInput" hidden onChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('profile'); // Set default active section to profile
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});

  const openPaymentModal = (roomNumber, bedNumber, price) => {
    setPaymentInfo({ roomNumber, bedNumber, price });
    setShowPaymentModal(true);
  };

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProfilePanel />} />
          <Route path="/payments" element={<Payments openPaymentModal={openPaymentModal} />} />
        </Routes>
      </main>
      <PaymentModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentInfo={paymentInfo}
        onPaymentComplete={() => {
          alert('Payment completed successfully!');
          setShowPaymentModal(false);
        }}
      />
    </div>
  );
};

export default App;

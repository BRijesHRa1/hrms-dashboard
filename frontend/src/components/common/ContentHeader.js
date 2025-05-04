import React, { useRef } from 'react';

const ContentHeader = ({ title, showProfileDropdown, setShowProfileDropdown, profileDropdownRef }) => {
  return (
    <div className="content-header">
      <h1>{title}</h1>
      <div className="header-actions">
        <div className="notification-icons">
          <button className="icon-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2.5" y="4.16666" width="15" height="11.6667" rx="2" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 7.5L8.75 10.8333C9.24167 11.0733 9.61833 11.0733 10.1183 10.8333L16.6667 7.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="icon-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 6.66667C15 5.34058 14.4732 4.07884 13.5355 3.14124C12.5979 2.20364 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.20364 6.46447 3.14124C5.52678 4.07884 5 5.34058 5 6.66667C5 12.5 2.5 14.1667 2.5 14.1667H17.5C17.5 14.1667 15 12.5 15 6.66667Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.4417 17.5C11.2952 17.7526 11.0849 17.9622 10.8319 18.1079C10.5789 18.2537 10.292 18.3304 10 18.3304C9.70803 18.3304 9.42117 18.2537 9.16817 18.1079C8.91517 17.9622 8.70486 17.7526 8.55835 17.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="user-profile" ref={profileDropdownRef}>
          <div className="profile-pic">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" />
          </div>
          <button 
            className="dropdown-arrow"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              {showProfileDropdown ? (
                <path d="M5 12.5L10 7.5L15 12.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M5 7.5L10 12.5L15 7.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div 
                className="profile-dropdown-item" 
                onClick={() => setShowProfileDropdown(false)}
              >
                Edit Profile
              </div>
              <div 
                className="profile-dropdown-item" 
                onClick={() => setShowProfileDropdown(false)}
              >
                Change Password
              </div>
              <div 
                className="profile-dropdown-item" 
                onClick={() => setShowProfileDropdown(false)}
              >
                Manage Notification
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentHeader; 
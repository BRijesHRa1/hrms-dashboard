import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Leaves.css';
import { Sidebar, ContentHeader } from '../components/common';

const Leaves = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [searchEmployeeQuery, setSearchEmployeeQuery] = useState('');
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: '01',
      name: 'Jane Cooper',
      position: 'Full Time Designer',
      date: '10/09/24',
      reason: 'Visiting House',
      status: 'Pending',
      docs: true
    },
    {
      id: '02',
      name: 'Cody Fisher',
      position: 'Senior Backend Developer',
      date: '8/09/24',
      reason: 'Visiting House',
      status: 'Approved',
      docs: true
    }
  ]);
  
  const [newLeaveData, setNewLeaveData] = useState({
    employee: '',
    designation: '',
    reason: '',
    date: '',
    documents: null
  });

  const profileDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const calendarRef = useRef(null);
  
  const statusOptions = ["All", "Pending", "Approved", "Rejected"];
  const employees = [
    { name: 'Jane Cooper', position: 'Full Time Designer' },
    { name: 'Janney Wilson', position: 'Junior Backend Developer' },
    { name: 'Cody Fisher', position: 'Senior Backend Developer' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef, statusDropdownRef]);

  const handleStatusChange = (applicationId, newStatus) => {
    setLeaveApplications(applications => 
      applications.map(app => 
        app.id === applicationId ? {...app, status: newStatus} : app
      )
    );
  };
  
  const handleAddLeave = () => {
    setShowAddLeaveModal(true);
  };
  
  const handleCloseModal = () => {
    setShowAddLeaveModal(false);
  };
  
  const handleSearchEmployee = (e) => {
    setSearchEmployeeQuery(e.target.value);
  };
  
  const handleSelectEmployee = (name) => {
    setSelectedEmployee(name);
    setSearchEmployeeQuery(name);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveData({
      ...newLeaveData,
      [name]: value
    });
  };
  
  const handleFileUpload = (e) => {
    setNewLeaveData({
      ...newLeaveData,
      documents: e.target.files[0]
    });
  };
  
  const handleSaveLeave = () => {
    // Add logic to save the new leave application
    setShowAddLeaveModal(false);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const renderCalendar = () => {
    const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    
    const days = [];
    // Days of the week header
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 8 || day === 17; // Mock leaves on day 8 and 17
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'has-leave' : ''}`}
        >
          {day}
          {isToday && <div className="leave-indicator">1</div>}
        </div>
      );
    }
    
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={prevMonth} className="month-nav">
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L1 6L5 11" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span>{monthYear}</span>
          <button onClick={nextMonth} className="month-nav">
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11L5 6L1 1" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="days-header">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-name">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {days}
        </div>
      </div>
    );
  };

  const filteredApplications = statusFilter 
    ? leaveApplications.filter(app => app.status === statusFilter)
    : leaveApplications;

  const approvedLeaves = leaveApplications.filter(app => app.status === 'Approved');

  return (
    <div className="leaves-page">
      {/* Left Navigation Bar */}
      <Sidebar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <ContentHeader 
          title="Leaves"
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          profileDropdownRef={profileDropdownRef}
        />

        <div className="filter-section">
          <div className="filter-group">
            <div className="dropdown-filter" ref={statusDropdownRef}>
              <button 
                className="dropdown-button" 
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                Status
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {showStatusDropdown ? (
                    <path d="M5 12.5L10 7.5L15 12.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
              </button>
              {showStatusDropdown && (
                <div className="status-dropdown">
                  {statusOptions.map((status, index) => (
                    <div 
                      key={index}
                      className="status-dropdown-item"
                      onClick={() => {
                        setStatusFilter(status === 'All' ? '' : status);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="filter-group">
            <div className="search-input large">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11.1 11.1" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="add-button" onClick={handleAddLeave}>
              Add Leave
            </button>
          </div>
        </div>

        <div className="leaves-content">
          <div className="leaves-table-container">
            <div className="leaves-header">
              <h2>Applied Leaves</h2>
            </div>
            <table className="leaves-table">
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Docs</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div className="employee-profile-pic">
                        <img src={`https://randomuser.me/api/portraits/${application.id % 2 === 0 ? 'men' : 'women'}/${application.id * 10}.jpg`} alt={application.name} />
                      </div>
                    </td>
                    <td>
                      <div className="employee-info">
                        <div className="employee-name">{application.name}</div>
                        <div className="employee-position">{application.position}</div>
                      </div>
                    </td>
                    <td>{application.date}</td>
                    <td>{application.reason}</td>
                    <td>
                      <div className={`status-badge ${application.status.toLowerCase()}`}>
                        {application.status}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </td>
                    <td>
                      {application.docs && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 1.66667H6.66667C5.74619 1.66667 5 2.41286 5 3.33333V16.6667C5 17.5872 5.74619 18.3333 6.66667 18.3333H13.3333C14.2538 18.3333 15 17.5872 15 16.6667V3.33333C15 2.41286 14.2538 1.66667 13.3333 1.66667Z" stroke="#5E0C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.33334 5H11.6667" stroke="#5E0C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.33334 8.33333H11.6667" stroke="#5E0C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.33334 11.6667H11.6667" stroke="#5E0C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="right-panel">
            <div className="leave-calendar">
              <div className="calendar-header">
                <h2>Leave Calendar</h2>
              </div>
              {renderCalendar()}
            </div>

            <div className="approved-leaves">
              <h2>Approved Leaves</h2>
              {approvedLeaves.map((leave) => (
                <div key={leave.id} className="approved-leave-item">
                  <div className="employee-profile">
                    <img src={`https://randomuser.me/api/portraits/${leave.id % 2 === 0 ? 'men' : 'women'}/${leave.id * 10}.jpg`} alt={leave.name} />
                  </div>
                  <div className="leave-details">
                    <div className="employee-name">{leave.name}</div>
                    <div className="employee-position">{leave.position}</div>
                  </div>
                  <div className="leave-date">{leave.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Leave Modal */}
      {showAddLeaveModal && (
        <div className="modal-overlay">
          <div className="add-leave-modal">
            <div className="modal-header">
              <h2>Add New Leave</h2>
              <button className="close-modal" onClick={handleCloseModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <div className="employee-search">
                    <input 
                      type="text" 
                      placeholder="Search employee" 
                      value={searchEmployeeQuery}
                      onChange={handleSearchEmployee}
                    />
                    {searchEmployeeQuery && (
                      <button className="clear-search" onClick={() => setSearchEmployeeQuery('')}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 5L5 15" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M5 5L15 15" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                  {searchEmployeeQuery && (
                    <div className="employee-results">
                      {employees
                        .filter(emp => emp.name.toLowerCase().includes(searchEmployeeQuery.toLowerCase()))
                        .map((emp, index) => (
                          <div 
                            key={index} 
                            className="employee-result-item"
                            onClick={() => handleSelectEmployee(emp.name)}
                          >
                            {emp.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Designation*" 
                    name="designation"
                    value={newLeaveData.designation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder="Reason*" 
                    name="reason"
                    value={newLeaveData.reason}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <div className="file-upload">
                    <label>Documents</label>
                    <div className="upload-area">
                      <input 
                        type="file" 
                        onChange={handleFileUpload}
                        id="document-upload"
                        className="file-input"
                      />
                      <label htmlFor="document-upload" className="upload-button">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 6.66667L6.66667 13.3333" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.66667 6.66667L13.3333 13.3333" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="save-button" onClick={handleSaveLeave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves; 
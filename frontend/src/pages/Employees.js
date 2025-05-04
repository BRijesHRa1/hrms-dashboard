import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Employees.css';
import { Sidebar, ContentHeader } from '../components/common';

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const profileDropdownRef = useRef(null);
  const positionDropdownRef = useRef(null);
  const calendarRef = useRef(null);
  
  const positionOptions = ["Full Time", "Senior", "Junior", "Intern", "Team Lead"];
  
  const [employees, setEmployees] = useState([
    {
      id: '01',
      name: 'Jane Copper',
      email: 'jane.copper@example.com',
      phone: '(704) 555-0127',
      position: 'Intern',
      department: 'Designer',
      joiningDate: '10/06/13'
    },
    {
      id: '02',
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time',
      department: 'Designer',
      joiningDate: '11/07/16'
    },
    {
      id: '03',
      name: 'Cody Fisher',
      email: 'deanna.curtis@example.com',
      phone: '(252) 555-0126',
      position: 'Senior',
      department: 'Backend Development',
      joiningDate: '08/15/17'
    },
    {
      id: '04',
      name: 'Janney Wilson',
      email: 'janney.wilson@example.com',
      phone: '(252) 555-0126',
      position: 'Junior',
      department: 'Backend Development',
      joiningDate: '12/04/17'
    },
    {
      id: '05',
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Team Lead',
      department: 'Human Resource',
      joiningDate: '05/30/14'
    }
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (positionDropdownRef.current && !positionDropdownRef.current.contains(event.target)) {
        setShowPositionDropdown(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef, positionDropdownRef, calendarRef]);

  // Handle action button click with position detection
  const handleActionClick = (id, e) => {
    // Toggle dropdown
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
      
      // Detect if we're near the bottom of the page
      const buttonRect = e.currentTarget.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the button is in the bottom 200px of the window, show dropdown above
      if (windowHeight - buttonRect.bottom < 200) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  };

  const handleEdit = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setEditingEmployee(employee);
    setShowEditEmployeeModal(true);
    setActiveDropdown(null);
  };

  const handleDelete = (employeeId) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
    setActiveDropdown(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee({
      ...editingEmployee,
      [name]: value
    });
  };

  const handleSaveEdit = () => {
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    ));
    setShowEditEmployeeModal(false);
    setEditingEmployee(null);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateClick = (day) => {
    const month = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
    const formattedDate = `${month}/${day}/${currentMonth.getFullYear().toString().slice(2)}`;
    
    setEditingEmployee({
      ...editingEmployee,
      joiningDate: formattedDate
    });
    
    setShowCalendar(false);
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
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 10; // Mock "today" as the 10th for visual effect
      days.push(
        <div 
          key={day} 
          className={`day ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    
    return (
      <div className="calendar" ref={calendarRef}>
        <div className="calendar-header">
          <button className="calendar-nav" onClick={prevMonth}>&lt;</button>
          <span>{monthYear}</span>
          <button className="calendar-nav" onClick={nextMonth}>&gt;</button>
        </div>
        <div className="weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days">{days}</div>
      </div>
    );
  };

  return (
    <div className="employees-page">
      {/* Left Navigation Bar */}
      <Sidebar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <ContentHeader 
          title="Employees"
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          profileDropdownRef={profileDropdownRef}
        />

        <div className="filter-section">
          <div className="filter-group">
            <div className="dropdown-filter" ref={positionDropdownRef}>
              <button 
                className="dropdown-button"
                onClick={() => setShowPositionDropdown(!showPositionDropdown)}
              >
                Position
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {showPositionDropdown ? (
                    <path d="M5 12.5L10 7.5L15 12.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
              </button>
              {showPositionDropdown && (
                <div className="position-dropdown">
                  {positionOptions.map((position, index) => (
                    <div 
                      key={index}
                      className="position-dropdown-item"
                      onClick={() => {
                        setPositionFilter(position);
                        setShowPositionDropdown(false);
                      }}
                    >
                      {position}
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
          </div>
        </div>

        <div className="employees-table">
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Employee Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Department</th>
                <th>Date of Joining</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-profile-pic">
                      <img src={`https://randomuser.me/api/portraits/${employee.id % 2 === 0 ? 'women' : 'men'}/${employee.id * 10}.jpg`} alt={employee.name} />
                    </div>
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.joiningDate}</td>
                  <td style={{ position: 'relative' }}>
                    <button className="action-button" onClick={(e) => handleActionClick(employee.id, e)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10.8333C10.4603 10.8333 10.8333 10.4603 10.8333 10C10.8333 9.53976 10.4603 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4603 9.53976 10.8333 10 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.8333 10.8333C16.2936 10.8333 16.6667 10.4603 16.6667 10C16.6667 9.53976 16.2936 9.16667 15.8333 9.16667C15.3731 9.16667 15 9.53976 15 10C15 10.4603 15.3731 10.8333 15.8333 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.16669 10.8333C4.62692 10.8333 5.00002 10.4603 5.00002 10C5.00002 9.53976 4.62692 9.16667 4.16669 9.16667C3.70645 9.16667 3.33336 9.53976 3.33336 10C3.33336 10.4603 3.70645 10.8333 4.16669 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {activeDropdown === employee.id && (
                      <div className={`action-dropdown ${dropdownPosition === 'top' ? 'action-dropdown-top' : ''}`}>
                        <button onClick={() => handleEdit(employee.id)}>Edit</button>
                        <button onClick={() => handleDelete(employee.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Edit Employee Modal */}
      {showEditEmployeeModal && editingEmployee && (
        <div className="modal-overlay">
          <div className="edit-employee-modal">
            <div className="modal-header">
              <h2 style={{ width: '100%', textAlign: 'center' }}>Edit Employee Details</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setShowEditEmployeeModal(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <div className="form-label">Full Name<span className="required">*</span></div>
                  <input
                    type="text"
                    name="name"
                    value={editingEmployee.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <div className="form-label">Email Address<span className="required">*</span></div>
                  <input
                    type="email"
                    name="email"
                    value={editingEmployee.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <div className="form-label">Phone Number<span className="required">*</span></div>
                  <input
                    type="tel"
                    name="phone"
                    value={editingEmployee.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <div className="form-label">Department<span className="required">*</span></div>
                  <input
                    type="text"
                    name="department"
                    value={editingEmployee.department}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <div className="form-label">Position<span className="required">*</span></div>
                  <div className="select-wrapper">
                    <select
                      name="position"
                      value={editingEmployee.position}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      {positionOptions.map((position, index) => (
                        <option key={index} value={position}>{position}</option>
                      ))}
                    </select>
                    <div className="select-arrow">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B006E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-group date-group">
                  <div className="form-label">Date of Joining<span className="required">*</span></div>
                  <div className="custom-date-input">
                    <input
                      type="text" 
                      name="joiningDate"
                      value={editingEmployee.joiningDate}
                      onChange={handleInputChange}
                      onClick={toggleCalendar}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '30px',
                        fontSize: '14px',
                        backgroundImage: 'none',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none'
                      }}
                    />
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none'
                      }}
                    >
                      <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#6B006E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 2V6" stroke="#6B006E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2V6" stroke="#6B006E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 10H21" stroke="#6B006E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {showCalendar && renderCalendar()}
                </div>
              </div>
              
              <div className="form-actions">
                <button className="save-btn" onClick={handleSaveEdit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .edit-employee-modal {
          background-color: white;
          border-radius: 12px;
          width: 1080px;
          max-width: 95%;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .modal-header {
          background-color: #5E0C9E;
          color: white;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        
        .modal-header h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
        }
        
        .close-modal-btn {
          position: absolute;
          right: 20px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0;
        }
        
        .modal-form {
          padding: 30px;
        }
        
        .form-row {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
        }
        
        .form-group {
          flex: 1;
          position: relative;
        }
        
        .form-label {
          color: #6B006E;
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        .required {
          color: #FF0000;
          margin-left: 2px;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #D1D5DB;
          border-radius: 30px;
          font-size: 14px;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #5E0C9E;
        }
        
        /* Hide default calendar icon in date inputs */
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="text"].date-input::-webkit-calendar-picker-indicator,
        input.date-input::-webkit-inner-spin-button,
        input.date-input::-webkit-clear-button,
        input.date-input::-webkit-datetime-edit-text {
          display: none !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          opacity: 0 !important;
          width: 0 !important;
          height: 0 !important;
          position: absolute !important;
        }
        
        .date-input {
          background-image: none !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          cursor: pointer;
        }
        
        .date-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .select-wrapper {
          position: relative;
        }
        
        .select-wrapper select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          padding-right: 30px;
          background-image: none;
        }
        
        .select-arrow {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 1;
        }
        
        .calendar-icon-button {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }
        
        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }
        
        .save-btn {
          background-color: #EEEEEE;
          color: #3A3A3A;
          border: none;
          border-radius: 50px;
          padding: 12px 40px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .save-btn:hover {
          background-color: #DDDDDD;
        }
        
        .calendar {
          position: absolute;
          top: calc(100% + 5px);
          right: 0;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 15px;
          width: 300px;
          z-index: 10;
        }
        
        .custom-date-input {
          position: relative;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Employees; 
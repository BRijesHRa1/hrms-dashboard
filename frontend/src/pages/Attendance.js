import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Attendance.css';
import { Sidebar, ContentHeader } from '../components/common';

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  
  const profileDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  
  const statusOptions = ["All", "Present", "Absent", "Medical Leave", "Work from Home"];
  
  const [employees, setEmployees] = useState([
    {
      id: '01',
      name: 'Jane Copper',
      position: 'Full Time',
      department: 'Designer',
      task: 'Dashboard Home page Alignment',
      status: 'Present'
    },
    {
      id: '02',
      name: 'Arlene McCoy',
      position: 'Full Time',
      department: 'Designer',
      task: 'Dashboard Login page design, Dashboard Home page design',
      status: 'Present'
    },
    {
      id: '03',
      name: 'Cody Fisher',
      position: 'Senior',
      department: 'Backend Development',
      task: '--',
      status: 'Absent'
    },
    {
      id: '04',
      name: 'Janney Wilson',
      position: 'Junior',
      department: 'Backend Development',
      task: 'Dashboard login page integration',
      status: 'Present'
    },
    {
      id: '05',
      name: 'Leslie Alexander',
      position: 'Team Lead',
      department: 'Human Resource',
      task: '4 scheduled interview, Sorting of resumes',
      status: 'Present'
    }
  ]);

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

  const handleStatusChange = (employeeId, newStatus) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? {...emp, status: newStatus} : emp
    ));
  };

  const filteredEmployees = statusFilter 
    ? employees.filter(emp => emp.status === statusFilter)
    : employees;

  return (
    <div className="attendance-page">
      {/* Left Navigation Bar */}
      <Sidebar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <ContentHeader 
          title="Attendance"
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
          </div>
        </div>

        <div className="attendance-table">
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Employee Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Task</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-profile-pic">
                      <img src={`https://randomuser.me/api/portraits/${employee.id % 2 === 0 ? 'women' : 'men'}/${employee.id * 10}.jpg`} alt={employee.name} />
                    </div>
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td className="task-cell">{employee.task}</td>
                  <td>
                    <div className="status-badge-container">
                      <div className={`status-badge ${
                        employee.status === 'Present' ? 'present' : 
                        employee.status === 'Absent' ? 'absent' : 
                        employee.status === 'Medical Leave' ? 'medical' : 
                        employee.status === 'Work from Home' ? 'work' : ''
                      }`}>
                        {employee.status}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="status-options">
                        <div 
                          className={`status-option ${employee.status === 'Present' ? 'active' : ''}`}
                          onClick={() => handleStatusChange(employee.id, 'Present')}
                        >
                          Present
                        </div>
                        <div 
                          className={`status-option ${employee.status === 'Absent' ? 'active' : ''}`}
                          onClick={() => handleStatusChange(employee.id, 'Absent')}
                        >
                          Absent
                        </div>
                        <div 
                          className={`status-option ${employee.status === 'Medical Leave' ? 'active' : ''}`}
                          onClick={() => handleStatusChange(employee.id, 'Medical Leave')}
                        >
                          Medical Leave
                        </div>
                        <div 
                          className={`status-option ${employee.status === 'Work from Home' ? 'active' : ''}`}
                          onClick={() => handleStatusChange(employee.id, 'Work from Home')}
                        >
                          Work from Home
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className="action-button" onClick={(e) => handleActionClick(employee.id, e)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10.8333C10.4603 10.8333 10.8333 10.4603 10.8333 10C10.8333 9.53976 10.4603 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4603 9.53976 10.8333 10 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.8333 10.8333C16.2936 10.8333 16.6667 10.4603 16.6667 10C16.6667 9.53976 16.2936 9.16667 15.8333 9.16667C15.3731 9.16667 15 9.53976 15 10C15 10.4603 15.3731 10.8333 15.8333 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.16669 10.8333C4.62692 10.8333 5.00002 10.4603 5.00002 10C5.00002 9.53976 4.62692 9.16667 4.16669 9.16667C3.70645 9.16667 3.33336 9.53976 3.33336 10C3.33336 10.4603 3.70645 10.8333 4.16669 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {activeDropdown === employee.id && (
                      <div className={`action-dropdown ${dropdownPosition === 'top' ? 'action-dropdown-top' : ''}`}>
                        <button>View Details</button>
                        <button>Send Message</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance; 
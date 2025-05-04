import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Candidates.css';
import { Sidebar, ContentHeader } from '../components/common';

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [candidates, setCandidates] = useState([
    {
      id: '01',
      name: 'Jane Copper',
      email: 'jane.copper@example.com',
      phone: '(704) 555-0127',
      position: 'Designer Intern',
      status: 'New',
      experience: '0'
    },
    {
      id: '02',
      name: 'Janney Wilson',
      email: 'janney.wilson@example.com',
      phone: '(252) 555-0126',
      position: 'Senior Developer',
      status: 'New',
      experience: '1+'
    },
    {
      id: '03',
      name: 'Guy Hawkins',
      email: 'kenzi.lawson@example.com',
      phone: '(907) 555-0101',
      position: 'Human Resource',
      status: 'New',
      experience: '10+'
    },
    {
      id: '04',
      name: 'Arlene McCoy',
      email: 'arlene.mccoy@example.com',
      phone: '(302) 555-0107',
      position: 'Full Time Designer',
      status: 'Selected',
      experience: '5+'
    },
    {
      id: '05',
      name: 'Leslie Alexander',
      email: 'willie.jennings@example.com',
      phone: '(207) 555-0119',
      position: 'Full Time Developer',
      status: 'Rejected',
      experience: '0'
    }
  ]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [newCandidateData, setNewCandidateData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resume: null,
    agreeToTerms: false
  });
  const profileDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const positionDropdownRef = useRef(null);
  const [profileStatus, setProfileStatus] = useState("Inactive");
  const [hoveredItem, setHoveredItem] = useState(null);
  const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
  const positionOptions = ["Designer", "Developer", "Human Resource"];
  const [editingStatusId, setEditingStatusId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  
  const handleActionClick = (id, e) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
      
      const buttonRect = e.currentTarget.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (windowHeight - buttonRect.bottom < 200) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'New':
        return 'status-new';
      case 'Scheduled':
        return 'status-scheduled';
      case 'Ongoing':
        return 'status-ongoing';
      case 'Selected':
        return 'status-selected';
      case 'Rejected':
        return 'status-rejected';
      default:
        return '';
    }
  };

  // Close the profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
      if (positionDropdownRef.current && !positionDropdownRef.current.contains(event.target)) {
        setShowPositionDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownRef, statusDropdownRef, positionDropdownRef]);

  // Handle input change for the add candidate form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCandidateData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle resume file upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setNewCandidateData(prev => ({
      ...prev,
      resume: file
    }));
  };

  // Handle form submission
  const handleAddCandidate = (e) => {
    e.preventDefault();
    
    // Generate a new ID (simple implementation)
    const newId = (candidates.length + 1).toString().padStart(2, '0');
    
    // Create a new candidate object
    const newCandidate = {
      id: newId,
      name: newCandidateData.fullName,
      email: newCandidateData.email,
      phone: newCandidateData.phone,
      position: newCandidateData.position,
      status: 'New',
      experience: newCandidateData.experience
    };
    
    // Add the new candidate to the list
    setCandidates(prev => [...prev, newCandidate]);
    
    // Reset form and close modal
    setNewCandidateData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null,
      agreeToTerms: false
    });
    setShowAddCandidateModal(false);
  };

  // Handle status change
  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: newStatus } 
          : candidate
      )
    );
    setEditingStatusId(null);
  };

  return (
    <div className="candidates-page">
      {/* Left Navigation Bar */}
      <Sidebar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <ContentHeader 
          title="Candidates"
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
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
            <button 
              className="add-button"
              onClick={() => setShowAddCandidateModal(true)}
            >
              Add Candidate
            </button>
          </div>
        </div>

        <div className="candidates-table">
          <table>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Candidates Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.position}</td>
                  <td style={{ position: 'relative' }}>
                    {editingStatusId === candidate.id ? (
                      <div className="status-dropdown status-dropdown-table">
                        {statusOptions.map((status, index) => (
                          <div 
                            key={index}
                            className={`status-dropdown-item ${status === candidate.status ? 'active' : ''}`}
                            onClick={() => handleStatusChange(candidate.id, status)}
                          >
                            {status}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div 
                        className={`status-badge ${getStatusClass(candidate.status)}`}
                        onClick={() => setEditingStatusId(candidate.id)}
                      >
                        {candidate.status}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </td>
                  <td>{candidate.experience}</td>
                  <td style={{ position: 'relative' }}>
                    <button className="action-button" onClick={(e) => handleActionClick(candidate.id, e)}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10.8333C10.4603 10.8333 10.8333 10.4603 10.8333 10C10.8333 9.53976 10.4603 9.16667 10 9.16667C9.53976 9.16667 9.16667 9.53976 9.16667 10C9.16667 10.4603 9.53976 10.8333 10 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.8333 10.8333C16.2936 10.8333 16.6667 10.4603 16.6667 10C16.6667 9.53976 16.2936 9.16667 15.8333 9.16667C15.3731 9.16667 15 9.53976 15 10C15 10.4603 15.3731 10.8333 15.8333 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.16669 10.8333C4.62692 10.8333 5.00002 10.4603 5.00002 10C5.00002 9.53976 4.62692 9.16667 4.16669 9.16667C3.70645 9.16667 3.33336 9.53976 3.33336 10C3.33336 10.4603 3.70645 10.8333 4.16669 10.8333Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {activeDropdown === candidate.id && (
                      <div className={`action-dropdown ${dropdownPosition === 'top' ? 'action-dropdown-top' : ''}`}>
                        <button>Download Resume</button>
                        <button>Delete Candidate</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Candidate Modal */}
      {showAddCandidateModal && (
        <div className="modal-overlay">
          <div className="add-candidate-modal">
            <div className="modal-header">
              <h2>Add New Candidate</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setShowAddCandidateModal(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddCandidate}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name<span className="required">*</span></label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={newCandidateData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address<span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newCandidateData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number<span className="required">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newCandidateData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="position">Position<span className="required">*</span></label>
                  <select
                    id="position"
                    name="position"
                    value={newCandidateData.position}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Position</option>
                    {positionOptions.map((position, index) => (
                      <option key={index} value={position}>{position}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="experience">Experience<span className="required">*</span></label>
                  <select
                    id="experience"
                    name="experience"
                    value={newCandidateData.experience}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="0">0</option>
                    <option value="1+">1+</option>
                    <option value="2+">2+</option>
                    <option value="5+">5+</option>
                    <option value="10+">10+</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="resume">Resume<span className="required">*</span></label>
                  <div className="resume-upload">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      required
                    />
                    <div className="upload-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5" stroke="#5E0C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.83325 8.33334L9.99992 12.5L14.1666 8.33334" stroke="#5E0C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 12.5V2.5" stroke="#5E0C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="form-row terms-row">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={newCandidateData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="agreeToTerms">
                    I hereby declare that the above information is true to the best of my knowledge and belief
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates; 
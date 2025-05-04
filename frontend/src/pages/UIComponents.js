import React from 'react';
import '../styles/UIComponents.css';

const UIComponents = () => {
  // Color palette
  const colors = [
    { name: 'Green', hex: '#399D42' },
    { name: 'Red', hex: '#C52F2F' },
    { name: 'Yellow', hex: '#EAB937' },
    { name: 'Violet', hex: '#5E0C9E' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Grey', hex: '#F5F5F5' },
    { name: 'Dark Grey', hex: '#A9A9A9' }
  ];

  return (
    <div className="ui-components-container">
      <div className="component-section">
        <h2 className="section-title">Color</h2>
        <div className="component-content">
          <h1 className="component-header">Color</h1>
          <div className="color-grid">
            {colors.map((color, index) => (
              <div key={index} className="color-item">
                <div 
                  className="color-circle" 
                  style={{ backgroundColor: color.hex, border: color.name === 'White' ? '1px solid #E1E1E1' : 'none' }}
                ></div>
                <p className="color-name">{color.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="component-section">
        <h2 className="section-title">Icons</h2>
        <div className="component-content">
          <h1 className="component-header">Icon</h1>
          <div className="icon-container">
            <div className="icon-grid">
              {/* Row 1 */}
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4" cy="12" r="1" fill="currentColor"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  <circle cx="20" cy="12" r="1" fill="currentColor"/>
                </svg>
              </div>

              {/* Row 2 */}
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5 9.5L19 5M19 5H15M19 5V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.5 14.5L5 19M5 19H9M5 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Row 3 */}
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 8C17 8 17 6 15 6C13 6 13 8 13 8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M11 8C11 8 11 6 9 6C7 6 7 8 7 8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M19 13C19 17.418 15.866 21 12 21C8.13401 21 5 17.418 5 13C5 8.58203 8.13401 5 12 5C15.866 5 19 8.58203 19 13Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Row 4 */}
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 15V15C7 13.3431 8.34315 12 10 12V12H14V12C15.6569 12 17 13.3431 17 15V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="8" y="6" width="8" height="8" rx="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 9L12 6L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 6V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V4Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 8H20" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>

              {/* Row 5 */}
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 15L21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 9C21 7.89543 20.1046 7 19 7H5C3.89543 7 3 7.89543 3 9V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="icon-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8.4C18 12.5 12 18 12 18C12 18 6 12.5 6 8.4C6 5.4 8.7 3 12 3C15.3 3 18 5.4 18 8.4Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 8.5C15 10.157 13.6569 11.5 12 11.5C10.3431 11.5 9 10.157 9 8.5C9 6.84315 10.3431 5.5 12 5.5C13.6569 5.5 15 6.84315 15 8.5Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIComponents; 
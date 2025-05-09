import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import styles from './StickyNavbar.module.css';

function Button() {
  return (
    <Link to="/" className={styles.button}>
      <span className={styles.actualText}>&nbsp;&nbsp;FUSION.IO&nbsp;</span>
      <span aria-hidden="true" className={styles.hoverText}>&nbsp;&nbsp;FUSION.IO&nbsp;</span>
    </Link>
  );
}

const StickyNavbar = () => {
  const theme = {
    primary: 'var(--candidate-primary)',
    secondary: 'var(--web-secondary)',
    background: 'var(--background)',
    text: 'var(--text-color)',
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  let hoverTimeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsUserDropdownOpen(true);
  };
  
  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => setIsUserDropdownOpen(false), 200); // delay in ms
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="fixed inset-x-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/60 py-3 shadow backdrop-blur-lg md:rounded-3xl md:top-6 lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0">
            <Button />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            {username && username.role === "organizer" ?
              <Link className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1" to="/host-dashboard">
                Dashboard
              </Link>
              :
              <Link className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1" to="/dashboard">
                Dashboard
              </Link>
            }
          </div>

          {/* Buttons Section */}
          <div className="flex items-center gap-2 relative">
            {!username ? (
              <>
                <Link
                  className="hidden sm:inline-flex items-center justify-center rounded-xl bg-none px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset transition-all duration-300 text-[var(--text-color)] ring-gray-300 hover:[color:var(--host-primary)] hover:ring-[var(--host-primary)]"
                  to="/host-auth"
                >
                  Host a Hackathon
                </Link>
                <Link
                  className={`hidden md:inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 ${styles.glowbutton}`}
                  to="/auth"
                >
                  <strong>Hackathon!</strong>
                </Link>
                <Link
                  className={`md:hidden md:inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 ${styles.glowbutton}`}
                  to="/auth"
                >
                  Hackathon!
                </Link>
              </>
            ) : (
              <div
                className="relative group cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="inline-flex items-center justify-center rounded-xl bg-none px-3 py-2 text-sm font-semibold text-[var(--candidate-primary)] hover:text-[var(--host-primary)] transition-colors duration-1000">
                  {username.username}
                </span>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Icon */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Main menu</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-3 animation-fade-in-down">
          {username && username.role === "organizer" ?
            <Link className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1" to="/host-dashboard">
              Dashboard
            </Link>
            :
            <Link className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1" to="/dashboard">
              Dashboard
            </Link>
          }

          {!username ? (
            <Link
              className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1"
              to="/host-auth"
            >
              Host a Hackathon
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default StickyNavbar;

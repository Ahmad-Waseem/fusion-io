import { useState } from 'react';
import styles from './StickyNavbar.module.css';

function Button() {
  return (
    <button className={styles.button}>
      <span className={styles.actualText}>&nbsp;&nbsp;FUSION.IO&nbsp;</span>
      <span aria-hidden="true" className={styles.hoverText} >&nbsp;&nbsp;FUSION.IO&nbsp;</span>
    </button>
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
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed inset-x-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/60 py-3 shadow backdrop-blur-lg md:rounded-3xl md:top-6 lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0">
            <Button/>
          </div>

          {/* Desktop Nav*/}
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              href="#"
              style={{ color: theme.text }}>
              The Lore
            </a>
            <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100"
              href="#"
              style={{ color: theme.text }}>
            </a>
          </div>

          {/* Buttons Section */}
          <div className="flex items-center gap-2">
            <button
              className="hidden sm:inline-flex items-center justify-center rounded-xl bg-none px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset transition-all duration-300 text-[var(--text-color)] ring-gray-300 hover:[color:var(--host-primary)] hover:ring-[var(--host-primary)]"
              href="/login"
            >
              Host a Hackathon
            </button>

            <button className={`hidden md:inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 ${styles.glowbutton}`}>
              <strong>Hackathon!</strong>
            </button>

            {/* Mobile Login button */}
            <button className={`md:hidden md:inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 ${styles.glowbutton}`}>
              Hackathon!
            </button>

            {/* Hamburger Icon (Mobile only) md:hidden */}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown only (with animation) + Items on right */}
      {isMenuOpen && (
        <div className={`md:hidden px-4 py-3 space-y-3 ${'animation-fade-in-down'}`}>
          <a className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1" href="#">
            The Lore
          </a>
          <a className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1" href="#">
            if needed
          </a>
          <a
            className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1"
            href="/login"
            style={{ color: theme.text, borderColor: theme.primary }}
          >
            Host a Hackathon
          </a>
        </div>
      )}
    </header>
  );
};

export default StickyNavbar;

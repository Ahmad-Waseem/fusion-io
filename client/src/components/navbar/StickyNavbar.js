import { useState } from 'react';

const StickyNavbar = () => {
  const theme = {
    primary: 'var(--candidate-primary)',
    secondary: 'var(--web-secondary)',
    background: 'var(--background)',
    text: 'var(--text-color)',
  };// can be used directly, tentative for dark switch

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="/">
              <img
                className="h-7 w-auto"
                src="https://placehold.co/600x400"
              />
              <p className="sr-only">Fusion-io</p>
            </a>
          </div>

          {/* Hamburger Icon for Mobile Screens */}
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

          {/* Desktop*/}
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <a
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              The Lore
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              
            </a>
          </div>

          {/* Login and Sign-In Buttons */}
          <div className="flex items-center justify-end gap-3">
            <a
              className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              href="/login"
              style={{ color: theme.text, borderColor: theme.primary }}
            >
              Sign in
            </a>
            <a
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href="/login"
              style={{ backgroundColor: theme.primary }}
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Humberger for Mobile Phone */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 space-y-3">
          <a
            className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1"
            href="#"
          >
            How it works
          </a>
          <a
            className="block text-sm font-medium text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1"
            href="#"
          >
            Pricing
          </a>
        </div>
      )}
    </header>
  );
};

export default StickyNavbar;

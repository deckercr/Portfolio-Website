// components/Navbar.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const Navbar = ({ scrollToHero, scrollToRepo, scrollToAbout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false); // State for Contact dropdown

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRepoClick = (event) => {
    event.preventDefault();
    scrollToRepo();
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    scrollToHero();
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleAboutClick = (event) => {
    event.preventDefault();
    scrollToAbout();
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const handleContactMouseEnter = () => {
    setIsContactOpen(true);
  };

  const handleContactMouseLeave = () => {
    setIsContactOpen(false);
  };

  const handleContactClick = (event) => {
    event.preventDefault();
  };

  const navItems = [
    { text: "Home", href: "#", onClick: handleHomeClick },
    { text: "Repo", href: "#repo", onClick: handleRepoClick },
    { text: "About", href: "#about", onClick: handleAboutClick },
    { text: "Contact", href: "#", onClick: handleContactClick },
  ];

  return (
    <nav className="fixed inset-x-0 top-4 z-50 w-full bg-violet-300 opacity-90 backdrop-blur-lg border-b border-black/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex size-full items-center justify-between p-6">
          {/* Logo and Title Container */}
          <div className="flex items-center">
            {/* Logo (Overlapping) */}
            <div className="absolute left-6 -mb-20 mr-6 z-10">
              <img
                src="/img/Shield.png"
                alt="CRD Tech Logo"
                className="h-36 w-auto"
              />
            </div>

            {/* Title (Moved Left) */}
            <a
              href="#"
              className="absolute left-40 font-bold text-white text-lg ml-[-10px]"
            >
              CRD Tech
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="absolute right-16 md:flex md:items-center md:space-x-4">
            {navItems.map((item, index) => {
              if (item.text === "Contact") {
                return (
                  <motion.div
                    key={index}
                    className="relative nav-hover-btn"
                    onMouseEnter={handleContactMouseEnter}
                    onMouseLeave={handleContactMouseLeave}
                    onClick={item.onClick}
                  >
                    <motion.a
                      href={item.href}
                      className="text-white px-3 py-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.text}
                    </motion.a>
                    {/* Contact Dropdown */}
                    <motion.div
                      className="absolute right-2.5 mt-1 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{
                        opacity: isContactOpen ? 1 : 0,
                        scale: isContactOpen ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.1 }}
                      style={{
                        display: isContactOpen ? "block" : "none",
                      }}
                    >
                      <div className="py-1">
                        <a
                          href="mailto:carlton.decker@crdtechsolutions.com"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          style={{ textTransform: 'none' }} // Add this style
                        >
                          carlton.decker@crdtechsolutions.com
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              }

              return (
                <motion.a
                  key={index}
                  href={item.href}
                  className="nav-hover-btn text-white px-3 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={item.onClick}
                >
                  {item.text}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={clsx("md:hidden", { hidden: !isMenuOpen })}
        id="mobile-menu"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
            >
              {item.text}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
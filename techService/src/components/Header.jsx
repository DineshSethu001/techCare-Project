import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Wrench } from "lucide-react";
import logo from '../../public/favicon1.png'
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#070d17] text-gray-300 text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between">
          <span>Mon–Sat: 9:00 AM – 7:00 PM</span>

          <a href="tel:+919789561762">
            +91 9789561762
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2 font-bold text-xl"
          >
              <img src={logo} className="w-21 h-15"/>
           

            {/* Tech<span className="text-blue-600">Care</span> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">

            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-blue-600"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-blue-600"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-blue-600"
            >
              Why Us
            </button>

            <button
              onClick={() => scrollToSection("process")}
              className="hover:text-blue-600"
            >
              How It Works
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-blue-600"
            >
              Contact
            </button>

            {/* Admin */}
            <Link
              to="/admin"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Admin
            </Link>

          </nav>

          {/* Call Button */}
          <a
            href="tel:+919789561762"
            className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Phone size={17} />
            Call Now
          </a>

          {/* Mobile Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-4">

            <Link
              to="/"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/services"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Services
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Why Us
            </Link>

            <Link
              to="/process"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              How It Works
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Contact
            </Link>

            {/* Mobile Admin */}
           <Link
  to="/admin/login"
  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
>
  Admin
</Link>

          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
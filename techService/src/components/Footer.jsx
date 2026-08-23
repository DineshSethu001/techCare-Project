import React from "react";

const Footer = () => {

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>

      {/* Footer */}
      <footer className="bg-[#070d17] text-[#d9e1ed] py-[35px]">

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-[30px] items-center">

          {/* Brand */}
          <div>
            <b className="font-bold text-[20px]">
              Tech<span className="text-blue-400">Care</span>
            </b>

            <p className="text-[#7f8da2] text-xs mt-[5px]">
              Computer • Networking • CCTV
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-5">

            <button
              onClick={() => scrollToSection("services")}
              className="text-[#9eacc0] text-[13px] hover:text-white transition"
            >
              Services
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="text-[#9eacc0] text-[13px] hover:text-white transition"
            >
              Contact
            </button>

            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="text-[#9eacc0] text-[13px] hover:text-green-400 transition"
            >
              WhatsApp
            </a>

          </div>

          {/* Copyright */}
          <small className="text-[#66758b] text-xs">
            © 2026 TechCare. All rights reserved.
          </small>

        </div>

      </footer>

      {/* Floating WhatsApp */}
      <div className="fixed right-[22px] bottom-[22px] z-40 w-[54px] h-[54px] rounded-full grid place-items-center bg-green-600 text-white shadow-[0_12px_25px_rgba(22,163,74,0.3)] group">

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noreferrer"
          className="text-2xl"
          aria-label="Chat with us on WhatsApp"
        >
          💬
        </a>

        <span className="absolute right-[63px] whitespace-nowrap bg-gray-900 text-white px-[11px] py-2 rounded-lg text-[11px] opacity-0 translate-x-2 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0">
          Chat with us
        </span>

      </div>

    </div>
  );
};

export default Footer;
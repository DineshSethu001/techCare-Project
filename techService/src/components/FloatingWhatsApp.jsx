import React from 'react'

const FloatingWhatsApp = () => {
  return (
    <div>
      <div className="fixed right-[22px] bottom-[22px] z-40 w-[54px] h-[54px] rounded-full grid place-items-center bg-green-600 text-white shadow-[0_12px_25px_rgba(22,163,74,0.3)] group">

        <a
          href="https://wa.me/917339572897"
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
  )
}

export default FloatingWhatsApp

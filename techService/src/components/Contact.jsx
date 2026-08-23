import React, { useState } from "react";
import {
  Phone,
  MapPin,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "Computer & Laptop Service",
    date: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // CREATE BOOKING
  // =====================================

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      alert("API URL is not configured.");
      console.error("VITE_API_URL is missing.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create booking"
        );
      }

      console.log("Booking created:", data.booking);

      alert(
        `Booking successful! 🎉\n\nBooking ID: ${data.booking.bookingId}`
      );

      // Reset form
      setForm({
        name: "",
        phone: "",
        service: "Computer & Laptop Service",
        date: "",
        address: "",
        message: "",
      });

    } catch (error) {
      console.error("Booking error:", error);

      alert(
        error.message || "Unable to book the service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20"
    >
      <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2">

        {/* =====================================
            CONTACT INFORMATION
        ====================================== */}

        <div>

          <span className="text-blue-600">
            Need a technician?
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            Let's get your technology working.
          </h1>

          <p className="mt-5 text-gray-600">
            Send a quick request. We'll contact you
            to understand the issue, requirement or
            installation site.
          </p>

          {/* Contact details */}

          <div className="mt-8 space-y-6">

            {/* Phone */}

            <div className="flex gap-4">

              <Phone className="text-blue-600" />

              <div>
                <span className="block text-sm text-gray-500">
                  Call / WhatsApp
                </span>

                <a
                  href="tel:+917339572897"
                  className="font-semibold hover:text-blue-600"
                >
                  +91 73395728979
                </a>
              </div>

            </div>

            {/* Location */}

            <div className="flex gap-4">

              <MapPin className="text-blue-600" />

              <div>
                <span className="block text-sm text-gray-500">
                  Service area
                </span>

                <b>
                  Your City & nearby areas
                </b>
              </div>

            </div>

          </div>
        </div>

        {/* =====================================
            BOOKING FORM
        ====================================== */}

        <form
          onSubmit={handleBooking}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >

          <h2 className="mb-6 text-2xl font-bold">
            Book a service
          </h2>

          {/* Name */}

          <label className="mb-4 block">

            <span className="text-sm font-medium">
              Name
            </span>

            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </label>

          {/* Phone */}

          <label className="mb-4 block">

            <span className="text-sm font-medium">
              Phone
            </span>

            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </label>

          {/* Service */}

          <label className="mb-4 block">

            <span className="text-sm font-medium">
              Service
            </span>

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border px-4 py-3"
            >
              <option>
                Computer & Laptop Service
              </option>

              <option>
                Networking Solutions
              </option>

              <option>
                CCTV Camera Installation
              </option>

              <option>
                Other Technical Support
              </option>
            </select>

          </label>

          {/* Date */}

          <label className="mb-4 block">

            <span className="text-sm font-medium">
              Preferred Date
            </span>

            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </label>

          {/* Address */}

          <label className="mb-4 block">

            <span className="text-sm font-medium">
              Service Address
            </span>

            <textarea
              name="address"
              rows="3"
              required
              value={form.address}
              onChange={handleChange}
              placeholder="Enter service location"
              className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </label>

          {/* Message */}

          <label className="mb-5 block">

            <span className="text-sm font-medium">
              Message
            </span>

            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us what you need..."
              className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </label>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (
              <>
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />

                Booking...
              </>
            ) : (
              <>
                Book Service

                <ArrowRight size={18} />
              </>
            )}

          </button>

        </form>

      </div>
    </section>
  );
};

export default Contact;
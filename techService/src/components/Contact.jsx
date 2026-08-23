import React, { useState } from "react";
import {
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const Contact = () => {

  const [form, setForm] = useState({
  name: "",
  phone: "",
  service: "Computer & Laptop Service",
  date: "",
  address: "",
  message: "",
});
const sendWhatsApp = async (e) => {
  e.preventDefault();

  try {
  const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/bookings`,
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
      throw new Error(data.message);
    }

    console.log("Booking created:", data.booking);

    alert(
      `Booking successful!\nBooking ID: ${data.booking.bookingId}`
    );

    setForm({
      name: "",
      phone: "",
      service: "Computer & Laptop Service",
      date: "",
      address: "",
      message: "",
    });

  } catch (error) {
    console.error(error);
    alert("Unable to book the service.");
  }

};

  return (
    <section className="py-20">

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div>

          <span className="text-blue-600">
            Need a technician?
          </span>

          <h1 className="text-4xl font-bold mt-4">
            Let's get your technology working.
          </h1>

          <p className="text-gray-600 mt-5">
            Send a quick request. We'll contact you to understand
            the issue, requirement or installation site.
          </p>

          <div className="mt-8 space-y-6">

            <div className="flex gap-4">

              <Phone className="text-blue-600" />

              <div>
                <span className="block text-sm text-gray-500">
                  Call / WhatsApp
                </span>

                <a
                  href="tel:+917339572897"
                  className="font-semibold"
                >
                  +91 73395728979
                </a>
              </div>

            </div>

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

        {/* Form */}
        <form
          onSubmit={sendWhatsApp}
          className="border rounded-2xl p-6 shadow-sm"
        >

          <h2 className="text-2xl font-bold mb-6">
            Book a service
          </h2>

          <label className="block mb-4">
            <span className="text-sm font-medium">
              Name
            </span>

            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Your name"
              className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium">
              Phone
            </span>

            <input
              required
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              placeholder="10-digit mobile number"
              className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium">
              Service
            </span>

            <select
              value={form.service}
              onChange={(e) =>
                setForm({
                  ...form,
                  service: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-lg px-4 py-3"
            >
              <option>Computer & Laptop Service</option>
              <option>Networking Solutions</option>
              <option>CCTV Camera Installation</option>
              <option>Other Technical Support</option>
            </select>
          </label>
<label className="block mb-4">
  <span className="text-sm font-medium">
    Preferred Date
  </span>

  <input
    type="date"
    required
    value={form.date}
    onChange={(e) =>
      setForm({
        ...form,
        date: e.target.value,
      })
    }
    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
  />
</label>

<label className="block mb-4">
  <span className="text-sm font-medium">
    Service Address
  </span>

  <textarea
    rows="3"
    required
    value={form.address}
    onChange={(e) =>
      setForm({
        ...form,
        address: e.target.value,
      })
    }
    placeholder="Enter service location"
    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
  />
</label>
          <label className="block mb-5">
            <span className="text-sm font-medium">
              Message
            </span>

            <textarea
              rows="4"
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              placeholder="Tell us what you need..."
              className="w-full mt-2 border rounded-lg px-4 py-3"
            />
          </label>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Send via WhatsApp
            <ArrowRight size={18} />
          </button>

        </form>

      </div>

    </section>
  );
};

export default Contact;
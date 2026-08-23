import React from "react";
import {
  Laptop,
  Network,
  Camera,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const services = [
  {
    icon: Laptop,
    title: "Computer & Laptop Service",
    text: "Fast diagnosis, repair, upgrades, OS installation, virus cleanup and maintenance for desktops and laptops.",
    points: [
      "Hardware repair",
      "SSD & RAM upgrades",
      "OS & software setup",
    ],
  },
  {
    icon: Network,
    title: "Networking Solutions",
    text: "Reliable wired and wireless networking for homes, offices, shops and small businesses.",
    points: [
      "Wi-Fi setup",
      "LAN cabling",
      "Router & switch configuration",
    ],
  },
  {
    icon: Camera,
    title: "CCTV Camera Installation",
    text: "Professional CCTV installation with clean cabling, remote viewing and dependable security coverage.",
    points: [
      "Indoor & outdoor cameras",
      "DVR/NVR setup",
      "Mobile remote monitoring",
    ],
  },
];

const Services = () => {
  return (
    <section className="py-20">

      <div className="container mx-auto px-4">

        <div className="text-center max-w-2xl mx-auto mb-12">

          <span className="text-blue-600 font-medium">
            What we do
          </span>

          <h1 className="text-4xl font-bold mt-3">
            Services built around your needs
          </h1>

          <p className="text-gray-600 mt-4">
            From a slow laptop to a complete office network,
            we handle the technology so you don't have to.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map(({ icon: Icon, title, text, points }) => (

            <article
              key={title}
              className="border rounded-2xl p-6 hover:shadow-lg transition"
            >

              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Icon size={25} />
              </div>

              <h2 className="text-xl font-bold mt-5">
                {title}
              </h2>

              <p className="text-gray-600 mt-3">
                {text}
              </p>

              <ul className="mt-5 space-y-3">

                {points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-green-500"
                    />
                    {point}
                  </li>
                ))}

              </ul>

              <Link
                to="/contact"
                className="flex items-center gap-2 text-blue-600 mt-6 font-medium"
              >
                Get Service
                <ArrowRight size={16} />
              </Link>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Services;
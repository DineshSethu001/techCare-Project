import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Laptop,
  Network,
  Camera,
  ShieldCheck,
} from "lucide-react";

const serviceCategories = [
  {
    id: "computer",
    icon: Laptop,
    title: "Computer & Laptop",
    description: "Repair • Upgrade • Setup",
    services: [
      "Computer & Laptop Repair",
      "Cleaning & Maintenance",
      "SSD & RAM Upgrades",
      "Screen Replacement",
      "Windows Installation",
      "Software Installation",
      "Virus & Malware Removal",
      "Custom PC Building",
    ],
  },
  {
    id: "networking",
    icon: Network,
    title: "Networking",
    description: "Wi-Fi • LAN • Routers",
    services: [
      "Wi-Fi Setup",
      "LAN Installation",
      "Network Cabling",
      "Router Configuration",
      "Switch Configuration",
      "Printer Network Setup",
      "Office Network Setup",
      "Network Troubleshooting",
    ],
  },
  {
    id: "cctv",
    icon: Camera,
    title: "CCTV Security",
    description: "Install • Configure • Monitor",
    services: [
      "CCTV Camera Installation",
      "Indoor & Outdoor Cameras",
      "DVR/NVR Setup",
      "CCTV Configuration",
      "Mobile Remote Viewing",
      "CCTV Troubleshooting",
      "Camera Replacement",
      "CCTV Maintenance",
    ],
  },
];

const Hero = () => {
  const [activeService, setActiveService] = useState(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
      {/* Background Glow */}
      <div className="absolute right-[-80px] top-[80px] h-[260px] w-[260px] rounded-full bg-blue-100 opacity-50 blur-[10px]" />

      <div className="absolute bottom-[10px] left-[-70px] h-[170px] w-[170px] rounded-full bg-cyan-100 opacity-35 blur-[10px]" />

      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Professional Tech Support
          </div>

          {/* Main SEO Heading */}
          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Computer, Hardware,{" "}
            <span className="text-blue-600">
              Networking & CCTV
            </span>{" "}
            Services
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            One trusted team for computer & laptop repairs,
            networking solutions and CCTV camera installation.
            Practical solutions, clean work and friendly support.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={scrollToContact}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Book a Service
              <ArrowRight size={18} />
            </button>

            <a
              href="https://wa.me/919789561762"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:border-green-500 hover:text-green-600"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Trust */}
          <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-green-500"
              />
              Quick response
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-green-500"
              />
              Transparent pricing
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2
                size={18}
                className="text-green-500"
              />
              Quality workmanship
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70">
            {/* Card Header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Your local tech partner
                </span>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Complete Technology Care
                </h2>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <ShieldCheck size={28} />
              </div>
            </div>

            {/* Service Categories */}
            <div className="space-y-2">
              {serviceCategories.map((service) => {
                const Icon = service.icon;
                const isActive =
                  activeService === service.id;

                return (
                  <div
                    key={service.id}
                    className="overflow-hidden rounded-xl border border-slate-100"
                  >
                    {/* Category Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveService(
                          isActive ? null : service.id
                        )
                      }
                      aria-expanded={isActive}
                      className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-slate-50"
                    >
                      {/* Icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={21} />
                      </div>

                      {/* Title + Description */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">
                          {service.title}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {service.description}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight
                        size={18}
                        className={`shrink-0 text-slate-400 transition-transform ${
                          isActive ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded Services */}
                    {isActive && (
                      <div className="border-t border-slate-100 bg-slate-50 px-4 pb-4 pt-3">
                        <h4 className="mb-3 text-sm font-semibold text-slate-700">
                          Available Services
                        </h4>

                        <ul className="space-y-2">
                          {service.services.map(
                            (item) => (
                              <li
                                key={item}
                                className="flex items-center gap-2 text-sm text-slate-600"
                              >
                                <CheckCircle2
                                  size={16}
                                  className="shrink-0 text-green-500"
                                />

                                <span>{item}</span>
                              </li>
                            )
                          )}
                        </ul>

                        {/* Book Service */}
                        <button
                          type="button"
                          onClick={scrollToContact}
                          className="mt-4 flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          Book This Service
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status */}
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Same-day service available
            </div>
          </div>

          {/* Tagline */}
          <p className="mt-4 text-xl font-semibold text-slate-700">
            Fix. Connect. Protect.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
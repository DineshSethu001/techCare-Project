import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Laptop,
  Network,
  Camera,
  ShieldCheck,
} from "lucide-react";

const Hero = () => {

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

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Professional Tech Support
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Fix. Connect.{" "}
            <span className="text-blue-600">
              Protect.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            One trusted team for computer & laptop repairs,
            networking solutions and CCTV camera installation.
            Practical solutions, clean work and friendly support.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Book a Service
              <ArrowRight size={18} />
            </button>

            <a
              href="https://wa.me/919999999999"
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

            {/* Service 1 */}
            <ServiceItem
              icon={<Laptop size={21} />}
              title="Computer & Laptop"
              description="Repair • Upgrade • Setup"
            />

            {/* Service 2 */}
            <ServiceItem
              icon={<Network size={21} />}
              title="Networking"
              description="Wi-Fi • LAN • Routers"
            />

            {/* Service 3 */}
            <ServiceItem
              icon={<Camera size={21} />}
              title="CCTV Security"
              description="Install • Configure • Monitor"
            />

            {/* Status */}
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Same-day service available
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

const ServiceItem = ({
  icon,
  title,
  description,
}) => {

  return (
    <div className="flex items-center gap-4 border-t border-slate-100 py-4">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <div className="flex-1">

        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        <p className="text-sm text-slate-500">
          {description}
        </p>

      </div>

      <ChevronRight
        size={18}
        className="text-slate-400"
      />

    </div>
  );
};

export default Hero;
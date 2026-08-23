import React from "react";
import {
  ShieldCheck,
  Wrench,
  Wifi,
} from "lucide-react";

const About = () => {
  return (
    <section className="bg-[#070d17] text-white py-20">

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">

        <div>

          <span className="text-blue-400">
            Why choose TechCare
          </span>

          <h1 className="text-4xl font-bold mt-4">
            Technology problems should feel simple.
          </h1>

          <p className="text-gray-400 mt-5 leading-7">
            We focus on clear communication, dependable work
            and solutions that fit your actual requirement.
            No confusing jargon. No unnecessary upgrades.
            Just the right fix.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-10">

            <div>
              <strong className="text-3xl">3+</strong>
              <span className="block text-gray-400 text-sm">
                Core services
              </span>
            </div>

            <div>
              <strong className="text-3xl">24/7</strong>
              <span className="block text-gray-400 text-sm">
                Remote guidance
              </span>
            </div>

            <div>
              <strong className="text-3xl">100%</strong>
              <span className="block text-gray-400 text-sm">
                Customer focus
              </span>
            </div>

          </div>

        </div>

        <div className="bg-gray-900 rounded-2xl p-6 space-y-6">

          <Feature
            icon={<ShieldCheck />}
            title="Reliable & secure"
            text="Security-minded installation and configuration."
          />

          <Feature
            icon={<Wrench />}
            title="Practical repairs"
            text="Diagnose the real issue before replacing parts."
          />

          <Feature
            icon={<Wifi />}
            title="Connected homes & offices"
            text="Stable Wi-Fi and network setup for everyday use."
          />

        </div>

      </div>

    </section>
  );
};

const Feature = ({ icon, title, text }) => (
  <div className="flex gap-4">

    <div className="text-blue-400">
      {icon}
    </div>

    <div>
      <b>{title}</b>
      <p className="text-gray-400 text-sm mt-1">
        {text}
      </p>
    </div>

  </div>
);

export default About;
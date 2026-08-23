import React from "react";

const process = [
  ["01", "Call or WhatsApp", "Tell us what you need and share your location."],
  ["02", "Inspection & Diagnosis", "We check the issue and recommend the right solution."],
  ["03", "Repair or Installation", "Our technician completes the work neatly and safely."],
  ["04", "Testing & Handover", "We test everything and explain how to use it."],
];

const Process = () => {
  return (
    <section className="py-20">

      <div className="container mx-auto px-4">

        <div className="text-center mb-12">

          <span className="text-blue-600">
            Simple process
          </span>

          <h1 className="text-4xl font-bold mt-3">
            From problem to solution
          </h1>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {process.map(([num, title, text]) => (

            <div
              key={num}
              className="border rounded-2xl p-6"
            >

              <span className="text-blue-600 font-bold">
                {num}
              </span>

              <h2 className="text-xl font-bold mt-4">
                {title}
              </h2>

              <p className="text-gray-600 mt-3">
                {text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Process;
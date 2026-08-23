import React from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Process from "../components/Process";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const Home = () => {
  return (
    <>
      <Header />

      <main>

        <section id="home">
          <Hero />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="process">
          <Process />
        </section>

        <section id="contact">
          <Contact />
        </section>

      </main>

      <Footer />

      <FloatingWhatsApp />
    </>
  );
};

export default Home;
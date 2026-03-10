"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import ContactBackground from "./contact/ContactBackground";
import ContactHeader from "./contact/ContactHeader";
import ContactInfo from "./contact/ContactInfo";
import OptimizedContactForm from "./contact/OptimizedContactForm";

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hi Irika! 👋 I'm ${formData.name} and I'm interested in your personalized nutrition services.

Here are my goals:
${formData.message}

Looking forward to starting my wellness journey!`;

    const whatsappUrl = `https://wa.me/919833640891?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };



  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 sm:py-28 bg-white overflow-hidden"
    >
      {/* Animated Background */}
      <ContactBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <ContactHeader inView={inView} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <ContactInfo inView={inView} />

          {/* Contact Form */}
          <OptimizedContactForm
            inView={inView}
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            submitted={submitted}
          />
        </div>
      </div>
    </section>
  );
}
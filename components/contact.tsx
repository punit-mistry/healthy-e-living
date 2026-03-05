"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BorderBeam } from "./border-beam/BorderBeam";

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.1,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create WhatsApp message with warm greeting
    const message = `Hi Irika! 👋 I'm ${formData.name} and I'm interested in your personalized nutrition services. Here's a bit about my health journey and goals: ${formData.message}\n\nLooking forward to starting my wellness transformation with you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919833640891?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const rect = form.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91 8286075880",
      href: "https://wa.me/919833640891",
    },
    {
      icon: Mail,
      label: "Email",
      value: "irika@healtheliving.com",
      href: "mailto:irika@healtheliving.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Available for virtual & in-person",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Let's Start Your Journey
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Reach out to schedule your consultation via WhatsApp or ask any
            questions about my services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  variants={itemVariants}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 group"
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#6A431C] transition-colors">
                    <Icon className="w-6 h-6 text-[#6A431C] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{info.label}</p>
                    <p className="text-slate-600">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8"
            >
              <p className="font-semibold text-slate-900 mb-2">Hours</p>
              <p className="text-sm text-slate-600 mb-1">
                Monday - Friday: 9am - 6pm
              </p>
              <p className="text-sm text-slate-600">Saturday: 10am - 2pm</p>
              <p className="text-xs text-slate-500 mt-4 italic">
                IST / Weekday appointments preferred
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form with Magic Card Effect and Rotating Border Beam */}
          {/* <motion.form
            onSubmit={handleSubmit}
            onMouseMove={handleMouseMove}
            className="lg:col-span-2 relative rounded-2xl p-8 space-y-6 group"
            style={{
              perspective: '1200px',
            }}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          > */}
          <div className="lg:col-span-2 relative rounded-2xl p-8 group border">
            <BorderBeam duration={8} size={250} />
            {/* Rotating Border Beam Effect */}
            <div className="absolute -inset-0.5 rounded-2xl animate-border-beam opacity-75 group-hover:opacity-100 transition-opacity -z-20" />

            {/* Magic card gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#6A431C] to-[#8B5A2B] rounded-2xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />

            {/* Animated background with mouse tracking */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-yellow-50/50 rounded-2xl -z-10"
              animate={{
                background: mousePosition
                  ? `radial-gradient(600px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(106, 67, 28, 0.1), transparent)`
                  : undefined,
              }}
              transition={{ type: "tween", duration: 0.3 }}
            />

            {/* Content wrapper */}
            <div className="relative z-10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className="w-full"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="91 0000000000"
                  className="w-full"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your health goals and what brings you here..."
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A431C] focus:border-transparent resize-none"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 text-sm text-slate-600 py-2"
              >
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="w-4 h-4"
                />
                <label htmlFor="privacy">
                  I agree to the privacy policy and terms of service
                </label>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-[#6A431C] hover:bg-[#5A3715] text-white py-6 text-base font-semibold"
                  onClick={handleSubmit}
                >
                  Send via WhatsApp
                </Button>
              </motion.div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-50 border border-yellow-300 text-[#6A431C] rounded-lg p-4 text-center"
                >
                  Redirecting to WhatsApp... Thanks for reaching out!
                </motion.div>
              )}
            </div>
          </div>

          {/* </motion.form> */}
        </div>
      </div>
    </section>
  );
}

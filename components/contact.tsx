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

  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91 9833640891",
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
      value: "Available for virtual & in-person (only in Mumbai)",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 sm:py-28 bg-white overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">

        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity }}
          className="absolute top-10 left-10 w-80 h-80 bg-yellow-200/30 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-10 right-20 w-96 h-96 bg-[#6A431C]/10 rounded-full blur-3xl"
        />

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
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
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 group"
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-[#6A431C] transition">
                    <Icon className="w-6 h-6 text-[#6A431C] group-hover:text-white transition" />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {info.label}
                    </p>
                    <p className="text-slate-600">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Hours */}
            <motion.div
              variants={itemVariants}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-8"
            >
              <p className="font-semibold text-slate-900 mb-2">Hours</p>

              <p className="text-sm text-slate-600">
                Monday - Friday: 9am - 6pm
              </p>

              <p className="text-sm text-slate-600">
                Saturday: 10am - 2pm
              </p>

              <p className="text-xs text-slate-500 mt-4 italic">
                IST / Weekday appointments preferred
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            onMouseMove={handleMouseMove}
            className="lg:col-span-2 relative rounded-2xl p-8 border border-slate-100 bg-white/70 backdrop-blur-md group"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >

            <BorderBeam duration={8} size={250} />

            {/* Mouse Gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl -z-10"
              animate={{
                background: `radial-gradient(600px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(106,67,28,0.12), transparent)`
              }}
              transition={{ duration: 0.25 }}
            />

            <div className="space-y-6 relative z-10">

              <div className="grid sm:grid-cols-2 gap-6">

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>

                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>

                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </motion.div>

              </div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2">
                  Phone
                </label>

                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 0000000000"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your health goals..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#6A431C] resize-none"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-[#6A431C] hover:bg-[#5A3715] text-white py-6 text-base font-semibold hover:scale-[1.02] transition"
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
          </motion.form>
        </div>
      </div>
    </section>
  );
}
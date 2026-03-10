"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BorderBeam } from "../border-beam/BorderBeam";
import { optimizedContainerVariants, optimizedItemVariants, shouldReduceMotion } from "../animations/optimized-animations";

interface OptimizedContactFormProps {
  inView: boolean;
  onSubmit: (e: React.FormEvent) => void;
  formData: { name: string; email: string; phone: string; message: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  submitted: boolean;
}

export default function OptimizedContactForm({ 
  inView, 
  onSubmit, 
  formData, 
  onChange, 
  submitted 
}: OptimizedContactFormProps) {
  // Skip mouse tracking on mobile for better performance
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = shouldReduceMotion() ? undefined : (e: React.MouseEvent<HTMLFormElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      onMouseMove={handleMouseMove}
      className="lg:col-span-2 relative rounded-2xl p-8 border border-slate-100 bg-white/70 backdrop-blur-md group"
      variants={optimizedContainerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <BorderBeam duration={8} size={250} />

      {/* Mouse Gradient - Only on desktop */}
      {!shouldReduceMotion() && (
        <motion.div
          className="absolute inset-0 rounded-2xl -z-10"
          animate={{
            background: `radial-gradient(400px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(106,67,28,0.08), transparent)`
          }}
          transition={{ duration: 0.3 }} // Slightly slower for performance
        />
      )}

      <div className="space-y-6 relative z-10">
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div variants={optimizedItemVariants}>
            <label className="block text-sm font-semibold mb-2">
              Full Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={onChange}
              required
              placeholder="John Smith"
            />
          </motion.div>

          <motion.div variants={optimizedItemVariants}>
            <label className="block text-sm font-semibold mb-2">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              placeholder="john@example.com"
            />
          </motion.div>
        </div>

        <motion.div variants={optimizedItemVariants}>
          <label className="block text-sm font-semibold mb-2">
            Phone
          </label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="+91 0000000000"
          />
        </motion.div>

        <motion.div variants={optimizedItemVariants}>
          <label className="block text-sm font-semibold mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            required
            rows={5}
            placeholder="Tell me about your health goals..."
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#6A431C] resize-none"
          />
        </motion.div>

        <motion.div variants={optimizedItemVariants}>
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
  );
}

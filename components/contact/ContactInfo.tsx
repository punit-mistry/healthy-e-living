"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { optimizedContainerVariants, optimizedItemVariants } from "../animations/optimized-animations";

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

interface ContactInfoProps {
  inView: boolean;
}

export default function ContactInfo({ inView }: ContactInfoProps) {
  return (
    <motion.div
      className="space-y-6"
      variants={optimizedContainerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {contactInfo.map((info, index) => {
        const Icon = info.icon;

        return (
          <motion.a
            key={index}
            href={info.href}
            variants={optimizedItemVariants}
            whileHover={{ x: 4 }} // Reduced from 6
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
        variants={optimizedItemVariants}
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
  );
}

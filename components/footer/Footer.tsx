"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useParticleCanvas } from "./hooks/useParticleCanvas";
import { FooterLinks } from "./types/footer";
import { FooterLink } from "./types/footer";
import { FooterColumn } from "./types/footer";

const footerLinks: FooterLinks = [
  {
    title: "Services",
    links: [
      { label: "Weight Loss Diet", href: "/services/weight-loss" },
      { label: "PCOS Diet Plan", href: "/services/pcos-diet" },
      { label: "Diabetes Diet Plan", href: "/services/diabetes-diet" },
      { label: "Gut Health Diet", href: "/services/gut-health" },
      { label: "Online Consultation", href: "/services/online-consultation" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Dietitian in Borivali", href: "/locations/borivali" },
      { label: "Dietitian in Andheri", href: "/locations/andheri" },
      { label: "Dietitian in Thane", href: "/locations/thane" },
      { label: "Dietitian in Navi Mumbai", href: "/locations/navi-mumbai" },
      { label: "Dietitian in Malad", href: "/locations/malad" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef as React.RefObject<HTMLCanvasElement>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  } as const;

  return (
    <footer
      className="relative overflow-hidden text-slate-300"
      style={{
        background:
          "linear-gradient(170deg, #2d1f14 0%, #3d2817 45%, #1a1410 100%)",
      }}
    >
      <AmbientOrbs />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative"
        style={{ zIndex: 2 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <BrandSection />

          {footerLinks.map((column: FooterColumn) => (
            <LinkColumn key={column.title} column={column} />
          ))}
        </motion.div>

        <Divider />

        <BottomSection currentYear={currentYear} />

        <LegalSection />
      </div>
    </footer>
  );
}

// Sub-components
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="absolute top-0 right-1/3 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(106,67,28,0.28) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,90,43,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(180,110,30,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

function BrandSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  } as const;

  return (
    <motion.div variants={itemVariants}>
      <div className="flex items-center gap-3 mb-5">
        <img
          src="/brand-logo.PNG"
          alt="Healthy E Living"
          className="h-20 w-auto"
        />
      </div>
      <p className="text-sm text-slate-400 leading-relaxed mb-6">
        Expert nutrition counseling for better health and quality of life.
      </p>

      <a
        href="https://wa.me/919833640891?text=Hi%21%20I%27d%20like%20to%20know%20more%20about%20your%20nutrition%20consultation%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        </svg>
        Chat on WhatsApp
      </a>
    </motion.div>
  );
}

function LinkColumn({ column }: { column: FooterLinks[0] }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  } as const;

  return (
    <motion.div variants={itemVariants}>
      <h4
        className="font-semibold text-white mb-5 pb-2 text-sm tracking-widest uppercase"
        style={{
          color: "rgba(230,165,60,0.9)",
          borderBottom: "1px solid rgba(106,67,28,0.3)",
        }}
      >
        {column.title}
      </h4>
      <ul className="space-y-3">
        {column.links.map((link: FooterLink) => (
          <li key={link.label}>
            <LinkItem link={link} />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function LinkItem({ link }: { link: { label: string; href: string } }) {
  return (
    <a
      href={link.href}
      className="text-sm text-slate-400 transition-colors duration-200 block py-0.5 hover:text-amber-400"
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "rgba(230,165,60,0.9)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.color = "")}
    >
      {link.label}
    </a>
  );
}

function Divider() {
  return (
    <motion.div
      className="my-10"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{ originX: 0 }}
      viewport={{ once: true }}
    >
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(180,110,30,0.5) 20%, rgba(230,160,50,0.7) 50%, rgba(180,110,30,0.5) 80%, transparent)",
        }}
      />
    </motion.div>
  );
}

function BottomSection({ currentYear }: { currentYear: number }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  } as const;

  return (
    <>
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <p className="text-sm text-white">
          © {currentYear} Health.e.living. All rights reserved.
        </p>
        <SocialLink />
      </motion.div>

      <Divider />
    </>
  );
}

function SocialLink() {
  return (
    <a
      href="https://www.linkedin.com/in/irika-goyal-825183229/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="p-2 rounded-lg transition-all duration-200 hover:bg-white/5"
      style={{ color: "rgba(180,150,100,0.55)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "rgba(230,165,60,0.9)";
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(180,150,100,0.55)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    </a>
  );
}

function LegalSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  } as const;

  return (
    <motion.div
      className="pt-6 text-center text-xs text-white/70"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      This website is for informational purposes only.
      <br />
      Crafted with care by{" "}
      <a
        href="https://www.bombaycoder.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2"
      >
        BombayCoder
      </a>
    </motion.div>
  );
}

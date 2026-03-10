"use client";

import { useInView } from "react-intersection-observer";
import CTABackground from "./cta/CTABackground";
import CTAContent from "./cta/CTAContent";

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });


  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-r from-[#6A431C] via-[#8B5A2B] to-[#6A431C]"
    >
      {/* Animated Background */}
      <CTABackground />

      <CTAContent inView={inView} />
    </section>
  );
}
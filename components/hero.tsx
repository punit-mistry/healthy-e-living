"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SparklesText } from "./sparkles-text/SparklesText";
import { WordRotate } from "./word-rotate/WordRotate";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-200px] left-[20%] w-[600px] h-[600px] bg-yellow-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-yellow-50 border border-yellow-200 rounded-full">
              <span className="w-2 h-2 bg-[#6A431C] rounded-full" />
              <span className="text-sm font-medium text-[#6A431C]">
                Nutrition by Irika Goyal
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">

              <SparklesText>Transform Your Health</SparklesText>

              <span className="block mt-2">Through</span>

              {/* FIXED HEIGHT ROTATE */}
              <span className="block mt-3 text-[#6A431C] min-h-[1.3em]">
                <WordRotate
                  duration={2500}
                  className="inline-block"
                  words={[
                    "Personalized Nutrition",
                    "Evidence-Based Nutrition",
                    "Sustainable Nutrition",
                    "Practical Nutrition",
                    "Clinical Nutrition",
                  ]}
                />
              </span>

            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
              Work with a clinical dietitian to create a personalized nutrition
              plan tailored to your lifestyle, medical history, and long-term
              health goals.
            </p>

            {/* CTA */}
            <div className="mt-10 flex gap-4 flex-wrap">

              <Button
                size="lg"
                className="bg-[#6A431C] hover:bg-[#5A3715] text-white shadow-lg"
                onClick={scrollToContact}
              >
                Book Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex flex-col items-center">

            <img
              src="/header-img.jpg"
              alt="Nutrition consultation with Irika Goyal"
              className="rounded-3xl shadow-2xl object-contain w-full h-[520px]"
            />

            {/* Name tag */}
            <div className="mt-6 text-center">

              <p className="text-xl font-semibold text-slate-900">
                Dt. Irika Goyal
              </p>

              <p className="text-sm text-slate-500">
                Clinical Dietitian & Nutritionist
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
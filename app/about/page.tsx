import { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer/Footer"

export const metadata: Metadata = {
  title: "About Dt. Irika Goyal | Clinical Dietitian & Nutritionist Mumbai",
  description:
    "Learn about Dt. Irika Goyal, a qualified clinical dietitian and nutritionist with 4+ years of experience helping patients achieve their health goals through personalized nutrition plans.",
  alternates: { canonical: "/about" },
    openGraph: {
      title: "About Dt. Irika Goyal | Clinical Dietitian & Nutritionist Mumbai",
      description: "Learn about Dt. Irika Goyal's qualifications, experience, and approach to personalized nutrition counseling.",
      url: "https://healthy-e-living.vercel.app/about",
      siteName: "Nutrition by Irika Goyal",
      images: [{ url: "https://healthy-e-living.vercel.app/brand-logo.PNG", width: 1200, height: 630 }],
    },
}

const qualifications = [
  { title: "Clinical Dietitian", detail: "MS in Nutrition Science", org: "Registered Dietitian" },
  { title: "Medical Nutrition Therapy", detail: "Chronic Disease Management", org: "Clinical Practice" },
]

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://healthy-e-living.vercel.app/" },
          { "@type": "ListItem", position: 2, name: "About", item: "https://healthy-e-living.vercel.app/about" },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <div className="min-h-screen bg-white overflow-hidden">
        <Header />
        <main>
          <section className="min-h-[calc(100vh-4rem)] pt-32 pb-24 bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="mb-8 text-sm text-slate-500">
                <Link href="/" className="hover:text-[#6A431C]">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-[#6A431C] font-medium">About</span>
              </nav>
              <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">About</p>
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                    Dt. Irika Goyal
                  </h1>
                  <p className="text-lg text-[#6A431C] font-medium mb-4">Clinical Dietitian & Nutritionist</p>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    With over 4 years of clinical experience, I specialize in helping individuals transform their health through personalized nutrition therapy. My approach combines evidence-based science with compassionate, patient-centered care.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    I believe that good nutrition should be practical, enjoyable, and sustainable. Whether you are managing a chronic condition, looking to lose weight, or simply want to feel your best, I create customized plans that fit your lifestyle.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://wa.me/919833640891"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#6A431C] text-white rounded-lg hover:bg-[#5A3715] transition-colors font-medium"
                    >
                      Book a Consultation
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#6A431C] text-[#6A431C] rounded-lg hover:bg-[#6A431C] hover:text-white transition-colors font-medium"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="/header-img.jpg"
                      alt="Dt. Irika Goyal - Clinical Dietitian & Nutritionist"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-yellow-100 rounded-full -z-10" />
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full -z-10" />
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-4 gap-8 mb-20">
                {[
                  { value: "4+", label: "Years Experience" },
                  { value: "100+", label: "Patients Helped" },
                  { value: "95%", label: "Client Satisfaction" },
                  { value: "10+", label: "Specializations" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl border border-yellow-100 shadow-sm text-center hover:shadow-lg transition-all">
                    <p className="text-4xl sm:text-5xl font-bold text-[#6A431C] mb-2">{stat.value}</p>
                    <p className="text-slate-600 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4 text-center">Qualifications & Credentials</h2>
              <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
                Dedicated to maintaining the highest standards of clinical practice and continuing education.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {qualifications.map((q) => (
                  <div key={q.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-[#6A431C] hover:shadow-lg transition-all">
                    <div className="w-10 h-10 bg-[#6A431C]/10 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-[#6A431C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-lg mb-2">{q.title}</h3>
                    <p className="text-[#6A431C] font-medium text-sm mb-3">{q.detail}</p>
                    <p className="text-slate-600 text-sm">{q.org}</p>
                  </div>
                ))}
                <div className="bg-gradient-to-br from-[#6A431C] to-[#8B5A2B] rounded-2xl p-8 text-white hover:shadow-lg transition-all">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">And Many More...</h3>
                  <p className="text-yellow-200 font-medium text-sm mb-3">Continuous Learning</p>
                  <p className="text-white/80 text-sm">Regularly updating skills through workshops, conferences, and advanced certifications.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-slate-900 mb-8 text-center">My Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Assessment", desc: "Comprehensive health history, dietary analysis, and goal setting." },
                  { step: "02", title: "Planning", desc: "Personalized nutrition plan tailored to your lifestyle and preferences." },
                  { step: "03", title: "Education", desc: "Learn the science behind your plan and how to make it work for you." },
                  { step: "04", title: "Monitoring", desc: "Regular follow-ups and adjustments for optimal results." },
                ].map((item) => (
                  <div key={item.step} className="bg-white border border-slate-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-[#6A431C] rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-4">{item.step}</div>
                    <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

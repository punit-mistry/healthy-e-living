import { Metadata } from "next"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer/Footer"

export const metadata: Metadata = {
  title: "Contact Dt. Irika Goyal | Book Dietitian Consultation Mumbai",
  description:
    "Get in touch with Dt. Irika Goyal for personalized nutrition counseling. Book your consultation online or via WhatsApp for weight loss, PCOS, diabetes, and more.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Dt. Irika Goyal | Book Dietitian Consultation Mumbai",
    description: "Book your nutrition consultation with Dt. Irika Goyal. Online and in-person sessions available.",
    url: "https://healthy-e-living.vercel.app/contact",
    siteName: "Nutrition by Irika Goyal",
  },
}

const contactMethods = [
  { method: "WhatsApp", value: "+91 9833640891", href: "https://wa.me/919833640891", icon: "💬" },
  { method: "Phone", value: "+91 9833640891", href: "tel:+919833640891", icon: "📞" },
  { method: "Email", value: "irikagoyal@gmail.com", href: "mailto:irikagoyal@gmail.com", icon: "✉️" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <main>
        <section className="min-h-[calc(100vh-4rem)] pt-32 pb-24 bg-gradient-to-br from-yellow-50 via-white to-orange-50 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="mb-8 text-sm text-slate-500">
              <Link href="/" className="hover:text-[#6A431C]">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-[#6A431C] font-medium">Contact</span>
            </nav>
            <div className="text-center mb-16">
              <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">Contact</p>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Get in Touch</h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Ready to start your health journey? Reach out via any of the channels below and I'll get back to you within 24 hours.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-6">
                {contactMethods.map((cm) => (
                  <a
                    key={cm.method}
                    href={cm.href}
                    target={cm.method === "WhatsApp" ? "_blank" : undefined}
                    rel={cm.method === "WhatsApp" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-2xl hover:border-[#6A431C] hover:shadow-lg transition-all group"
                  >
                    <span className="text-3xl">{cm.icon}</span>
                    <div>
                      <p className="text-sm text-slate-500">{cm.method}</p>
                      <p className="font-semibold text-slate-900 group-hover:text-[#6A431C] transition-colors">{cm.value}</p>
                    </div>
                  </a>
                ))}
                <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                  <p className="font-medium text-slate-900 mb-2">📍 Location</p>
                  <p className="text-slate-600">Mumbai, Maharashtra, India</p>
                  <p className="text-sm text-slate-500 mt-1">In-person & online consultations available</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8">
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Consultation Hours</h2>
                <div className="space-y-4">
                  {[
                    { day: "Monday – Friday", hours: "10:00 AM – 7:00 PM" },
                    { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
                    { day: "Sunday", hours: "By Appointment Only" },
                  ].map((s) => (
                    <div key={s.day} className="flex justify-between pb-3 border-b border-yellow-200 last:border-0">
                      <span className="font-medium text-slate-900">{s.day}</span>
                      <span className="text-slate-600">{s.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-3">
                  <a
                    href="https://wa.me/919833640891"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-3 bg-[#6A431C] text-white rounded-lg hover:bg-[#5A3715] transition-colors font-medium"
                  >
                    Book via WhatsApp
                  </a>
                  <a
                    href="tel:+919833640891"
                    className="block text-center px-6 py-3 border-2 border-[#6A431C] text-[#6A431C] rounded-lg hover:bg-[#6A431C] hover:text-white transition-colors font-medium"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-6">Prefer a Quick Message?</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Send a message directly via WhatsApp and I'll respond within 24 hours. 
              Include your health goals and any questions you have.
            </p>
            <a
              href="https://wa.me/919833640891?text=Hi%21%20I%27d%20like%20to%20know%20more%20about%20your%20nutrition%20consultation%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              Send a WhatsApp Message
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

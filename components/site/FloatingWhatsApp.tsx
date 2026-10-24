import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { waUrl } from "@/lib/whatsapp"

/** Always-available WhatsApp shortcut. A plain link: works without JavaScript. */
export default function FloatingWhatsApp() {
  return (
    <a
      href={waUrl("default")}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      data-track-location="floating_button"
      className="no-print fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-green pl-4 pr-5 font-bold text-cream shadow-[0_3px_0_0_var(--color-green-deep),0_14px_30px_-12px_rgb(37_45_39/0.55)] transition-transform duration-200 hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span>
        Chat<span className="hidden sm:inline"> on WhatsApp</span>
      </span>
    </a>
  )
}

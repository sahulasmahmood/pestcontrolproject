import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { Contact } from "@/components/Contact/Contact";
import { ContactPageSeo } from "@/components/Contact/ContactSeo";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Dynamic SEO metadata will be handled by the SEO provider
export const metadata = {
  title: "Contact Perfect Pest Control - Professional Pest Management Services",
  description:
    "Contact Perfect Pest Control for expert pest management solutions. 24/7 emergency services for ants, cockroaches, rats, termites, and more in Tirunelveli.",
  keywords:
    "contact pest control, ant control, cockroach control, rat control, termite treatment, mosquito control, pest management, Tirunelveli pest control, emergency pest control",
}; 

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactPageSeo />
      <Navbar />
      <Contact />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}

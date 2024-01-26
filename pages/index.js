import ActionSection from "../components/homepage/ActionSection.jsx";
import ContactForm from "../components/homepage/ContactForm.jsx";
import FeatureSection from "../components/homepage/FeatureSection.jsx";
import BannerSection from "../components/homepage/HomeBanner.jsx";
import TestimonialSection from "../components/homepage/TestimonialSection.jsx";
import Image from "next/image";

export const metadata = {
  title: "Home : Task Manager",
};

export default function Home() {
  return (
    <div>
      {/* banner section  */}

      <BannerSection />
      <FeatureSection />
      <ActionSection />
      <TestimonialSection />
      <ContactForm />
    </div>
  );
}

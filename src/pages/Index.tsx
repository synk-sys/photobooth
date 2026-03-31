import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar transparent />
      <main>
        <Hero />
        <FeatureCards />
        <AboutSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import NavBar from "../components/NavBar";

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;

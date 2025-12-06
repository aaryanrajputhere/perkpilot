import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeroContent } from "./HeroSection/HeroContent";
import { PromoCard } from "./HeroSection/PromoCard";
import { TestimonialsSection } from "./HeroSection/TestimonialsSection";
import Background from "../Background";
import { TrustIndicator } from "./HeroSection/TrustIndicator";
import { UniversalCTAButton } from "../UniversalCTAButton";
import { fetchHomePage } from "../../hooks/useHomePage";

// Default hero data
const defaultHeroData = {
  topTagline: "#1 Platform",
  secondaryText: "For Discounted SaaS Deals",
  mainHeadline: "Build Your Dream.\nWe'll Find The Tools.",
  subHeadline: "Stop searching endlessly. Tell our AI Agent your vision and get an instant, personalized list of all the software you need-with exclusive discounts.",
  ctaText: "Start Exploring Deals & Discounts",
  ctaLink: "",
  heroImage: "",
};

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState(defaultHeroData);

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const homepageData = await fetchHomePage();

        if (homepageData.hero) {
          setHeroData({
            topTagline: homepageData.hero?.topTagline || defaultHeroData.topTagline,
            secondaryText: "For Discounted SaaS Deals",
            mainHeadline: homepageData.hero?.mainHeadline || defaultHeroData.mainHeadline,
            subHeadline: homepageData.hero?.subHeadline || defaultHeroData.subHeadline,
            ctaText: homepageData.hero?.ctaText || defaultHeroData.ctaText,
            ctaLink: homepageData.hero?.ctaLink || defaultHeroData.ctaLink,
            heroImage: homepageData.hero?.heroImage || defaultHeroData.heroImage,
          });
        }
      } catch {
        // Error fetching data, using defaults
      }
    };

    void loadHeroData();
  }, []);

  const handleCTAClick = () => {
    if (heroData.ctaLink) {
      try {
        // Check if it's a full URL (http/https)
        if (heroData.ctaLink.startsWith("http://") || heroData.ctaLink.startsWith("https://")) {
          // Check if it's localhost (internal route) or external
          if (heroData.ctaLink.includes("localhost") || heroData.ctaLink.includes(window.location.hostname)) {
            // Extract the path from full URL for internal navigation
            const url = new URL(heroData.ctaLink);
            navigate(url.pathname);
          } else {
            // External URL - open in new tab
            window.open(heroData.ctaLink, "_blank", "noopener,noreferrer");
          }
        } else if (heroData.ctaLink.startsWith("/")) {
          // Internal route - navigate directly
          navigate(heroData.ctaLink);
        } else {
          // Relative path
          navigate(`/${heroData.ctaLink}`);
        }
      } catch {
        // If URL parsing fails, try to navigate as-is
        navigate(heroData.ctaLink);
      }
    }
  };

  return (
    <section
      className="relative w-full min-h-[80vh] flex flex-col pt-[20px] md:pt-[40px] px-4 md:px-0"
      style={{
        backgroundColor: "#000000",
      }}
    >
      {/* Main Content with animation */}
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-start justify-between w-full gap-[20px] lg:gap-[8px] lg:pl-0 flex-1"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Desktop: Left side content */}
        <motion.div
          className="w-full lg:flex-[6] order-1 lg:order-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <HeroContent
            topTagline={heroData.topTagline}
            secondaryText={heroData.secondaryText}
            mainHeadline={heroData.mainHeadline}
            subHeadline={heroData.subHeadline}
          />

          {/* Desktop: CTA Button and Trust Indicator after HeroContent */}
          <div className="hidden lg:block pl-20">
            {/* CTA Button */}
            <div className="mt-[20px] w-full flex justify-start">
              <UniversalCTAButton
                text={heroData.ctaText}
                icon="arrow"
                variant="primary"
                size="md"
                iconRotation="-rotate-45"
                onClick={handleCTAClick}
              />
            </div>

            {/* Trust Indicator */}
            <div className="mt-[28px] w-full flex justify-start">
              <TrustIndicator />
            </div>
          </div>
        </motion.div>

        {/* PromoCard with animation */}
        <motion.div
          className="w-full lg:flex-[6] relative order-2 lg:order-2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <PromoCard heroImage={heroData.heroImage} />
        </motion.div>

        {/* Mobile: CTA Button and Trust Indicator after PromoCard */}
        <motion.div
          className="lg:hidden w-full order-3 flex flex-col items-center gap-[20px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          {/* CTA Button */}
          <div className="w-full flex justify-center">
            <UniversalCTAButton
              text={heroData.ctaText}
              icon="arrow"
              variant="primary"
              size="md"
              iconRotation="-rotate-45"
              onClick={handleCTAClick}
            />
          </div>

          {/* Trust Indicator */}
          <div className="w-full flex justify-center">
            <TrustIndicator />
          </div>
        </motion.div>
      </motion.div>

      {/* Testimonials Section with animation */}
      <motion.div
        className="relative z-20 w-full py-[20px] md:py-[40px] min-h-[360px]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
      >
        <TestimonialsSection />
      </motion.div>
      {/* Background SVG */}
      <Background />
    </section>
  );
};

export default HeroSection;

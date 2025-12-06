import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Icon Components
const EmailIcon = () => (
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 0H2C0.9 0 0.01 0.9 0.01 2L0 10C0 11.1 0.9 12 2 12H14C15.1 12 16 11.1 16 10V2C16 0.9 15.1 0 14 0ZM14 3L8 7L2 3V2L8 6L14 2V3Z"
      fill="#FAFAFA"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 13.75V16.25C17.5 17.2165 16.7165 18 15.75 18H4.25C3.2835 18 2.5 17.2165 2.5 16.25V3.75C2.5 2.7835 3.2835 2 4.25 2H15.75C16.7165 2 17.5 2.7835 17.5 3.75V6.25M12.5 1.25V3.75M7.5 1.25V3.75M2.5 6.25H17.5"
      stroke="#FAFAFA"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 13.75C12.5 14.1642 12.1642 14.5 11.75 14.5H8.25C7.83579 14.5 7.5 14.1642 7.5 13.75V10.25C7.5 9.83579 7.83579 9.5 8.25 9.5H11.75C12.1642 9.5 12.5 9.83579 12.5 10.25V13.75Z"
      stroke="#FAFAFA"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.6 18 2 14.4 2 10C2 5.6 5.6 2 10 2C14.4 2 18 5.6 18 10C18 14.4 14.4 18 10 18ZM10.5 5H9V11L14.25 14.15L15 12.9L10.5 10.25V5Z"
      fill="#FAFAFA"
    />
  </svg>
);

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="#FAFAFA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface TermsSection {
  id: string;
  title: string;
  content: string;
}

const termsSections: TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content:
      "By using PerkPilot, you agree to comply with these Terms and confirm that you are at least 18 years old or the age of majority in your jurisdiction.",
  },
  {
    id: "nature",
    title: "Nature of Services",
    content:
      "PerkPilot is a deal review and comparison platform that provides: Reviews of products, services, and deals. Comparisons between brands, platforms, or offers. Access to third-party promotions, discounts, and affiliate links. We do not sell products or services directly. Instead, we connect you to third-party merchants.",
  },
  {
    id: "accuracy",
    title: "Accuracy of Information",
    content:
      "While we strive to provide accurate and up-to-date deal information, we cannot guarantee: Availability of any offer or coupon. Accuracy of prices, features, or discounts displayed. That third-party sites are free from errors or changes. Users should verify details directly with merchants before making purchases.",
  },
  {
    id: "affiliate",
    title: "Affiliate Disclosure",
    content:
      "Some links on PerkPilot may be affiliate links, meaning we may earn a commission if you make a purchase through those links. This comes at no extra cost to you.",
  },
  {
    id: "user-content",
    title: "User-Generated Content",
    content:
      "Users may post reviews, ratings, or comments. By doing so, you agree that: Content must be honest, lawful, and not infringe on others' rights. PerkPilot reserves the right to remove or moderate content at its discretion. By submitting content, you grant us a worldwide, royalty-free license to display and share it on our platform.",
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    content:
      "All original content, reviews, designs, and branding on PerkPilot belong to us. You may not copy, redistribute, or use our content without prior permission.",
  },
  {
    id: "third-party",
    title: "Third-Party Links & Offers",
    content:
      "PerkPilot includes links to third-party websites and promotions. We are not responsible for: The accuracy, reliability, or availability of third-party services. Any transactions between you and third-party merchants.",
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content:
      "PerkPilot provides content 'as is' without warranties. We are not liable for: Lost savings, expired deals, or inaccurate information. Damages resulting from use of third-party products, services, or websites.",
  },
  {
    id: "prohibited",
    title: "Prohibited Use",
    content:
      "You agree not to: Use PerkPilot for fraudulent or unlawful purposes. Attempt to scrape, copy, or misuse our content. Post misleading, false, or harmful reviews.",
  },
  {
    id: "termination",
    title: "Termination of Use",
    content:
      "We may suspend or terminate your access to PerkPilot at any time if you violate these Terms or engage in harmful activity.",
  },
  {
    id: "governing",
    title: "Governing Law",
    content:
      "These Terms shall be governed by the laws of [Insert Jurisdiction]. Any disputes shall be resolved in the courts of [Insert Location].",
  },
  {
    id: "updates",
    title: "Updates to Terms",
    content:
      "We may update these Terms from time to time. Continued use of PerkPilot after updates constitutes your acceptance of the revised Terms.",
  },
  {
    id: "contact",
    title: "Contact Us",
    content:
      "For questions regarding these Terms, please contact:",
  },
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState<string>("acceptance");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const section = termsSections.find((s) => s.id === hash);
      if (section) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = termsSections.map((item) => item.id);
      const scrollPosition = window.scrollY + 150; 
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveSection(sections[i]);
            window.history.replaceState(null, "", `#${sections[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const handleSectionClick = (sectionId: string) => {
    setIsScrolling(true);
    setActiveSection(sectionId);
    window.history.pushState(null, "", `#${sectionId}`);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black relative w-full">
      <Header />
      <div className="pt-[80px]">
        {/* Hero Section with Gradient Background */}
        <div 
          className="relative w-full h-[300px] md:h-[361px]"
          style={{
            background: "linear-gradient(180deg, #000000 0%, #764BE0 147.34%)"
          }}
        >
          <div className="absolute left-[20px] right-[20px] md:left-[100px] md:right-auto top-[80px] md:top-[90px] flex flex-col gap-[16px] md:gap-[24px] max-w-[565px] md:pr-[20px] text-center md:text-left">
            <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[28px] md:text-[40px] leading-[36px] md:leading-[52px] text-[#FAFAFA] capitalize">
              Terms And Conditions
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#E4E4E7]">
              Welcome to PerkPilot! These Terms and Conditions ("Terms") govern
              your use of our website, deal review services, and comparison
              platform ("Services"). By accessing or using PerkPilot, you agree
              to these Terms.
            </p>
            <p className="font-['Plus_Jakarta_Sans'] font-medium text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-[#E4E4E7]">
              Last Updated: October 1st 2025
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative w-full px-[20px] md:px-[100px] py-[40px] md:py-[80px]">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-[40px] md:gap-[60px]">
            {/* Mobile: Table of Contents - Above Content */}
            <div className="lg:hidden w-full">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="w-full flex items-center justify-between pb-[16px] border-b border-[#3F3F46] mb-[20px]"
              >
                <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] leading-[32px] text-[#FAFAFA]">
                  Table of Content
                </h3>
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <ChevronIcon isOpen={isTocOpen} />
                </div>
              </button>
              {isTocOpen && (
                <div className="flex flex-col gap-[24px] mb-[40px]">
                  {termsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        handleSectionClick(section.id);
                        setIsTocOpen(false);
                      }}
                      className="flex items-center gap-[8px] text-left hover:opacity-80 transition-opacity w-full"
                    >
                      <div className="w-[24px] h-[24px] flex-shrink-0 relative">
                        {activeSection === section.id ? (
                          <>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2]"></div>
                            <div className="absolute inset-[10%] rounded-full border bg-gradient-to-b from-[#501BD6] to-[#7F57E2]"></div>
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 rounded-full border-2 border-[#A1A1AA]"></div>
                            <div className="absolute inset-[10%] rounded-full  border-[#A1A1AA]"></div>
                          </>
                        )}
                      </div>
                      <span
                        className={`font-['Plus_Jakarta_Sans'] font-medium text-[18px] leading-[27px] ${
                          activeSection === section.id
                            ? "text-[#FAFAFA]"
                            : "text-[#A1A1AA]"
                        }`}
                      >
                        {section.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: Left Column - Table of Contents */}
            <div className="hidden lg:block w-[397px] flex-shrink-0 lg:sticky lg:top-[120px] h-fit">
              <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[32px] leading-[42px] text-[#FAFAFA] mb-[24px]">
                Table of Content
              </h3>
              <div className="flex flex-col gap-[24px]">
                {termsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className="flex items-center gap-[8px] text-left hover:opacity-80 transition-opacity w-full"
                  >
                    <div className="w-[24px] h-[24px] flex-shrink-0 relative">
                      {activeSection === section.id ? (
                        <>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2]"></div>
                          <div className="absolute inset-[10%] rounded-full border bg-gradient-to-b from-[#501BD6] to-[#7F57E2]"></div>
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 rounded-full border-2 border-[#A1A1AA]"></div>
                          <div className="absolute inset-[10%] rounded-full  border-[#A1A1AA]"></div>
                        </>
                      )}
                    </div>
                    <span
                      className={`font-['Plus_Jakarta_Sans'] font-medium text-[18px] leading-[27px] ${
                        activeSection === section.id
                          ? "text-[#FAFAFA]"
                          : "text-[#A1A1AA]"
                      }`}
                    >
                      {section.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Terms Content */}
            <div className="flex-1 flex flex-col gap-[40px] md:gap-[60px]">
              {termsSections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="flex flex-col gap-[12px] md:gap-[16px] scroll-mt-[100px]"
                >
                  <div className="flex items-start gap-[12px] md:gap-[16px]">
                    <div className="w-[32px] h-[32px] md:w-[40px] md:h-[40px] rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                      <span className="font-['Plus_Jakarta_Sans'] font-medium text-[18px] md:text-[24px] leading-[24px] md:leading-[32px] text-[#FAFAFA]">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] md:text-[32px] leading-[32px] md:leading-[42px] text-[#FAFAFA]">
                      {section.title}
                    </h3>
                  </div>
                  {section.id === "contact" ? (
                    <div className="flex flex-col gap-[12px] md:gap-[16px]">
                      <p className="font-['Poppins'] font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#D4D4D8]">
                        {section.content}
                      </p>
                      <div className="flex flex-col gap-[12px] md:gap-[16px]">
                        {/* Email */}
                        <div className="flex items-center gap-[10px] md:gap-[14px] flex-wrap">
                          <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                            <EmailIcon />
                          </div>
                          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] text-[#FAFAFA]">
                            Email Address: info@dealyouneed.com
                          </span>
                        </div>
                        {/* Phone */}
                        <div className="flex items-center gap-[10px] md:gap-[12px] flex-wrap">
                          <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                            <PhoneIcon />
                          </div>
                          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] text-[#FAFAFA]">
                            Phone Number: 971+ 504253842
                          </span>
                        </div>
                        {/* Business Hours */}
                        <div className="flex items-center gap-[10px] md:gap-[12px] flex-wrap">
                          <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                            <ClockIcon />
                          </div>
                          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] text-[#FAFAFA]">
                            Business Hours: Monday - Friday: 9:00 AM - 6:00 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="font-['Poppins'] font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#D4D4D8]">
                      {section.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}


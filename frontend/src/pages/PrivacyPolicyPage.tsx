import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Icon components
function EmailIcon() {
  return (
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
}

function PhoneIcon() {
  return (
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
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.25 14.15L15 12.92L10.5 10.25V5Z"
        fill="#FAFAFA"
      />
    </svg>
  );
}

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

interface TableOfContentItem {
  id: string;
  label: string;
}

const tableOfContents: TableOfContentItem[] = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "cookies-tracking", label: "Cookies & Tracking Technologies" },
  { id: "sharing-information", label: "Sharing of Information" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights", label: "Your Rights" },
  { id: "children-privacy", label: "Children's Privacy" },
  { id: "changes-policy", label: "Changes to this Privacy Policy" },
  { id: "contact-us", label: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("information-we-collect");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const section = tableOfContents.find((s) => s.id === hash);
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
      if (isScrolling) return; // Don't update during programmatic scroll

      const sections = tableOfContents.map((item) => item.id);
      const scrollPosition = window.scrollY + 150; // Offset for header

      // Find the section that's currently in view
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
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black">
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
              Privacy Policy
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#E4E4E7]">
              We values your privacy. This Privacy Policy explains how we
              collect, use, and protect your information when you use our website
              and services.
            </p>
            <p className="font-['Plus_Jakarta_Sans'] font-medium text-[12px] md:text-[14px] leading-[18px] md:leading-[21px] text-[#E4E4E7]">
              Last Updated: October 1st 2025
            </p>
          </div>
        </div>

        {/* Main Content Container */}
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
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleSectionClick(item.id);
                        setIsTocOpen(false);
                      }}
                      className="flex items-center gap-[8px] text-left hover:opacity-80 transition-opacity w-full"
                    >
                      <div className="w-[24px] h-[24px] flex-shrink-0 relative">
                        {activeSection === item.id ? (
                          <>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2]"></div>
                            <div className="absolute inset-[10%] rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2]"></div>
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 rounded-full border-2 border-[#A1A1AA]"></div>
                            <div className="absolute inset-[10%] rounded-full border border-[#A1A1AA]"></div>
                          </>
                        )}
                      </div>
                      <span
                        className={`font-['Plus_Jakarta_Sans'] font-medium text-[18px] leading-[27px] ${
                          activeSection === item.id
                            ? "text-[#FAFAFA]"
                            : "text-[#A1A1AA]"
                        }`}
                      >
                        {item.label}
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
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id)}
                    className="flex items-center gap-[8px] text-left hover:opacity-80 transition-opacity w-full"
                  >
                    <div className="w-[24px] h-[24px] flex-shrink-0 relative">
                      {activeSection === item.id ? (
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
                        activeSection === item.id
                          ? "text-[#FAFAFA]"
                          : "text-[#A1A1AA]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content - Right Side */}
            <div className="flex-1 w-full lg:max-w-[819px] flex flex-col gap-8 sm:gap-12 lg:gap-[60px]">
            {/* Section 1: Information We Collect */}
            <section
              id="information-we-collect"
              className="flex flex-col gap-4 scroll-mt-[120px]"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    1
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Information We Collect
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  We may collect the following types of information:
                </p>
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8] mt-4">
                  <strong className="text-[#FAFAFA]">Personal Information:</strong>{" "}
                  When you sign up for newsletters, create an account, or contact
                  us (e.g., name, email address).
                </p>
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8] mt-4">
                  <strong className="text-[#FAFAFA]">Non-Personal Information:</strong>{" "}
                  Data such as browser type, device, IP address, and usage
                  patterns.
                </p>
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8] mt-4">
                  <strong className="text-[#FAFAFA]">Cookies & Tracking:</strong> We
                  use cookies, affiliate tracking codes, and analytics tools to
                  improve user experience and measure performance.
                </p>
              </div>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section id="how-we-use" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    2
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  How We Use Your Information
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  We may use the collected information to:
                </p>
                <ul className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] text-[#D4D4D8] mt-4 pl-6 list-disc list-outside space-y-0">
                  <li className="mb-[24px]">Provide and improve our Services.</li>
                  <li className="mb-[24px]">
                    Send newsletters, deal alerts, or promotional content (if you
                    subscribe).
                  </li>
                  <li className="mb-[24px]">Track affiliate referrals and generate commissions.</li>
                  <li className="mb-[24px]">Analyze traffic and user behavior.</li>
                  <li>Respond to inquiries or customer support requests.</li>
                </ul>
              </div>
            </section>

            {/* Section 3: Cookies & Tracking Technologies */}
            <section id="cookies-tracking" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    3
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Cookies & Tracking Technologies
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  PerkPilot uses cookies and third-party tracking (including
                  affiliate networks like Impact, Partnerize, or CJ Affiliate).
                  These may collect information about your browsing behavior to
                  track purchases and ensure proper deal attribution. You can
                  disable cookies in your browser settings, but some features may
                  not function properly.
                </p>
              </div>
            </section>

            {/* Section 4: Sharing of Information */}
            <section id="sharing-information" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    4
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Sharing of Information
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  We do not sell your personal information. However, we may share
                  information with:
                </p>
                <ul className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] text-[#D4D4D8] mt-4 pl-6 list-disc list-outside space-y-0">
                  <li className="mb-[24px]">
                    <strong className="text-[#FAFAFA]">Affiliate Partners & Advertisers:</strong>{" "}
                    To track sales, validate commissions, and display relevant
                    offers.
                  </li>
                  <li className="mb-[24px]">
                    <strong className="text-[#FAFAFA]">Analytics Providers:</strong> Such as
                    Google Analytics, to understand site usage.
                  </li>
                  <li className="mb-[24px]">
                    <strong className="text-[#FAFAFA]">Service Providers:</strong> For email
                    delivery, hosting, or technical support.
                  </li>
                  <li>
                    <strong className="text-[#FAFAFA]">Legal Compliance:</strong> If required by
                    law or government request.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5: Third-Party Links */}
            <section id="third-party-links" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    5
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Third-Party Links
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  PerkPilot includes links to third-party websites and offers. We
                  are not responsible for the privacy practices of these sites.
                  Please review their policies before providing personal
                  information.
                </p>
              </div>
            </section>

            {/* Section 6: Data Security */}
            <section id="data-security" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    6
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Data Security
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  We use reasonable measures to protect your information from
                  unauthorized access, alteration, or disclosure. However, no
                  online transmission is 100% secure.
                </p>
              </div>
            </section>

            {/* Section 7: Your Rights */}
            <section id="your-rights" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    7
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Your Rights
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  Depending on your jurisdiction, you may have rights under laws
                  like GDPR or CCPA, including:
                </p>
                <ul className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] text-[#D4D4D8] mt-4 pl-6 list-disc list-outside space-y-0">
                  <li className="mb-[24px]">Accessing the personal data we hold about you.</li>
                  <li className="mb-[24px]">Requesting corrections or deletion of your data.</li>
                  <li className="mb-[24px]">Opting out of promotional emails at any time.</li>
                  <li>Disabling cookies or ad tracking.</li>
                </ul>
                <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8] mt-4">
                  To exercise these rights, contact us at{" "}
                  <a
                    href="mailto:info@dealyouneed.com"
                    className="text-[#FAFAFA] underline hover:opacity-80"
                  >
                    info@dealyouneed.com
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Section 8: Children's Privacy */}
            <section id="children-privacy" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    8
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Children's Privacy
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  PerkPilot is not intended for children under 13 (or under 16 in
                  some regions). We do not knowingly collect personal data from
                  minors.
                </p>
              </div>
            </section>

            {/* Section 9: Changes to this Privacy Policy */}
            <section id="changes-policy" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    9
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Changes to this Privacy Policy
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8]">
                  We may update this Privacy Policy from time to time. The "Last
                  Updated" date will be revised accordingly. Continued use of
                  PerkPilot after changes means you accept the updated policy.
                </p>
              </div>
            </section>

            {/* Section 10: Contact Us */}
            <section id="contact-us" className="flex flex-col gap-4 scroll-mt-[120px]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[20px] sm:text-[24px] leading-[28px] sm:leading-[32px] text-[#FAFAFA]">
                    10
                  </span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] leading-[32px] sm:leading-[38px] lg:leading-[42px] text-[#FAFAFA]">
                  Contact Us
                </h2>
              </div>
              <div className="ml-0 sm:ml-[56px]">
                <p className="font-['Poppins'] font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-[#D4D4D8] mb-4">
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-[14px] flex-wrap">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                      <EmailIcon />
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[28px] lg:leading-[32px] text-[#FAFAFA]">
                      Email Address:{" "}
                      <a
                        href="mailto:info@dealyouneed.com"
                        className="underline hover:opacity-80"
                      >
                        info@dealyouneed.com
                      </a>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                      <PhoneIcon />
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[28px] lg:leading-[32px] text-[#FAFAFA]">
                      Phone Number: 971+ 504253842
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#501BD6] to-[#7F57E2] flex items-center justify-center flex-shrink-0">
                      <ClockIcon />
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-[24px] sm:leading-[28px] lg:leading-[32px] text-[#FAFAFA]">
                      Business Hours: Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


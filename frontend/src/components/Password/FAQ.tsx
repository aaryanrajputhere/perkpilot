import { useState } from "react";
import { UniversalBadge } from "../UniversalBadge";

const DEFAULT_FAQS = [
  {
    id: "free-to-use",
    q: "Is the invoice generator actually free to use?",
    a: "Yes! You can create and download an unlimited number of professional invoices at absolutely no cost. We aim to support freelancers and small businesses with this essential tool.",
  },
  {
    id: "legal-compliance",
    q: "Are the invoices professional and legally compliant?",
    a: "Yes, our invoice templates are designed to meet standard business and legal requirements, ensuring professionalism and compliance across industries.",
  },
  {
    id: "creation-time",
    q: "How long does it take to create a new invoice?",
    a: "Creating a new invoice takes only a few minutes. Simply enter your details, review the preview, and download your professional invoice instantly.",
  },
  {
    id: "data-safety",
    q: "Is my client and business data safe?",
    a: "Absolutely. Your data is securely processed and never shared with third parties. We prioritize the privacy and protection of all business and client information.",
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(DEFAULT_FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center my-20">
      <UniversalBadge
        badgeText="#1 Platform"
        secondaryText="FAQs"
        icon="electric"
        className=""
        variant="primary"
        size="md"
      />
      <div
        data-layer="Frame 2147223642"
        className="Frame2147223642 w-full max-w-[818px] inline-flex flex-col justify-start items-center gap-10"
      >
        <div
          data-layer="Frame 2147206341"
          className="Frame2147206341 self-stretch flex flex-col justify-start items-center gap-10"
        >
          <div
            data-layer="Frame 2147206152"
            className="Frame2147206152 self-stretch flex flex-col justify-start items-center gap-6"
          >
            <div
              data-layer="Frequently Asked Questions"
              className="FrequentlyAskedQuestions self-stretch text-center justify-start text-white text-5xl font-semibold font-['Plus_Jakarta_Sans'] capitalize leading-[60px]"
            >
              Frequently Asked Questions
            </div>
          </div>
        </div>

        <div
          data-layer="Cards"
          className="Cards w-full max-w-[808px] flex flex-col justify-start items-start gap-4"
        >
          <div
            data-layer="Questions"
            className="Questions self-stretch flex flex-col justify-center items-start gap-4 w-full"
          >
            {DEFAULT_FAQS.map((faq) => {
              const expanded = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  data-layer={`Card-${faq.id}`}
                  className="Card self-stretch p-6 bg-white/10 rounded-3xl flex flex-col justify-start items-start gap-4 overflow-hidden w-full"
                >
                  <div className="w-full flex items-center justify-between gap-4">
                    <button
                      onClick={() => toggle(faq.id)}
                      aria-expanded={expanded}
                      aria-controls={`${faq.id}-panel`}
                      className="flex-1 text-left text-neutral-50 text-xl font-medium font-['Plus_Jakarta_Sans']"
                    >
                      {faq.q}
                    </button>

                    <div className="w-8 h-8 flex items-center justify-center">
                      {expanded ? (
                        <svg
                          width="16"
                          height="2"
                          viewBox="0 0 16 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="16" height="2" fill="#FAFAFA" rx="1" />
                        </svg>
                      ) : (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 1v10M1 6h10"
                            stroke="#FAFAFA"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div
                    id={`${faq.id}-panel`}
                    role="region"
                    aria-labelledby={faq.id}
                    className={`mt-4 text-zinc-300 text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal ${
                      expanded ? "block" : "hidden"
                    }`}
                  >
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductFeaturesProps {
  features?: Array<{ title: string; description?: string; _id?: string }>;
  keyFeatures?: string[];
}

export default function ProductFeatures({
  features,
  keyFeatures,
}: ProductFeaturesProps) {
  const displayFeatures =
    features && features.length > 0
      ? features
      : keyFeatures && keyFeatures.length > 0
      ? keyFeatures.map((title, index) => ({
          title,
          description: "",
          _id: `${index}`,
        }))
      : [
          {
            title: "Real-time collaboration",
            description: "Multiple users can edit simultaneously.",
            _id: "1",
          },
          {
            title: "Advanced Security",
            description: "Enterprise-grade encryption and compliance.",
            _id: "2",
          },
          {
            title: "Seamless Integration",
            description: "Connects with your favorite tools and platforms.",
            _id: "3",
          },
          {
            title: "24/7 Support",
            description: "Round-the-clock assistance from our expert team.",
            _id: "4",
          },
        ];

  return (
    <div
      data-layer="Frame 2147206296"
      className="Frame2147206296 w-full max-w-[350px] md:max-w-[1240px] flex flex-col items-end"
      style={{ gap: "12px" }}
    >
      <style>{`
        @media (min-width: 768px) {
          .Frame2147206296 {
            gap: 24px !important;
          }
          .Frame2147206310 {
            padding: 16px 24px !important;
            min-height: 100px !important;
            gap: 169px !important;
          }
          .Frame2147206309 {
            gap: 12px !important;
            width: 100% !important;
            flex: 1 !important;
            min-width: 0 !important;
          }
          .RealTimeCollaboration {
            font-size: 24px !important;
            line-height: 32px !important;
            width: 100% !important;
            max-height: none !important;
            overflow: visible !important;
            white-space: normal !important;
          }
          .MultipleUsersCanEditSimultaneously {
            font-size: 16px !important;
            line-height: 24px !important;
            font-weight: 400 !important;
            color: #FFFFFF !important;
            text-align: left !important;
            width: 100% !important;
          }
          .PerksPage {
            width: 56px !important;
            height: 56px !important;
            min-width: 56px !important;
          }
          .PerksPage svg {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
      {displayFeatures.map((feature, index) => (
        <div
          key={feature._id || `feature-${index}`}
          data-layer="Frame 2147206310"
          className="Frame2147206310 box-border w-full max-w-[350px] md:max-w-[1240px] flex flex-row justify-between items-center bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] rounded-2xl md:rounded-[24px]"
          style={{
            padding: "12px 16px",
            gap: "8px",
            minHeight: "82px",
          }}
        >
          <div
            data-layer="Frame 2147206309"
            className="Frame2147206309 flex flex-col items-start flex-1 min-w-0 w-full"
            style={{ gap: "10px" }}
          >
            <div
              data-layer="Real-time collaboration"
              className="RealTimeCollaboration text-[#FAFAFA] font-['Plus_Jakarta_Sans'] font-medium break-words"
              style={{
                fontSize: "18px",
                lineHeight: "27px",
                width: "100%",
              }}
            >
              {feature.title}
            </div>
            {feature.description && (
              <div
                data-layer="Multiple users can edit simultaneously."
                className="MultipleUsersCanEditSimultaneously text-[#D4D4D8] md:text-white font-['Plus_Jakarta_Sans'] font-medium md:font-normal text-left break-words"
                style={{
                  fontSize: "14px",
                  lineHeight: "21px",
                  width: "100%",
                }}
              >
                {feature.description}
              </div>
            )}
          </div>
          <div
            data-layer="Perks Page"
            className="PerksPage relative bg-white rounded-full flex-none shrink-0 flex items-center justify-center"
            style={{
              width: "32px",
              height: "32px",
              minWidth: "32px",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full md:w-10 md:h-10"
            >
              <path
                d="M5 10L8 13L15 6"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 6L8 9L15 2"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

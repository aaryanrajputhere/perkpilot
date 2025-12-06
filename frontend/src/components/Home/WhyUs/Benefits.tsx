import React from "react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface BenefitsProps {
  benefits?: Benefit[];
}

// Calendar Icon
const CalendarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <path
      d="M2 19.0898V5.08984C2 3.98527 2.89543 3.08984 4 3.08984H20C21.1046 3.08984 22 3.98527 22 5.08984V19.0898C22 20.1944 21.1046 21.0898 20 21.0898H4C2.89543 21.0898 2 20.1944 2 19.0898Z"
      stroke="white"
      strokeWidth="1.5"
    />
    <path
      d="M2 7.08984L22 7.08984"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5.09984L5.01 5.08873"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 5.09984L8.01 5.08873"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 5.09984L11.01 5.08873"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const defaultBenefits: Benefit[] = [
  {
    icon: <CalendarIcon />,
    title: "Expert Reviews",
    description:
      "In-depth analysis from software professionals with real-world experience.",
  },
  {
    icon: <CalendarIcon />,
    title: "Training Tools",
    description:
      "Learn how to use software effectively with our comprehensive guides.",
  },
  {
    icon: <CalendarIcon />,
    title: "Community Driven",
    description:
      "Real user feedback and experiences from our active community.",
  },
  {
    icon: <CalendarIcon />,
    title: "Quick Comparisons",
    description:
      "Side-by-side tool comparisons to help you make informed decisions",
  },
];

const Benefits: React.FC<BenefitsProps> = ({ benefits = defaultBenefits }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 mt-12 w-full max-w-6xl justify-items-center">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="bg-[#0c071b] border border-[#311a6b] border-solid flex flex-col gap-[16px] items-start p-[24px] rounded-[24px] w-full max-w-[292px] h-[232px]"
        >
          {/* Icon Container */}
          <div className="bg-gradient-to-b from-[#501bd6] to-[#7f57e2] p-[2px] rounded-full w-[48px] h-[48px] flex items-center justify-center shrink-0">
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              {benefit.icon}
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-col gap-[12px] items-start flex-1 w-full">
            {/* Title */}
            <h3 className="font-['Inter'] font-medium text-[24px] leading-[36px] text-[#FFF] text-left self-stretch">
              {benefit.title}
            </h3>

            {/* Description */}
            <p className="font-['Poppins'] font-normal text-[16px] leading-[24px] text-[#ebeff5] text-left self-stretch">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Benefits;

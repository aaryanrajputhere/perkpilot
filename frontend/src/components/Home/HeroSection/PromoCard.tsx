import React from "react";
import { AppIcon } from "./AppIcon";
import { CursorPointer } from "./CursorPointer";
import {
  imgDeviconSlack,
  imgDeviconFigma,
  imgLogosAirtable,
  imgLogosLoomIcon,
  imgDeviconFramermotion,
  imgSkillIconsWebflow,
  imgHugeIconsChatGPT,
  image as fallbackImage,
} from "./assets";

interface PromoCardProps {
  heroImage?: string;
}

const WhiteCircleLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 41 41"
    fill="none"
    className={className}
  >
    <defs>
      <linearGradient
        id="lightningGradient"
        x1="14.1162"
        y1="1.46191"
        x2="14.1162"
        y2="26.4619"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#501BD6" />
        <stop offset="1" stopColor="#7F57E2" />
      </linearGradient>
    </defs>

    {/* White circle background */}
    <circle cx="20.1162" cy="20.9619" r="20" fill="#FAFAFA" />

    {/* Lightning bolt centered in the circle */}
    <g transform="translate(6.5, 7.5)">
      <path
        d="M20.3662 11.6182H14.1162V1.46191L7.86621 16.3057H14.1162V26.4619L20.3662 11.6182Z"
        fill="url(#lightningGradient)"
      />
    </g>
  </svg>
);

// Circle bullet point component
const CircleBulletPoint: React.FC<{ size?: number; className?: string }> = ({
  size = 12,
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 21 21"
    fill="none"
    className={className}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      aspectRatio: "1/1",
    }}
  >
    <circle cx="10.8008" cy="10.4619" r="6" fill="white" />
    <circle
      cx="10.8008"
      cy="10.4619"
      r="8"
      stroke="white"
      strokeOpacity="0.12"
      strokeWidth="4"
    />
  </svg>
);

export const PromoCard: React.FC<PromoCardProps> = ({ heroImage }) => {
  const imageSrc = heroImage || fallbackImage;

  return (
    <div
      className="bg-[#672bff] overflow-clip relative rounded-[40px] xl:rounded-none xl:rounded-tl-[40px] xl:rounded-bl-[40px] w-full h-[600px] md:h-[524px]"
      data-node-id="1:1142"
    >
      <div
        className="absolute bg-[#7f57e3] h-[48px] md:h-[72px] left-0 top-[552px] md:top-[452px] w-full"
        data-node-id="1:1143"
      />

      {/* Main Content */}
      <div
        className="absolute content-stretch flex flex-col gap-[16px] md:gap-[24px] items-start left-[20px] md:left-[24.8px] top-6 md:top-10"
        data-node-id="1:1144"
      >
        <div
          className="capitalize font-['Plus_Jakarta_Sans'] font-bold leading-[28px] md:leading-[42px] relative shrink-0 text-[24px] md:text-[32px] w-[300px] md:w-[500.704px] "
          data-node-id="1:1145"
          style={{
            color: "var(--Primary-25, #FAFAFA)",
            fontFamily: "Plus Jakarta Sans",
            fontSize: "32px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "42px",
            textTransform: "capitalize",
          }}
        >
          <p className="whitespace-pre-wrap w-[350px] text-[21px] leading-[28px] md:w-[450px] md:text-[32px] md:leading-[42px]">{`Best Deals, Reviews, & Comparisons of all SaaS Tools`}</p>
        </div>

        {/* Feature List */}
        <div
          className="content-stretch flex flex-col gap-[12px] md:gap-[16px] items-start relative shrink-0 w-full"
          data-node-id="1:1146"
        >
          <div
            className="content-stretch flex gap-[6px] md:gap-[8px] items-center relative shrink-0 w-full"
            data-node-id="1:1147"
          >
            <div
              className="relative shrink-0 size-[14px] md:size-[18px]"
              data-node-id="1:1148"
            >
              <CircleBulletPoint size={14} className="md:hidden" />
              <CircleBulletPoint size={18} className="hidden md:block" />
            </div>
            <div
              className="bg-white box-border content-stretch flex gap-[12px] md:gap-[16px] items-center justify-center px-[12px] md:px-[16px] py-[6px] md:py-[8px] relative rounded-[100px] shrink-0"
              data-name="Buttons/main"
              data-node-id="1:1149"
            >
              <div
                aria-hidden="true"
                className="absolute border border-[rgba(235,239,245,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]"
              />
              <div
                className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[12px] md:text-[14px] text-center text-zinc-950 whitespace-nowrap"
                data-node-id="1:1150"
              >
                <p className="leading-[18px] md:leading-[21px]">
                  Find & Redeem Exclusive SaaS Deals
                </p>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex gap-[6px] md:gap-[8px] items-center relative shrink-0 w-full"
            data-node-id="1:1151"
          >
            <div
              className="relative shrink-0 size-[14px] md:size-[18px]"
              data-node-id="1:1152"
            >
              <CircleBulletPoint size={14} className="md:hidden" />
              <CircleBulletPoint size={18} className="hidden md:block" />
            </div>
            <div
              className="bg-white box-border content-stretch flex gap-[12px] md:gap-[16px] items-center justify-center px-[12px] md:px-[16px] py-[6px] md:py-[8px] relative rounded-[100px] shrink-0"
              data-name="Buttons/main"
              data-node-id="1:1153"
            >
              <div
                aria-hidden="true"
                className="absolute border border-[rgba(235,239,245,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]"
              />
              <div
                className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[12px] md:text-[14px] text-center text-zinc-950 whitespace-nowrap"
                data-node-id="1:1154"
              >
                <p className="leading-[18px] md:leading-[21px]">
                  Read Real Reviews On All The SaaS Tools
                </p>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex gap-[6px] md:gap-[8px] items-center relative shrink-0 w-full"
            data-node-id="1:1155"
          >
            <div
              className="relative shrink-0 size-[14px] md:size-[18px]"
              data-node-id="1:1156"
            >
              <CircleBulletPoint size={14} className="md:hidden" />
              <CircleBulletPoint size={18} className="hidden md:block" />
            </div>
            <div
              className="bg-white box-border content-stretch flex gap-[12px] md:gap-[16px] items-center justify-center px-[12px] md:px-[16px] py-[6px] md:py-[8px] relative rounded-[100px] shrink-0"
              data-name="Buttons/main"
              data-node-id="1:1157"
            >
              <div
                aria-hidden="true"
                className="absolute border border-[rgba(235,239,245,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]"
              />
              <div
                className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[12px] md:text-[14px] text-center text-zinc-950 whitespace-nowrap"
                data-node-id="1:1158"
              >
                <p className="leading-[18px] md:leading-[21px]">
                  Tools Comparisons Details
                </p>
              </div>
            </div>
          </div>
          <div
            className="content-stretch flex gap-[6px] md:gap-[8px] items-center relative shrink-0 w-full"
            data-node-id="1:1159"
          >
            <div
              className="relative shrink-0 size-[14px] md:size-[18px]"
              data-node-id="1:1160"
            >
              <CircleBulletPoint size={14} className="md:hidden" />
              <CircleBulletPoint size={18} className="hidden md:block" />
            </div>
            <div
              className="bg-white box-border content-stretch flex gap-[12px] md:gap-[16px] items-center justify-center px-[12px] md:px-[16px] py-[6px] md:py-[8px] relative rounded-[100px] shrink-0"
              data-name="Buttons/main"
              data-node-id="1:1161"
            >
              <div
                aria-hidden="true"
                className="absolute border border-[rgba(235,239,245,0.12)] border-solid inset-0 pointer-events-none rounded-[100px]"
              />
              <div
                className="font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium leading-[0] relative shrink-0 text-[12px] md:text-[14px] text-center text-zinc-950 whitespace-nowrap"
                data-node-id="1:1162"
              >
                <p className="leading-[18px] md:leading-[21px]">
                  SaaS Tool Stacks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Logo */}
      <div
        className="hidden absolute xl:flex flex-row gap-[12px] items-center right-[24.88px] top-[40.96px]"
        data-node-id="1:1221"
      >
        <div className="relative shrink-0 size-[40px]" data-node-id="1:1222">
          <WhiteCircleLogo size={40} />
        </div>
        <div
          className="font-['Plus_Jakarta_Sans'] font-bold leading-[32px] relative shrink-0 text-[24px] text-neutral-50 whitespace-nowrap"
          data-node-id="1:1226"
        >
          <p>PerkPilot</p>
        </div>
      </div>

      {/* Background Image with Floating App Icons */}
      <div
        className="absolute bottom-0 h-[280px] md:h-[370.932px] w-[335px] md:w-[446.743px] md:right-[10px] left-1/2 -translate-x-1/2 md:-translate-x-[20%]"
        data-name="freepik__background__12008 1"
        data-node-id="1:1243"
      >
        {/* Floating App Icons - positioned in a circle for mobile */}
        <AppIcon
          src={imgDeviconSlack}
          className="absolute left-[0px] top-[80px] md:left-[0px] md:top-[272px] z-0"
        />
        <AppIcon
          src={imgLogosAirtable}
          className="absolute left-[40px] top-[80px] md:left-[25px] md:top-[125px] z-0"
        />
        <AppIcon
          src={imgLogosLoomIcon}
          className="absolute left-[40px] top-[-100px] md:left-[75px] md:top-[-25px] z-0"
        />
        <AppIcon
          src={imgDeviconFramermotion}
          className="absolute left-[110px] top-[-200px] md:left-[150px] md:top-[-175px] z-0"
        />
        <AppIcon
          src={imgHugeIconsChatGPT}
          className="absolute left-[200px] top-[-255px] md:left-[260px] md:top-[-225px] z-0"
        />
        <AppIcon
          src={imgSkillIconsWebflow}
          className="absolute left-[255px] top-[-260px] md:left-[340px] md:top-[-200px] z-0"
        />
        <AppIcon
          src={imgDeviconFigma}
          className="absolute left-[285px] top-[-255px] md:left-[375px] md:top-[-160px] z-0"
        />
        <AppIcon
          src={imgLogosAirtable}
          className="absolute left-[250px] top-[-250px] md:left-[400px] md:top-[-138px] z-0"
        />

        <img
          alt=""
          className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full z-10"
          src={imageSrc}
        />
      </div>

      {/* Cursor with Text */}
      <div
        className="hidden absolute xl:flex content-stretch flex-col gap-[4px] items-center rounded-[16px] top-[361.87px] translate-x-[-50%]"
        data-node-id="1:1244"
        style={{ left: "calc(50% - 230px)" }}
      >
        <div
          className="overflow-clip relative shrink-0 size-[24px]"
          data-name="cursor-pointer"
          data-node-id="1:1245"
        >
          <CursorPointer />
        </div>
        <div
          className="font-['Plus_Jakarta_Sans'] font-semibold italic leading-[21px] relative shrink-0 text-[12px] text-center text-neutral-50 whitespace-nowrap"
          data-node-id="1:1247"
        >
          <p>All In One Place</p>
        </div>
      </div>
    </div>
  );
};

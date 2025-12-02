import profile1 from "../../assets/images/profiles/profile-1.svg";
import profile2 from "../../assets/images/profiles/profile-2.svg";
import profile3 from "../../assets/images/profiles/profile-3.svg";

interface ProductHeaderProps {
  logoComponent: React.ReactNode;
  title: string;
  category: string;
  shortDescription: string;
  rating: string;
  totalReviews: number;
  upvotes?: number;
}

export default function ProductHeader({
  logoComponent,
  title,
  category,
  shortDescription,
  upvotes = 887,
}: ProductHeaderProps) {
  const formatUpvotes = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k+`;
    }
    return `${count}+`;
  };
  return (
    <div className="flex items-start gap-4 lg:gap-6" data-node-id="250:3625">
      {/* Logo Container */}
      <div
        className="pt-8 inline-grid place-items-center leading-[0] relative shrink-0"
        data-node-id="250:3626"
      >
        <div
          className="bg-white rounded-full size-[56px] lg:size-[100px] flex items-center justify-center overflow-hidden"
          data-node-id="250:3627"
        >
          <div className="">{logoComponent}</div>
        </div>
      </div>

      {/* Content Container */}
      <div
        className="flex flex-1 flex-col gap-3 lg:gap-2 items-start min-h-px min-w-px relative shrink-0"
        data-node-id="250:3634"
      >
        {/* Title and Category */}
        <div
          className="flex gap-4 items-center relative shrink-0"
          data-node-id="250:3635"
        >
          <h1
            className="font-['Plus_Jakarta_Sans'] font-medium leading-[26px] lg:leading-[52px] relative shrink-0 text-[20px] lg:text-[40px] text-neutral-50"
            data-node-id="250:3636"
          >
            {title}
          </h1>
          <div
            className="bg-[rgba(255,255,255,0.08)] box-border flex gap-[8px] h-[24px] lg:h-[32px] items-center justify-center px-[12px] lg:px-[16px] py-[11px] relative rounded-[100px] shrink-0"
            data-node-id="250:3637"
          >
            <span
              className="font-['Poppins'] font-medium leading-normal text-[12px] lg:text-[14px] text-center text-neutral-50"
              data-node-id="250:3638"
            >
              {category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="font-['Plus_Jakarta_Sans'] font-normal leading-[24px] lg:leading-loose min-w-full relative shrink-0 text-[16px] lg:text-[20px] text-zinc-400 w-[min-content] whitespace-pre-wrap"
          data-node-id="250:3639"
        >
          {shortDescription}
        </p>

        {/* Rating Section */}
        <div
          className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full"
          data-name="Filter"
          data-node-id="250:1175"
        >
          <div
            className="box-border content-stretch flex h-[48px] items-center pl-0 pr-[24px] py-0 relative shrink-0"
            data-node-id="250:1176"
          >
            <div
              className="aspect-[56/56] h-full mr-[-24px] relative shrink-0"
              data-node-id="250:1177"
            >
              <img
                src={profile1}
                alt="Profile 1"
                className="w-[48px] h-[48px] rounded-full object-cover"
              />
            </div>
            <div
              className="aspect-[56/56] h-full mr-[-24px] relative shrink-0"
              data-node-id="250:1178"
            >
              <img
                src={profile2}
                alt="Profile 2"
                className="w-[48px] h-[48px] rounded-full object-cover"
              />
            </div>
            <div
              className="aspect-[56/56] h-full mr-[-24px] relative shrink-0"
              data-node-id="250:1179"
            >
              <img
                src={profile3}
                alt="Profile 3"
                className="w-[48px] h-[48px] rounded-full object-cover"
              />
            </div>
            <div
              className="aspect-[56/56] h-full mr-[-24px] relative shrink-0"
              data-node-id="250:1180"
            >
              <div className="w-[48px] h-[48px] rounded-full bg-white  flex items-center justify-center">
                <span className="font-['Poppins:Medium',_sans-serif] text-[12px] text-zinc-950 font-medium">
                  {formatUpvotes(upvotes)}
                </span>
              </div>
            </div>
            <p
              className="absolute font-['Poppins:Medium',_sans-serif] leading-[normal] left-[96px] not-italic text-[12px] text-center text-zinc-950 top-[15px] translate-x-[-50%] opacity-0 pointer-events-none"
              data-node-id="250:1181"
            >
              {formatUpvotes(upvotes)} Reviews
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
            <div
              data-layer="Users Claimed This Deal"
              className="DealClaimedBy justify-start text-neutral-50 text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal flex-none shrink-0"
            >
              Users Claimed This Deal
            </div>
            <div
              data-layer="Upvotes"
              className="Upvotes justify-start text-zinc-400 text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal flex-none shrink-0"
            >
              {formatUpvotes(upvotes)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

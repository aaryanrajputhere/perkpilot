import React, { useState } from "react";
import { Link } from "react-router-dom";

interface HeroProps {
  category?: string;
  breadcrumb?: string;
  title?: string;
  description?: string;
  date?: string;
  readTime?: string;
  socialIcons?: React.ReactNode[];
  imageComponent?: React.ReactNode;
  className?: string;
  shareUrl?: string;
  // Breadcrumb navigation props
  breadcrumbParentLink?: string; 
  breadcrumbParentLabel?: string; 
  breadcrumbCategoryLink?: string; 
  showBreadcrumb?: boolean;
}

export default function Hero({
  category = "Project Management",
  title = "Notion vs obsidian vs roam research",
  description = "This comprasion blogs will help you understand the difference between these three tools and which one suits you the best.",
  date = "Thursday 19 June 2025",
  readTime = "• 9 Minute Read",
  socialIcons,
  imageComponent,
  shareUrl,
  breadcrumbParentLink = "/blogs",
  breadcrumbParentLabel = "Blogs",
  breadcrumbCategoryLink,
  showBreadcrumb = true,
}: HeroProps) {
  const [copyMessage, setCopyMessage] = useState<"idle" | "copied" | "error">("idle");
  const resolvedShareUrl =
    shareUrl ||
    (typeof window !== "undefined" ? window.location.href : undefined);
  const encodedUrl = resolvedShareUrl ? encodeURIComponent(resolvedShareUrl) : "";
  const plainTitle = title ? title.replace(/<[^>]*>/g, "") : "";
  const plainDescription = description
    ? description.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()
    : "";
  const encodedText = plainTitle
    ? encodeURIComponent(`${plainTitle} – ${plainDescription}`)
    : encodedUrl;

  const handleCopyLink = async (): Promise<void> => {
    if (!resolvedShareUrl) return;
    try {
      await navigator.clipboard.writeText(resolvedShareUrl);
      setCopyMessage("copied");
      setTimeout(() => setCopyMessage("idle"), 2000);
    } catch {
      setCopyMessage("error");
      setTimeout(() => setCopyMessage("idle"), 2000);
    }
  };

  // Default SVG icon components
  const XIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.2835 10.1635L23.212 0H21.097L13.3411 8.82305L7.15101 0H0.00976562L9.37236 13.3433L0.00976562 24H2.1248L10.31 14.6806L16.8485 24H23.9898M2.88817 1.5619H6.13746L21.0954 22.5148H17.8453"
        fill="#F4F4F5"
      />
    </svg>
  );

  const InstaIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_250_5767)">
        <path
          d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z"
          fill="#F4F4F5"
        />
      </g>
      <defs>
        <clipPath id="clip0_250_5767">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const LinkedInIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_250_5770)">
        <path
          d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z"
          fill="#F4F4F5"
        />
      </g>
      <defs>
        <clipPath id="clip0_250_5770">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const LinkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M13.3335 17.6387C13.5228 17.9489 13.7468 18.2395 14.0055 18.5107C14.7542 19.3043 15.7534 19.8159 16.8351 19.9592C17.9167 20.1024 19.0147 19.8687 19.9442 19.2973C20.2917 19.084 20.6162 18.8218 20.9175 18.5107L25.2362 14.0147C27.1428 12.028 27.1428 8.80932 25.2362 6.82265C24.792 6.35217 24.2564 5.97736 23.6622 5.72119C23.0681 5.46502 22.4279 5.33289 21.7808 5.33289C21.1338 5.33289 20.4936 5.46502 19.8994 5.72119C19.3053 5.97736 18.7697 6.35217 18.3255 6.82265L17.3735 7.81332"
        stroke="#F4F4F5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6267 24.1867L13.676 25.1773C13.2318 25.648 12.6961 26.023 12.1018 26.2793C11.5076 26.5356 10.8672 26.6678 10.22 26.6678C9.57279 26.6678 8.93242 26.5356 8.33813 26.2793C7.74385 26.023 7.20819 25.648 6.76398 25.1773C4.85732 23.1907 4.85732 19.9707 6.76398 17.9853L11.084 13.4893C11.5282 13.0189 12.0638 12.6441 12.6579 12.3879C13.2521 12.1317 13.8923 11.9996 14.5393 11.9996C15.1863 11.9996 15.8266 12.1317 16.4207 12.3879C17.0149 12.6441 17.5505 13.0189 17.9947 13.4893C18.2533 13.7604 18.4773 14.0511 18.6667 14.3613"
        stroke="#F4F4F5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const shareButtons = resolvedShareUrl
    ? [
        {
          icon: XIcon,
          label: "Share on X",
          href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        },
        {
          icon: InstaIcon,
          label: "Share on Instagram",
          href: `https://www.instagram.com/?url=${encodedUrl}`,
        },
        {
          icon: LinkedInIcon,
          label: "Share on LinkedIn",
          href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        },
        {
          icon: LinkIcon,
          label: copyMessage === "copied" ? "Link copied" : "Copy link",
          onClick: handleCopyLink,
          disabled: copyMessage === "copied",
        },
      ]
    : [];

  return (
    <div
      data-layer="Frame 2147206225"
      className="Frame2147206225 flex flex-col px-4 lg:flex-row justify-start items-start lg:items-center gap-6 sm:mt-[50px] lg:mt-[90px]"
    >
      <div
        data-layer="Frame 2147206224"
        className="Frame2147206224 w-full lg:w-[608px] flex flex-col justify-start items-start gap-6"
      >
        {showBreadcrumb && (
          <nav
            data-layer="Frame 2147206180"
            className="Frame2147206180 flex flex-col md:flex-row justify-start items-start md:items-center gap-2 px-4"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            {/* Parent Page Link with dot */}
            {breadcrumbParentLink && breadcrumbParentLabel && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 hover:text-zinc-400 transition-colors flex items-center" style={{ fontSize: "14px", lineHeight: "21px" }}>
                  •
                </span>
                <Link
                  to={breadcrumbParentLink}
                  className="text-zinc-500 hover:text-zinc-400 transition-colors flex items-center text-[14px] font-medium leading-[21px] whitespace-nowrap"
                >
                  {breadcrumbParentLabel}
                </Link>
              </div>
            )}
            {/* Separator dot and Category Link */}
            {category && (
              <div className="flex items-center gap-2">
                <span className="text-zinc-100 flex items-center" style={{ fontSize: "14px", lineHeight: "21px" }}>
                  •
                </span>
                <Link
                  to={
                    breadcrumbCategoryLink ||
                    `${breadcrumbParentLink}${category ? `?category=${encodeURIComponent(category)}` : ""}`
                  }
                  className="text-zinc-100 hover:text-zinc-200 transition-colors flex items-center text-sm font-medium leading-[21px] whitespace-nowrap"
                >
                  {category}
                </Link>
              </div>
            )}
          </nav>
        )}

        <div
          data-layer="Notion vs obsidian vs roam research"
          className="self-stretch md:max-w-[1250px] justify-start text-neutral-50 text-[32px] md:text-[48px] font-medium font-['Plus_Jakarta_Sans'] capitalize leading-[42px] md:leading-[60px]"
        >
          {title}
        </div>

        <div
          data-layer="This comprasion blogs will help you understand the difference between these three tools and which one suits you the best."
          className="self-stretch justify-start text-zinc-400 font-['Plus_Jakarta_Sans'] prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: description || "" }}
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            letterSpacing: "0%",
            wordBreak: "break-word",
          }}
        />
        <style>{`
          .prose a {
            color: #737eff;
            text-decoration: underline;
          }
          .prose a:hover {
            opacity: 0.8;
          }
          .prose img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 16px 0;
          }
          .prose [data-youtube-embed] {
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            border-radius: 8px;
            overflow: hidden;
          }
          .prose [data-youtube-embed] iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
        `}</style>

        <div
          data-layer="Frame 2147206208"
          className="Frame2147206208 w-full flex flex-col justify-start items-start gap-6"
        >
          <div
            data-layer="Frame 2147205829"
            className="Frame2147205829 w-full h-[21px] inline-flex justify-start items-center gap-2 md:gap-6 whitespace-nowrap"
          >
            <div
              data-layer="Thursday 19 June 2025"
              className="Thursday19June2025 justify-start text-zinc-500 text-sm font-medium font-['Poppins']"
            >
              {date}
            </div>

            {readTime && (
              <div
                data-layer="9 Minute Read"
                className="MinuteRead text-zinc-500 text-sm font-medium font-['Poppins']"
              >
                {readTime}
              </div>
            )}
          </div>

          <div
            data-layer="Button List"
            className="ButtonList inline-flex justify-start items-center gap-4"
          >
            {socialIcons && socialIcons.length > 0
              ? socialIcons.map((icon, idx) => (
                  <div
                    key={idx}
                    className="XLogo w-12 h-12 bg-white/10 rounded-[100px] flex justify-center items-center gap-2.5"
                  >
                    {icon}
                  </div>
                ))
              : shareButtons.map((button, idx) =>
                  button.href ? (

                      <a
                      key={idx}
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={button.label}
                      className="XLogo w-12 h-12 bg-white/10 rounded-[100px] flex justify-center items-center gap-2.5 hover:bg-white/20 transition-colors"
                    >
                      {button.icon}
                    </a>
                  ) : (
                    <button
                      key={idx}
                      type="button"
                      onClick={button.onClick}
                      disabled={button.disabled}
                      title={button.label}
                      className="XLogo w-12 h-12 bg-white/10 rounded-[100px] flex justify-center items-center gap-2.5 hover:bg-white/20 transition-colors disabled:opacity-60"
                    >
                      {button.icon}
                    </button>
                  )
                )}
          </div>
        </div>
      </div>

      <div
        data-layer="Rectangle 2825"
        className="Rectangle2825 w-full lg:w-[608px] h-[400px] rounded-3xl border border-white/10 overflow-hidden bg-[#d9d9d9]/10"
      >
        <div className="w-full h-full flex items-center justify-center">
          {imageComponent ? (
            <div className="w-full h-full object-cover">{imageComponent}</div>
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-white/10 to-[#d9d9d9]/10" />
          )}
        </div>
      </div>
    </div>
  );
}

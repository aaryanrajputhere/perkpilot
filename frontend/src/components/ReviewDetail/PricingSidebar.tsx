import { useState, useEffect } from "react";
import { incrementReviewUpvotes, updateReviewShareCount } from "../../hooks/useReviews";
import { REVIEWS_API } from "../../config/backend";

interface PricingSidebarProps {
  title: string;
  pricing?: Array<{
    plan: string;
    amount: string;
    note?: string;
    _id?: string;
  }>;
  lastUpdated?: string;
  upvotes?: number;
  reviewId?: string;
  onUpvote?: (newUpvotes: number) => void;
  shareUrl?: string;
  onShare?: () => void;
  tryForFreeLink?: string;
}

const defaultPricing = [
  { plan: "Free", amount: "Free" },
  { plan: "Professional", amount: "$12/Month" },
  { plan: "Organization", amount: "$45/Month" },
  { plan: "Enterprise", amount: "Custom" },
];

export default function PricingSidebar({
  title,
  pricing,
  lastUpdated = "Oct 2025",
  upvotes = 887,
  reviewId,
  onUpvote,
  shareUrl,
  onShare,
  tryForFreeLink,
}: PricingSidebarProps) {
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLocalUpvotes(upvotes);
  }, [upvotes]);

  const handleUpvote = async () => {
    if (isUpdating || !reviewId || hasUpvoted) return;

    setIsUpdating(true);

    try {
      const updatedReview = await incrementReviewUpvotes(reviewId);
      const newUpvotes = updatedReview.upvotes || localUpvotes + 1;
      
      setLocalUpvotes(newUpvotes);
      setHasUpvoted(true);
      onUpvote?.(newUpvotes);
    } catch (error) {
      console.error("Failed to increment upvotes:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatUpvotes = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k+`;
    }
    return `${count}+`;
  };

  const handleShare = async () => {
    const urlToShare = shareUrl || window.location.href;
    const shareData = {
      title: `${title} Review`,
      text: `Check out this review for ${title}`,
      url: urlToShare,
    };

    try {
      // Try Web Share API first (works on mobile and some desktop browsers)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        
        // Update share count in backend
        if (reviewId) {
          try {
            // Fetch current review to get current shareCount
            const response = await fetch(`${REVIEWS_API}/${reviewId}`);
            if (response.ok) {
              const review = await response.json();
              const currentShareCount = review.shareCount || 0;
              await updateReviewShareCount(reviewId, currentShareCount + 1);
              onShare?.();
            }
          } catch (error) {
            console.error("Failed to update share count:", error);
          }
        }
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(urlToShare);
        
        // Show feedback
        const originalText = document.querySelector('.Share')?.textContent;
        const shareElement = document.querySelector('.Share');
        if (shareElement) {
          shareElement.textContent = "Copied!";
          setTimeout(() => {
            if (shareElement) {
              shareElement.textContent = originalText || "Share";
            }
          }, 2000);
        }
        
        // Update share count in backend
        if (reviewId) {
          try {
            const response = await fetch(`${REVIEWS_API}/${reviewId}`);
            if (response.ok) {
              const review = await response.json();
              const currentShareCount = review.shareCount || 0;
              await updateReviewShareCount(reviewId, currentShareCount + 1);
              onShare?.();
            }
          } catch (error) {
            console.error("Failed to update share count:", error);
          }
        }
      }
    } catch (error) {
      // User cancelled share or error occurred
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error sharing:", error);
        // Fallback to clipboard if Web Share fails
        try {
          await navigator.clipboard.writeText(urlToShare);
          const shareElement = document.querySelector('.Share');
          if (shareElement) {
            const originalText = shareElement.textContent;
            shareElement.textContent = "Copied!";
            setTimeout(() => {
              if (shareElement) {
                shareElement.textContent = originalText || "Share";
              }
            }, 2000);
          }
        } catch (clipboardError) {
          console.error("Failed to copy to clipboard:", clipboardError);
        }
      }
    }
  };
  const displayPricing =
    pricing && pricing.length > 0 ? pricing : defaultPricing;
  return (
    <div
      data-layer="Frame 2147206174"
      className="Frame2147206174 box-border flex flex-col items-start p-6 w-full max-w-[397px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.16)] backdrop-blur-[12px] rounded-[24px] gap-8"
    >
      <div
        data-layer="Pricing"
        className="Pricing self-stretch text-[#FAFAFA] text-2xl font-semibold font-['Urbanist'] leading-[29px]"
        style={{ fontSize: "24px", lineHeight: "29px" }}
      >
        Pricing
      </div>
      <div
        data-layer="Frame 2147205595"
        className="Frame2147205595 self-stretch flex flex-col items-start gap-5"
        style={{ gap: "20px" }}
      >
        {displayPricing.map((plan, index) => (
          <div
            key={`plan-${index}`}
            data-layer={`Frame-${index}`}
            className="self-stretch flex flex-row justify-between items-center gap-4"
            style={{ gap: "16px", height: "24px" }}
          >
            <div
              data-layer={plan.plan}
              className="text-[#FAFAFA] font-['Poppins'] font-normal leading-6"
              style={{ fontSize: "16px", lineHeight: "24px" }}
            >
              {plan.plan}
            </div>
            <div
              data-layer={plan.amount}
              className="text-[#FAFAFA] font-['Poppins'] font-medium leading-6"
              style={{ fontSize: "16px", lineHeight: "24px" }}
            >
              {plan.amount}/Month
            </div>
          </div>
        ))}
      </div>
      <div
        data-layer="Frame 2147206205"
        className="Frame2147206205 self-stretch flex flex-col items-start gap-4"
        style={{ gap: "16px" }}
      >
        {tryForFreeLink ? (
          <a
            href={tryForFreeLink}
            target="_blank"
            rel="noopener noreferrer"
            data-layer="Buttons/main"
            className="ButtonsMain box-border self-stretch flex flex-row justify-center items-center px-8 py-3 bg-gradient-to-b from-[#501BD6] to-[#7F57E2] border border-[rgba(250,250,250,0.08)] backdrop-blur-[4px] rounded-[100px] gap-3 hover:opacity-90 transition-opacity cursor-pointer"
            style={{ padding: "12px 32px", gap: "12px", height: "48px", textDecoration: "none" }}
          >
            <div
              data-layer="Try Figma For Free"
              className="TryFigmaForFree text-center text-[#FAFAFA] font-['Plus_Jakarta_Sans'] font-medium leading-6"
              style={{ fontSize: "16px", lineHeight: "24px" }}
            >
              Try {title} For Free
            </div>
            <div
              data-layer="nav-arrow-right"
              className="NavArrowRight w-6 h-6 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M9.56641 6L15.5664 12L9.56641 18"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        ) : (
        <div
          data-layer="Buttons/main"
          className="ButtonsMain box-border self-stretch flex flex-row justify-center items-center px-8 py-3 bg-gradient-to-b from-[#501BD6] to-[#7F57E2] border border-[rgba(250,250,250,0.08)] backdrop-blur-[4px] rounded-[100px] gap-3"
          style={{ padding: "12px 32px", gap: "12px", height: "48px" }}
        >
          <div
            data-layer="Try Figma For Free"
            className="TryFigmaForFree text-center text-[#FAFAFA] font-['Plus_Jakarta_Sans'] font-medium leading-6"
            style={{ fontSize: "16px", lineHeight: "24px" }}
          >
            Try {title} For Free
          </div>
          <div
            data-layer="nav-arrow-right"
            className="NavArrowRight w-6 h-6 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              className="w-full h-full"
            >
              <path
                d="M9.56641 6L15.5664 12L9.56641 18"
                stroke="#FAFAFA"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        )}
        <div
          data-layer="Frame 2147206204"
          className="Frame2147206204 self-stretch flex flex-row items-start gap-4"
          style={{ gap: "16px" }}
        >
          <button
            type="button"
            onClick={handleUpvote}
            disabled={isUpdating || !reviewId}
            data-layer="Buttons/main"
            className={`ButtonsMain box-border flex-1 flex flex-row justify-center items-center px-8 py-3 border backdrop-blur-[4px] rounded-[100px] gap-3 transition-all ${
              hasUpvoted
                ? "bg-gradient-to-b from-[#501BD6] to-[#7F57E2] border-[rgba(250,250,250,0.16)]"
                : "bg-[rgba(255,255,255,0.08)] border-[rgba(244,244,245,0.08)] hover:bg-[rgba(255,255,255,0.12)]"
            } ${isUpdating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            style={{ padding: "12px 32px", gap: "12px", height: "48px" }}
          >
            <div
              data-layer="Upvote"
              className="Upvote text-center text-[#FAFAFA] font-['Plus_Jakarta_Sans'] font-normal leading-6"
              style={{ fontSize: "16px", lineHeight: "24px" }}
            >
              {formatUpvotes(localUpvotes)}
            </div>
            <div
              data-layer="fast-arrow-up"
              className="FastArrowUp w-5 h-5 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M5.81641 12.5L10.8164 7.5L15.8164 12.5"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.81641 7.5L10.8164 2.5L15.8164 7.5"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
          <button
            type="button"
            onClick={handleShare}
            data-layer="Buttons/main"
            className="ButtonsMain box-border flex-1 flex flex-row justify-center items-center px-8 py-3 bg-[rgba(255,255,255,0.08)] border border-[rgba(244,244,245,0.08)] backdrop-blur-[4px] rounded-[100px] gap-3 hover:bg-[rgba(255,255,255,0.12)] transition-colors cursor-pointer"
            style={{ padding: "12px 32px", gap: "12px", height: "48px" }}
          >
            <div
              data-layer="Share"
              className="Share text-center text-[#FAFAFA] font-['Plus_Jakarta_Sans'] font-normal leading-6"
              style={{ fontSize: "16px", lineHeight: "24px" }}
            >
              Share
            </div>
            <div
              data-layer="share-android"
              className="ShareAndroid w-5 h-5 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                className="w-full h-full"
              >
                <path
                  d="M15.3164 18.3333C16.6971 18.3333 17.8164 17.214 17.8164 15.8333C17.8164 14.4526 16.6971 13.3333 15.3164 13.3333C13.9357 13.3333 12.8164 14.4526 12.8164 15.8333C12.8164 17.214 13.9357 18.3333 15.3164 18.3333Z"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.3164 6.66669C16.6971 6.66669 17.8164 5.5474 17.8164 4.16669C17.8164 2.78598 16.6971 1.66669 15.3164 1.66669C13.9357 1.66669 12.8164 2.78598 12.8164 4.16669C12.8164 5.5474 13.9357 6.66669 15.3164 6.66669Z"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.31641 12.5C6.69712 12.5 7.81641 11.3807 7.81641 10C7.81641 8.61929 6.69712 7.5 5.31641 7.5C3.93569 7.5 2.81641 8.61929 2.81641 10C2.81641 11.3807 3.93569 12.5 5.31641 12.5Z"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.2331 5.41669L7.39978 8.75002"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.39978 11.25L13.2331 14.5833"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div
        data-layer="Frame 2147223635"
        className="Frame2147223635 self-stretch flex flex-row justify-between items-center gap-3"
        style={{ gap: "12px", height: "24px" }}
      >
        <div
          data-layer="Frame 2147223642"
          className="Frame2147223642 flex flex-row items-center gap-3"
          style={{ gap: "12px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            className="w-6 h-6"
          >
            <path
              d="M21.7343 8.31201C20.1911 4.7802 16.667 2.31201 12.5663 2.31201C7.381 2.31201 3.11745 6.25869 2.61572 11.312"
              stroke="#FAFAFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5664 8.31201H21.9664C22.2978 8.31201 22.5664 8.04338 22.5664 7.71201V3.31201"
              stroke="#FAFAFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.44787 16.312C4.99098 19.8438 8.51514 22.312 12.6158 22.312C17.8011 22.312 22.0647 18.3653 22.5664 13.312"
              stroke="#FAFAFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.61572 16.312H3.21572C2.88435 16.312 2.61572 16.5806 2.61572 16.912V21.312"
              stroke="#FAFAFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            data-layer="Last Updated On"
            className="LastUpdatedOn text-center text-[#FAFAFA] font-['Plus_Jakarta_Sans'] font-normal leading-6"
            style={{ fontSize: "16px", lineHeight: "24px" }}
          >
            Last Updated On
          </div>
        </div>
        <div
          data-layer="Oct 2025"
          className="Oct2025 text-center text-[#FAFAFA] font-['Plus_Jakarta_Sans'] font-normal leading-6"
          style={{ fontSize: "16px", lineHeight: "24px" }}
        >
          {lastUpdated}
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface SimilarComparisonsHeading {
  title?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

const SimilarComparisonsHeading: React.FC<SimilarComparisonsHeading> = ({
  title = "More Comparison Tools Blog",
  onPrevious,
  onNext,
}) => {
  const ArrowLeftIcon = () => (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="1.2832"
        width="39"
        height="39"
        rx="19.5"
        stroke="#FAFAFA"
      />
      <path
        d="M24.9725 12.4646C25.0627 12.3691 25.1332 12.2568 25.18 12.1341C25.2268 12.0114 25.249 11.8806 25.2453 11.7493C25.2416 11.618 25.2121 11.4887 25.1584 11.3688C25.1047 11.249 25.0279 11.1408 24.9325 11.0506C24.837 10.9604 24.7247 10.8898 24.602 10.843C24.4792 10.7962 24.3485 10.774 24.2172 10.7777C24.0859 10.7815 23.9566 10.811 23.8367 10.8647C23.7168 10.9184 23.6087 10.9951 23.5185 11.0906L15.0185 20.0906C14.8429 20.2763 14.7451 20.5221 14.7451 20.7776C14.7451 21.0331 14.8429 21.2789 15.0185 21.4646L23.5185 30.4656C23.6081 30.5632 23.7162 30.6419 23.8365 30.6974C23.9569 30.7528 24.087 30.7837 24.2194 30.7885C24.3518 30.7932 24.4838 30.7715 24.6077 30.7248C24.7317 30.678 24.8451 30.6071 24.9415 30.5162C25.0378 30.4252 25.1151 30.316 25.1688 30.1949C25.2226 30.0739 25.2518 29.9433 25.2547 29.8109C25.2575 29.6784 25.2341 29.5467 25.1856 29.4234C25.1372 29.3001 25.0647 29.1877 24.9725 29.0926L17.1205 20.7776L24.9725 12.4646Z"
        fill="#FAFAFA"
      />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="40"
        y="40.7832"
        width="40"
        height="40"
        rx="20"
        transform="rotate(-180 40 40.7832)"
        fill="url(#paint0_linear_1_583)"
      />
      <path
        d="M15.0275 29.1018C14.9373 29.1973 14.8668 29.3096 14.82 29.4323C14.7732 29.555 14.751 29.6858 14.7547 29.8171C14.7584 29.9484 14.7879 30.0777 14.8416 30.1976C14.8953 30.3175 14.9721 30.4256 15.0675 30.5158C15.163 30.606 15.2753 30.6766 15.398 30.7234C15.5208 30.7702 15.6515 30.7924 15.7828 30.7887C15.9141 30.7849 16.0434 30.7554 16.1633 30.7017C16.2832 30.6481 16.3913 30.5713 16.4815 30.4758L24.9815 21.4758C25.1571 21.2901 25.2549 21.0443 25.2549 20.7888C25.2549 20.5333 25.1571 20.2875 24.9815 20.1018L16.4815 11.1008C16.3919 11.0033 16.2838 10.9245 16.1635 10.869C16.0431 10.8136 15.913 10.7827 15.7806 10.778C15.6482 10.7733 15.5162 10.7949 15.3923 10.8416C15.2683 10.8884 15.1549 10.9593 15.0585 11.0503C14.9622 11.1412 14.8849 11.2504 14.8312 11.3715C14.7774 11.4925 14.7482 11.6231 14.7453 11.7556C14.7425 11.888 14.7659 12.0197 14.8144 12.143C14.8628 12.2663 14.9353 12.3787 15.0275 12.4738L22.8795 20.7888L15.0275 29.1018Z"
        fill="#FAFAFA"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_583"
          x1="60"
          y1="40.7832"
          x2="60"
          y2="80.7832"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#501BD6" />
          <stop offset="1" stopColor="#7F57E2" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col gap-3 items-start justify-center">
        <h2
          className="capitalize"
          style={{
            color: "var(--Primary-25, #FAFAFA)",
            textAlign: "center",
            fontFamily: "Plus Jakarta Sans",
            fontSize: "40px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "52px",
            textTransform: "capitalize",
          }}
        >
          {title}{" "}
        </h2>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={onPrevious}
          disabled={!onPrevious}
          className={`w-10 h-10 flex items-center justify-center transition-opacity ${
            onPrevious
              ? "hover:opacity-75 cursor-pointer"
              : "opacity-30 cursor-not-allowed"
          }`}
          aria-label="Previous comparison"
        >
          <ArrowLeftIcon />
        </button>

        <button
          onClick={onNext}
          disabled={!onNext}
          className={`w-10 h-10 flex items-center justify-center transition-opacity ${
            onNext
              ? "hover:opacity-75 cursor-pointer"
              : "opacity-30 cursor-not-allowed"
          }`}
          aria-label="Next comparison"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default SimilarComparisonsHeading;


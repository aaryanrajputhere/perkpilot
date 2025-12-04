import React from "react";
import { Link } from "react-router-dom";


const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 17.8C16.034 17.8 19.686 15.55 21.648 12C19.686 8.45 16.034 6.2 12 6.2C7.966 6.2 4.314 8.45 2.352 12C4.314 15.55 7.966 17.8 12 17.8ZM12 5C16.808 5 20.972 7.848 23 12C20.972 16.152 16.808 19 12 19C7.192 19 3.028 16.152 1 12C3.028 7.848 7.192 5 12 5ZM12 14.8C12.7426 14.8 13.4548 14.505 13.9799 13.9799C14.505 13.4548 14.8 12.7426 14.8 12C14.8 11.2574 14.505 10.5452 13.9799 10.0201C13.4548 9.495 12.7426 9.2 12 9.2C11.2574 9.2 10.5452 9.495 10.0201 10.0201C9.495 10.5452 9.2 11.2574 9.2 12C9.2 12.7426 9.495 13.4548 10.0201 13.9799C10.5452 14.505 11.2574 14.8 12 14.8ZM12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16Z"
      fill="#FAFAFA"
    />
  </svg>
);

// Arrow Right Icon SVG
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12.9693 19.2807C12.8995 19.211 12.8442 19.1283 12.8065 19.0373C12.7687 18.9462 12.7493 18.8486 12.7493 18.7501C12.7493 18.6515 12.7687 18.5539 12.8065 18.4628C12.8442 18.3718 12.8995 18.2891 12.9693 18.2194L18.4396 12.7501H3.7499C3.55099 12.7501 3.36022 12.671 3.21957 12.5304C3.07891 12.3897 2.9999 12.199 2.9999 12.0001C2.9999 11.8011 3.07891 11.6104 3.21957 11.4697C3.36022 11.3291 3.55099 11.2501 3.7499 11.2501H18.4396L12.9693 5.78068C12.8285 5.63995 12.7495 5.44907 12.7495 5.25005C12.7495 5.05103 12.8285 4.86016 12.9693 4.71943C13.11 4.5787 13.3009 4.49963 13.4999 4.49963C13.6989 4.49963 13.8898 4.5787 14.0305 4.71943L20.7805 11.4694C20.8503 11.5391 20.9056 11.6218 20.9433 11.7128C20.9811 11.8039 21.0005 11.9015 21.0005 12.0001C21.0005 12.0986 20.9811 12.1962 20.9433 12.2873C20.9056 12.3783 20.8503 12.461 20.7805 12.5307L14.0305 19.2807C13.9609 19.3504 13.8782 19.4057 13.7871 19.4435C13.6961 19.4812 13.5985 19.5006 13.4999 19.5006C13.4013 19.5006 13.3037 19.4812 13.2127 19.4435C13.1216 19.4057 13.0389 19.3504 12.9693 19.2807Z"
      fill="#FAFAFA"
    />
  </svg>
);

interface SimilarBlogsCardProps {
  id?: string;
  slug?: string;
  imageUrl?: string;
  featured?: boolean;
  views?: number | string;
  title?: string;
  description?: string;
  tags?: string[];
  readTime?: string;
  date?: string;
}

const SimilarBlogsCard: React.FC<SimilarBlogsCardProps> = ({
  id = "blog-1",
  slug,
  imageUrl = "",
  featured = true,
  views = 1234,
  title = "The Ultimate Remote Work Stack For 2025",
  description = "From just a startup idea to getting 1000s of customers every month and getting loved by globally users like our latest feature about SaaS financing for struggling startups",
  tags = ["SaaS", "Founders", "Marketplace"],
  readTime = "2 Minute Read",
  date = "27/06/2004",
}) => {
  return (
    <Link
      to={`/blog/${slug ?? id}`}
      className="flex-shrink-0 flex flex-col justify-center items-start p-6 gap-6 w-full md:w-[608px] md:h-[551px]"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0px 1px 4px rgba(12, 12, 13, 0.05)",
        borderRadius: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Image Section - 560px x 238px */}
      <div
        className="flex flex-col justify-center items-start gap-3 overflow-hidden w-full md:w-[560px] h-[238px]"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "16px",
          padding: "0px",
        }}
      >
        <div
          className="flex-1 rounded-2xl w-full h-full"
          style={{
            borderRadius: "16px",
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              style={{ borderRadius: "16px" }}
            />
          ) : null}
        </div>
      </div>

      {/* Content Section - 560px x 241px */}
      <div
        className="flex flex-col items-start w-full md:w-[560px] md:h-[241px]"
        style={{
          padding: "0px",
          gap: "24px",
        }}
      >
        {/* Top Content - 560px x 177px */}
        <div
          className="flex flex-col items-start w-full md:w-[560px]"
          style={{
            padding: "0px",
            gap: "16px",
          }}
        >
          {/* Top Row: Featured + Views - 560px x 26px */}
          <div
            className="flex flex-row justify-between items-center w-full md:w-[560px] h-[26px]"
            style={{
              padding: "0px",
              gap: "16px",
            }}
          >
            {/* Featured Article Badge */}
            {featured ? (
              <div
                className="flex flex-row justify-center items-center"
                style={{
                  width: "112px",
                  height: "26px",
                  padding: "0px",
                  gap: "12px",
                }}
              >
                <div
                  className="flex flex-row justify-center items-center"
                  style={{
                    padding: "4px 8px",
                    gap: "10px",
                    width: "112px",
                    height: "26px",
                    background: "linear-gradient(180deg, #501BD6 0%, #7F57E2 100%)",
                    borderRadius: "100px",
                  }}
                >
                  <span
                    style={{
                      width: "96px",
                      height: "18px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: "#FAFAFA",
                    }}
                  >
                    Featured Article
                  </span>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {/* Views - Aligned to Right */}
            <div
              className="flex flex-row items-center ml-auto"
              style={{
                width: "63px",
                height: "24px",
                padding: "0px",
                gap: "8px",
              }}
            >
              <span className="w-6 h-6 relative flex items-center justify-center">
                <EyeIcon />
              </span>
              <span
                style={{
                  width: "31px",
                  height: "21px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#FAFAFA",
                }}
              >
                {views}
              </span>
            </div>
          </div>

          {/* Title - 560px x 32px */}
          <div
            className="w-full md:w-[560px]"
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "32px",
              color: "#FAFAFA",
              minHeight: "32px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </div>

          {/* Description - 560px x 45px */}
          <div
            className="w-full md:w-[560px]"
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "21px",
              color: "#E4E4E7",
              minHeight: "45px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </div>

          {/* Tags/Categories - 235px x 26px */}
          {tags && tags.length > 0 && (
            <div
              className="flex flex-row justify-start items-center flex-wrap md:w-[235px] h-auto md:h-[26px]"
              style={{
                padding: "0px",
                gap: "12px",
              }}
            >
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex flex-row justify-center items-center flex-shrink-0"
                  style={{
                    padding: "4px 8px",
                    gap: "10px",
                    background: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "100px",
                    height: "26px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: "#E4E4E7",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className="flex flex-row justify-between items-center w-full md:w-[560px] h-[40px]"
          style={{
            padding: "0px",
            gap: "24px",
          }}
        >
          {/* Read Time Button - Left Aligned */}
          <div
            className="flex flex-row items-center"
            style={{
              padding: "8px 0px",
              gap: "8px",
              height: "40px",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#FAFAFA",
              }}
            >
              {readTime}
            </span>
            <span className="w-6 h-6 relative flex items-center justify-center">
              <ArrowRightIcon />
            </span>
          </div>

          {/* Date - Right Aligned */}
          <div
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "21px",
              color: "#D4D4D8",
            }}
          >
            {date}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SimilarBlogsCard;


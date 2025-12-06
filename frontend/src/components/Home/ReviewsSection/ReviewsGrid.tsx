import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewsCard from "./ReviewsCard";
import { fetchHomePage } from "../../../hooks/useHomePage";
import type { Review } from "../../../hooks/useHomePage";
import profile1 from "../../../assets/images/profiles/profile-1.svg";
import profile2 from "../../../assets/images/profiles/profile-2.svg";
import profile3 from "../../../assets/images/profiles/profile-3.svg";

const ReviewsGrid: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const homepageData = await fetchHomePage();
        if (homepageData.topReviews?.reviews && homepageData.topReviews.reviews.length > 0) {
          // Remove duplicates based on _id
          const uniqueReviews = homepageData.topReviews.reviews.filter((review, index, self) =>
            index === self.findIndex((r) => r._id === review._id)
          );
          setReviews(uniqueReviews);
        }
      } catch (error) {
        console.error('Failed to load reviews data:', error);
      }
    };

    void loadReviews();
  }, []);

  const handleReadReview = (reviewId: string) => {
    navigate(`/review/${reviewId}`);
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center items-stretch">
        {reviews.map((review, index) => (
          <ReviewsCard
            key={`${review._id}-${index}`}
            appName={review.productName || "Product"}
            category={review.productType || ""}
            description={review.description || review.overview || ""}
            rating={review.aggregateRating?.toString() || "0"}
            reviewCount={review.ratingCount?.toString() || "0"}
            logoUrl={review.avatarUrl}
            userAvatars={[profile1, profile2, profile3]}
            starRating={review.aggregateRating ? `${review.aggregateRating}/5.0` : "No rating"}
            onReadReview={() => handleReadReview(review._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsGrid;

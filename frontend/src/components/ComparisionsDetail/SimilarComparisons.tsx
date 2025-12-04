import { useState, useRef, useEffect } from "react";
import ComparisionsCard from "../Comparisions/ComparisionsSection/ComparisionsCard";
import SimilarComparisonsHeading from "./SimilarComparisonsHeading";
import type { ToolComparisonBlog } from "../../hooks/useComparisionDetail";

interface SimilarComparisonsProps {
  sectionTitle?: string;
  comparisons?: ToolComparisonBlog[];
}

export default function SimilarComparisons({
  sectionTitle = "More Comparison Tools Blog",
  comparisons = [],
}: SimilarComparisonsProps) {
  const validComparisons = Array.isArray(comparisons)
    ? comparisons.filter(
        (comp) =>
          comp &&
          typeof comp === "object" &&
          (comp._id || comp.id) &&
          comp.heroHeading
      )
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const itemsPerView = isMobile ? 1 : 2; 
  const totalPages = isMobile 
    ? validComparisons.length 
    : Math.ceil(validComparisons.length / itemsPerView);
  
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < (isMobile ? validComparisons.length - 1 : totalPages - 1);

  const handlePrevious = (): void => {
    if (canGoPrevious) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = (): void => {
    if (canGoNext) {
      if (isMobile) {
        setCurrentIndex((prev) => Math.min(validComparisons.length - 1, prev + 1));
      } else {
        setCurrentIndex((prev) => Math.min(totalPages - 1, prev + 1));
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && canGoNext) {
        handleNext();
      } else if (diff < 0 && canGoPrevious) {
        handlePrevious();
      }
    }
  };

  useEffect(() => {
    if (containerRef.current && !isMobile) {
      const cardWidth = 608;
      const gap = 24;
      const scrollPosition = currentIndex * (cardWidth * itemsPerView + gap * (itemsPerView - 1));
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentIndex, isMobile, itemsPerView]);

  if (validComparisons.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[1232px] mx-auto">
      <SimilarComparisonsHeading
        title={sectionTitle}
        onPrevious={canGoPrevious ? handlePrevious : undefined}
        onNext={canGoNext ? handleNext : undefined}
      />
      <div
        ref={containerRef}
        className="mt-6 flex flex-col md:flex-row md:flex-nowrap items-start gap-6 overflow-x-auto scrollbar-hide"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isMobile ? (
          validComparisons.length > 0 && (
            <div key={validComparisons[currentIndex]?._id || validComparisons[currentIndex]?.id || currentIndex} className="flex-shrink-0 w-full">
              <ComparisionsCard
                _id={validComparisons[currentIndex]?._id || validComparisons[currentIndex]?.id}
                slug={validComparisons[currentIndex]?.slug}
                heroHeading={validComparisons[currentIndex]?.heroHeading}
                heroBody={validComparisons[currentIndex]?.heroBody}
                comparisonHeroImage={validComparisons[currentIndex]?.comparisonHeroImage}
                toolsMentioned={validComparisons[currentIndex]?.toolsMentioned || []}
                blogCategory={validComparisons[currentIndex]?.blogCategory}
                readingTime={validComparisons[currentIndex]?.readingTime}
              />
            </div>
          )
        ) : (
          validComparisons.map((comparison, idx) => (
            <div key={comparison._id || comparison.id || idx} className="flex-shrink-0 w-full md:w-auto">
              <ComparisionsCard
                _id={comparison._id || comparison.id}
                slug={comparison.slug}
                heroHeading={comparison.heroHeading}
                heroBody={comparison.heroBody}
                comparisonHeroImage={comparison.comparisonHeroImage}
                toolsMentioned={comparison.toolsMentioned || []}
                blogCategory={comparison.blogCategory}
                readingTime={comparison.readingTime}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}


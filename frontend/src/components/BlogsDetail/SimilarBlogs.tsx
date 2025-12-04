import { useState, useRef, useEffect } from "react";
import SimilarBlogsCard from "./SimilarBlogsCard";
import SimilarBlogsHeading from "./SimilarBlogsHeading";
import type { BlogMoreBlog } from "../../types/blogs.types";

interface SimilarBlogsProps {
  sectionTitle?: string;
  blogs?: BlogMoreBlog[];
}

export default function SimilarBlogs({
  sectionTitle = "Similar Blogs",
  blogs = [],
}: SimilarBlogsProps) {
  const formatDate = (date?: string): string => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return date;
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

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
    ? blogs.length 
    : Math.ceil(blogs.length / itemsPerView);
  
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < (isMobile ? blogs.length - 1 : totalPages - 1);

  const handlePrevious = (): void => {
    if (canGoPrevious) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = (): void => {
    if (canGoNext) {
      if (isMobile) {
        setCurrentIndex((prev) => Math.min(blogs.length - 1, prev + 1));
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

  return (
    <div className="w-full max-w-[1232px] mx-auto">
      <SimilarBlogsHeading
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
        {blogs.length > 0 ? (
          isMobile ? (
            <div className="w-full flex-shrink-0">
              <SimilarBlogsCard
                key={blogs[currentIndex]?.blogId || currentIndex}
                id={blogs[currentIndex]?.blogId || `blog-${currentIndex}`}
                slug={blogs[currentIndex]?.blogSlug}
                title={blogs[currentIndex]?.title}
                description={blogs[currentIndex]?.description}
                imageUrl={blogs[currentIndex]?.image}
                featured={blogs[currentIndex]?.featured}
                views={blogs[currentIndex]?.viewCount}
                tags={
                  (blogs[currentIndex]?.tags && blogs[currentIndex]?.tags.length > 0) 
                    ? blogs[currentIndex]?.tags 
                    : blogs[currentIndex]?.category 
                      ? [blogs[currentIndex]?.category] 
                      : blogs[currentIndex]?.blogCategory 
                        ? [blogs[currentIndex]?.blogCategory] 
                        : []
                }
                readTime={blogs[currentIndex]?.readingTime}
                date={formatDate(blogs[currentIndex]?.date)}
              />
            </div>
          ) : (
            blogs.map((blog, idx) => (
              <SimilarBlogsCard
                key={blog.blogId || idx}
                id={blog.blogId || `blog-${idx}`}
                slug={blog.blogSlug}
                title={blog.title}
                description={blog.description}
                imageUrl={blog.image}
                featured={blog.featured}
                views={blog.viewCount}
                tags={
                  (blog.tags && blog.tags.length > 0) 
                    ? blog.tags 
                    : blog.category 
                      ? [blog.category] 
                      : blog.blogCategory 
                        ? [blog.blogCategory] 
                        : []
                }
                readTime={blog.readingTime}
                date={formatDate(blog.date)}
              />
            ))
          )
        ) : (
          <>
            <SimilarBlogsCard id="blog-1" />
            <SimilarBlogsCard id="blog-2" />
          </>
        )}
      </div>
    </div>
  );
}

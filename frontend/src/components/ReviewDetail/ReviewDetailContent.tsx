import Breadcrumb from "./Breadcrumb";
import ProductHeader from "./ProductHeader";
import CompanyStats from "./CompanyStats";
import PricingSidebar from "./PricingSidebar";

interface ReviewDetailContentProps {
  reviewData: any;
}

export default function ReviewDetailContent({
  reviewData,
}: ReviewDetailContentProps) {
  return (
    <div className="relative z-10 px-[20px] md:px-[100px] py-8 md:py-20">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb title={reviewData.title} />

        {/* Main Content Grid - Responsive */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-8 mt-8">
          {/* Left Content - Product Info */}
          <div className="lg:col-span-2">
            <ProductHeader
              logoComponent={reviewData.logoComponent}
              title={reviewData.title}
              category={reviewData.category}
              shortDescription={reviewData.shortDescription}
              rating={reviewData.rating}
              totalReviews={reviewData.totalReviews}
            />

            <div className="mt-8 lg:mt-[160px]">
              <CompanyStats
                founded={reviewData.founded}
                employees={reviewData.employees}
                headquarters={reviewData.headquarters}
              />
            </div>
          </div>

          {/* Right Content - Pricing */}
          <div className="lg:col-span-1 lg:-mt-[40px]">
            <PricingSidebar title={reviewData.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

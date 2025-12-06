import React, { useState, useEffect } from "react";
import Pick from "./Pick";
import { fetchHomePage } from "../../../hooks/useHomePage";
import type { Deal } from "../../../hooks/useDeals";

const PicksGrid: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const homepageData = await fetchHomePage();
        if (homepageData.topPicks?.deals && homepageData.topPicks.deals.length > 0) {
          // Remove duplicates based on _id
          const uniqueDeals = homepageData.topPicks.deals.filter((deal, index, self) =>
            index === self.findIndex((d) => d._id === deal._id)
          );
          setDeals(uniqueDeals);
        }
      } catch (error) {
        console.error('Failed to load deals data:', error);
      }
    };

    void loadDeals();
  }, []);

  if (deals.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center items-stretch">
        {deals
          .slice(0, isDesktop ? deals.length : 3)
          .map((deal, index) => (
            <Pick
              key={`${deal._id || `deal-${index}`}-${index}`}
              appName={deal.title}
              category={deal.category || ""}
              description={deal.description || ""}
              discountPercentage={deal.discount || ""}
              savingsAmount={deal.savings || ""}
              rating={deal.rating ? `${deal.rating}/5.0 Ratings` : "No ratings"}
              verified={deal.verified ?? false}
              redeemUrl={deal.primary_cta_link || "#"}
              logoUrl={deal.logoUri}
            />
          ))}
      </div>
    </div>
  );
};

export default PicksGrid;

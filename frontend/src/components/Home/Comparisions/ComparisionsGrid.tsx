import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ComparisionsCard from "./ComparisionsCard";
import { fetchHomePage } from "../../../hooks/useHomePage";
import type { Comparison } from "../../../hooks/useHomePage";

const ComparisionsGrid: React.FC = () => {
  const navigate = useNavigate();
  const [comparisons, setComparisons] = useState<Comparison[]>([]);

  useEffect(() => {
    const loadComparisons = async () => {
      try {
        const homepageData = await fetchHomePage();
        if (homepageData.softwareComparisons?.comparisons && homepageData.softwareComparisons.comparisons.length > 0) {
          const uniqueComparisons = homepageData.softwareComparisons.comparisons.filter((comparison, index, self) =>
            index === self.findIndex((c) => c._id === comparison._id)
          );
          setComparisons(uniqueComparisons);
        }
      } catch (error) {
        console.error('Failed to load comparisons data:', error);
      }
    };

    void loadComparisons();
  }, []);

  const handleViewComparison = (comparisonId: string) => {
    navigate(`/comparison/${comparisonId}`);
  };

  if (comparisons.length === 0) {
    return null;
  }

  return (
    <div className="w-full lg: py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-stretch">
        {comparisons.map((comparison, index) => (
          <div key={`${comparison._id}-${index}`} className="w-full flex">
            <ComparisionsCard
              app1Name={comparison.toolsMentioned?.[0]?.toolName || "Tool 1"}
              app1Icon={comparison.toolsMentioned?.[0]?.toolLogo || ""}
              app2Name={comparison.toolsMentioned?.[1]?.toolName || "Tool 2"}
              app2Icon={comparison.toolsMentioned?.[1]?.toolLogo || ""}
              title={comparison.heroHeading}
              subtitle={comparison.sectionHeadline || ""}
              description={comparison.heroBody || ""}
              onViewComparison={() => handleViewComparison(comparison._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisionsGrid;

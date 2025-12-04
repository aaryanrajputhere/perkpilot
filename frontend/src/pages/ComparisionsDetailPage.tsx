import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackgroundDown from "../components/BackgroundDown";
import Brief from "../components/ComparisionsDetail/Brief";
import FeatureComparision from "../components/ComparisionsDetail/FeatureComparision";
import Hero from "../components/Shared/Hero";
import ProsCons from "../components/ComparisionsDetail/ProsCons";
import ToolsMentioned from "../components/ComparisionsDetail/ToolsMentioned";
import BlogModules from "../components/ComparisionsDetail/BlogModules";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Author from "../components/ComparisionsDetail/Author";
import SimilarComparisons from "../components/ComparisionsDetail/SimilarComparisons";
import fetchComparisonDetail from "../hooks/useComparisionDetail";
import type { ToolComparisonBlog } from "../hooks/useComparisionDetail";
import { fetchAuthorById, type Author as AuthorData } from "../hooks/useAuthor";

export default function ComparisionsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [comparison, setComparison] = useState<ToolComparisonBlog | null>(null);
  const [author, setAuthor] = useState<AuthorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!id) {
        setError("No comparison ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchComparisonDetail(id);
        setComparison(data);

        // Fetch author if authorId or author field is present
        const authorIdToFetch = data.authorId || data.author;
        if (authorIdToFetch) {
          try {
            const authorData = await fetchAuthorById(authorIdToFetch);
            setAuthor(authorData);
          } catch (authorErr) {
            console.error("Failed to fetch author:", authorErr);
            // Don't fail the whole page if author fetch fails
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch comparison");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        <Header />
        <main className="pt-[72px] sm:pt-[80px] lg:pt-[96px] pb-8 md:pb-20 lg:pb-40 flex-1 flex items-center justify-center w-full bg-[#040404] px-4">
          <p className="text-gray-400">Loading comparison...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !comparison) {
    return (
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        <Header />
        <main className="pt-[72px] sm:pt-[80px] lg:pt-[96px] pb-8 md:pb-20 lg:pb-40 flex-1 flex items-center justify-center w-full bg-[#040404] px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-4 px-4">
              {error || "Comparison Not Found"}
            </h1>
            <p className="text-gray-400 px-4">
              {error || "The comparison you're looking for doesn't exist."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Function to format ISO date to "Friday 7 November 2025" style
  const formatDate = (isoDate: string): string => {
    try {
      const date = new Date(isoDate);
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    } catch {
      return isoDate;
    }
  };

  const displayImage = comparison?.comparisonHeroImage;
  const displayTime = comparison?.createdAt ? formatDate(comparison.createdAt) : "Thursday 19 June 2025";
  const displayCategory = comparison?.pageType || "Project Management";
  const displayBreadcrumb = comparison?.heroHeading;
  const displayTitle = comparison?.heroHeading || "Notion vs obsidian vs roam research";
  const displayDescription = comparison?.heroBody || "This comprasion blogs will help you understand the difference between these three tools and which one suits you the best.";
  const displayReadTime = comparison?.readingTime ? `• ${comparison.readingTime}` : "• 9 Minute Read";

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden w-full">
      <Header />
      <main className="pt-[72px] sm:pt-[80px] lg:pt-[96px] pb-6 md:pb-12 lg:pb-20 xl:pb-40 flex-1 flex items-start justify-center w-full bg-[#040404] lg:bg-linear-to-b from-black to-[#190845]">
        <div className="w-full max-w-[1232px] mx-auto px-4 md:px-6 lg:px-8">
          <Hero
            category={displayCategory}
            breadcrumb={displayBreadcrumb}
            title={displayTitle}
            description={displayDescription}
            date={displayTime}
            readTime={displayReadTime}
            breadcrumbParentLink="/comparisons"
            breadcrumbParentLabel="Comparisons"
            imageComponent={
              displayImage ? (
                <img
                  src={displayImage}
                  alt={displayTitle}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : undefined
            }
          />
        </div>
      </main>

      {comparison.sectionHeadline && (
        <div className="flex w-full bg-[#040404] lg:bg-gradient-to-t from-black to-[#190845] pt-6 pb-6 md:pt-8 md:pb-8 lg:pt-4 lg:pb-4 xl:pt-6 xl:pb-6">
          <div className="w-full max-w-[1232px] mx-auto px-4 md:px-6 lg:px-8">
            <ToolsMentioned
              data={comparison.toolsMentioned.map(tool => ({
                ...tool,
                primaryCta: tool.primaryCta || "",
              }))}
              sectionHeadline={comparison.sectionHeadline}
              tipBulbText={comparison.tipBulbText}
            />
          </div>
        </div>
      )}

      <div className="py-6 md:py-12 lg:pt-8 lg:pb-20 xl:pt-10 xl:pb-40 flex-1 flex items-start justify-center w-full bg-[#040404] lg:bg-linear-to-b from-black to-[#190845]">
        <div className="w-full max-w-[1232px] mx-auto flex flex-col md:flex-row items-start gap-6 md:gap-8 px-4 md:px-6 lg:px-8">
          <div className="w-full flex-1 flex flex-col gap-6 min-w-0">
            <Brief data={comparison} />
            <FeatureComparision data={comparison.featuresComparison} />
            <ProsCons data={comparison.prosConsCards} />

            {/* Author Card */}
            {author && (
              <div className="w-full mt-6">
                <Author authorData={author} />
              </div>
            )}
          </div>

          <aside className="hidden md:block w-full md:w-[397px] flex-shrink-0">
            <div className="sticky top-24">
              <BlogModules data={comparison.toolBlogCards} />
            </div>
          </aside>
        </div>
      </div>

      {comparison.moreComparisons && 
       Array.isArray(comparison.moreComparisons) && 
       comparison.moreComparisons.length > 0 && (
        <div className="w-full bg-[#040404] lg:bg-gradient-to-t from-black to-[#190845] py-8 md:py-12 lg:py-16 xl:py-20 overflow-x-hidden">
          <div className="w-full max-w-[1232px] mx-auto px-4 md:px-6 lg:px-8">
            <SimilarComparisons
              sectionTitle={comparison.moreComparisonsSectionTitle || "More Comparison Tools Blog"}
              comparisons={comparison.moreComparisons}
            />
          </div>
        </div>
      )}

      <BackgroundDown />
      <Footer />
    </div>
  );
}

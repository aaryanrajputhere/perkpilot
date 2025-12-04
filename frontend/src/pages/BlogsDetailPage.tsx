import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Brief from "../components/BlogsDetail/Brief";
import Hero from "../components/Shared/Hero";
import ToolsMentioned from "../components/BlogsDetail/ToolsMentioned";
import BlogModules from "../components/BlogsDetail/BlogModules";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ToolDeal from "../components/BlogsDetail/ToolDeal";
import SimilarBlogs from "../components/BlogsDetail/SimilarBlogs";
import { fetchBlogBySlug, fetchBlogById, } from "../hooks/useBlogs";
import { type Blog } from "../types/blogs.types";
import Author from "../components/ComparisionsDetail/Author";
import { type Author as AuthorData } from "../hooks/useAuthor";

const formatDate = (date?: string | Date): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[d.getDay()];
  return `${dayName} ${d.getDate()} ${d.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
};

export default function BlogsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      if (!id) {
        setError("No blog ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const isSlug = !id.match(/^[0-9a-fA-F]{24}$/); 
        
        const blogData = isSlug 
          ? await fetchBlogBySlug(id)
          : await fetchBlogById(id);

        setBlog(blogData);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err instanceof Error ? err.message : "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    void loadBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        <Header />
        <main className="pt-[72px] sm:pt-[80px] lg:pt-[96px] pb-8 md:pb-20 lg:pb-40 flex-1 flex items-center justify-center w-full bg-[#040404] px-4">
          <p className="text-gray-400">Loading blog...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col min-h-screen relative overflow-x-hidden">
        <Header />
        <main className="pt-[72px] sm:pt-[80px] lg:pt-[96px] pb-8 md:pb-20 lg:pb-40 flex-1 flex items-center justify-center w-full bg-[#040404] px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-4 px-4">
              {error || "Blog Not Found"}
            </h1>
            <p className="text-gray-400 px-4">
              {error || "The blog you're looking for doesn't exist."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = formatDate(blog.createdAt);
  const readTime = blog.blogReadingTime || "";
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://perkpilot.com";
  const blogPath = blog.blogSlug
    ? `/blogs/${blog.blogSlug}`
    : typeof window !== "undefined"
      ? window.location.pathname
      : "";
  const shareUrl = `${origin}${blogPath}`;

  const modules = blog.modules?.map((m, idx) => ({
    id: `module-${idx}`,
    label: m.title ?? `Module ${idx + 1}`,
    benefits: m.benefits ?? [],
    checked: idx === 0,
  })) || [];

  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden w-full">
      <Header />
      <main className="pt-[72px] sm:pt-[80px] lg:pt-[96px] pb-6 md:pb-12 lg:pb-20 xl:pb-40 flex-1 flex items-start justify-center w-full bg-[#040404] lg:bg-linear-to-b from-black to-[#190845]">
        <div className="w-full max-w-[1232px] mx-auto px-4 md:px-6 lg:px-8">
        <Hero
          className="justify-center items-center"
          category={blog.blogCategory}
          title={blog.blogHeading}
          description={blog.blogBody}
          date={formattedDate}
          readTime={readTime ? `• ${readTime}` : ""}
          shareUrl={shareUrl}
          imageComponent={
            blog.blogHeroImage ? (
              <img
                src={blog.blogHeroImage}
                alt={blog.blogHeading}
                className="w-full h-full object-cover rounded-3xl"
              />
            ) : undefined
          }
        />
        </div>
      </main>
      
      {blog.sectionHeadline && (
        <div className="flex w-full bg-[#040404] lg:bg-gradient-to-t from-black to-[#190845] pt-6 pb-6 md:pt-8 md:pb-8 lg:pt-4 lg:pb-4 xl:pt-6 xl:pb-6">
          <div className="w-full max-w-[1232px] mx-auto px-4 md:px-6 lg:px-8">
          <ToolsMentioned
            sectionHeadline={blog.sectionHeadline}
              
            tipBulbText={blog.tipBulbText}
            tools={blog.blogToolsMentioned || []}
          />
          </div>
        </div>
      )}
      
      <div className="py-6 md:py-12 lg:pt-8 lg:pb-20 xl:pt-10 xl:pb-40 flex-1 flex items-start justify-center w-full bg-[#040404] lg:bg-linear-to-b from-black to-[#190845]">
        <div className="w-full max-w-[1232px] mx-auto flex flex-col md:flex-row items-start gap-6 md:gap-8 px-4 md:px-6 lg:px-8">
          <div className="w-full flex-1 flex flex-col gap-6 min-w-0">
            {blog.blogToolBlogCards?.length ? (
              blog.blogToolBlogCards.map((toolCard, idx) => (
                <div
                  key={toolCard.blogTitle ? `${toolCard.blogTitle}-${idx}` : idx}
                  id={`module-${idx}`}
                  className="flex flex-col gap-6 w-full"
                >
                  <Brief
                    title={toolCard.blogTitle}
                    content={toolCard.blogBody}
                    imageUrl={toolCard.blogImage}
                    dealsMentioned={toolCard.dealsMentioned}
                  />

                  {toolCard.dealsMentioned && toolCard.dealsMentioned.length > 0 && (
                    <ToolDeal toolBlogCard={toolCard} />
                  )}
                </div>
              ))
            ) : (
              <Brief
                title="Overview"
                content={blog.blogBody}
              />
            )}

            {/* Author Card after ToolDeal */}
            {blog.blogAuthor && typeof blog.blogAuthor === 'object' && (
            <div className="w-full mt-6">
                <Author authorData={blog.blogAuthor as AuthorData} />
            </div>
            )}
          </div>

          <aside className="hidden md:block w-full md:w-[397px] flex-shrink-0">
            <div className="sticky top-24">
              <BlogModules modules={modules} />
            </div>
          </aside>

        </div>
        
      </div>
     
      {blog.moreBlogs && blog.moreBlogs.length > 0 && (
        <div className="w-full bg-[#040404] lg:bg-gradient-to-t from-black to-[#190845] py-8 md:py-12 lg:py-16 xl:py-20 overflow-x-hidden">
          <div className="w-full max-w-[1232px] mx-auto px-4 md:px-6 lg:px-8">
          <SimilarBlogs
            sectionTitle={blog.moreBlogsSectionTitle || "Similar Blogs"}
            blogs={blog.moreBlogs}
          />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
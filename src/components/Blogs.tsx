import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./cards/BlogCard";
import { sampleBlogs } from "../data/data.ts";

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  // 0: Initial 3 cards shown. "View More" text: "View More"
  // 1: Next 3 cards shown (6 total). "View More" text: "View More"
  // 2: Next 3 cards shown (9 total). "View More" text: "View All Blogs"
  // 3: Redirect to /allBlogs
  const [viewMoreCount, setViewMoreCount] = useState(0);

  // constants for pagination logic
  const CARDS_PER_ROW = 3;
  const MAX_VIEW_MORE_CLICKS = 2;

  // Calculate the total number of cards to display based on the count
  const totalVisibleCards = CARDS_PER_ROW * (viewMoreCount + 1);
  
  // Slice the blogs array to get only the ones needed for the current view
  const visibleBlogs = sampleBlogs.slice(0, totalVisibleCards);

  let buttonText = "View More";
  let buttonAction = () => setViewMoreCount((prev) => prev + 1);
  
  if (viewMoreCount === MAX_VIEW_MORE_CLICKS) {
    buttonText = "View All Blogs";
    buttonAction = () => navigate("/allBlogs");
  }
  
  if (visibleBlogs.length < totalVisibleCards && viewMoreCount < MAX_VIEW_MORE_CLICKS) {
      buttonText = "View All Blogs ->";
      buttonAction = () => navigate("/allBlogs");
  }


  return (
    <section
      className="
        px-4 sm:px-12 py-10 
        bg-gradient-to-b from-[#0a0f1f] via-[#10182f] to-[#1c2a4f]
        min-h-screen
      "
    >
      {/* Header Section (Unchanged) */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-cyan-400">
          Latest Blog Posts
        </h2>
        <p className="mt-2 max-w-xl mx-auto" style={{ color: "#9bbbd4" }}>
          Insights on DSA, System Design, DBMS, and latest tech trends
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center rounded border border-cyan-500 bg-transparent px-4 py-2 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
          onClick={() => navigate("/allBlogs")}
        >
          View All Blogs
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Dynamic Grid Container */}
      <div
        className="
          grid 
          grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
          gap-8 
          max-w-screen-xl mx-auto 
          pb-8
        "
        aria-label="Grid of blog posts"
      >
        {visibleBlogs.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No recent blogs available.
          </p>
        ) : (
          visibleBlogs.map((blog) => (
            <div
              key={blog.id}
              // The BlogCard component should handle its own min/max width internally
              // based on the grid cell it occupies.
            >
              <BlogCard blog={blog} />
            </div>
          ))
        )}
      </div>
      
      {sampleBlogs.length > visibleBlogs.length || viewMoreCount < MAX_VIEW_MORE_CLICKS ? (
        <div className="text-center mt-6">
          <button
            type="button"
            className={`
              inline-flex items-center rounded-full border px-6 py-3 font-semibold 
              ${viewMoreCount === MAX_VIEW_MORE_CLICKS 
                ? 'border-cyan-500 bg-transparent text-cyan-400 hover:bg-cyan-500 hover:text-black' 
                : 'border-gray-500 bg-gray-700 text-gray-200 hover:bg-gray-600'}
              transition-colors duration-200
            `}
            onClick={buttonAction}
          >
            {buttonText}
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default Blogs;
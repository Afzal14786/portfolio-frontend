import React from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "./cards/BlogCard";
import type { Blog } from "../types/Blog";

const sampleBlogs: Blog[] = [
  {
    id: "1",
    topic: "Database Sharding",
    readTime: "8 min read",
    title: "Understanding Database Sharding",
    postingDate: "2024-09-01T12:00:00Z",
    description:
      "Database sharding is a method for distributing data across multiple machines to improve scalability and performance. In this article, we explore different sharding strategies...",
    tags: ["database", "scaling", "sharding"],
  },
  {
    id: "2",
    topic: "System Design",
    readTime: "10 min read",
    title: "Building Scalable Systems",
    postingDate: "2024-08-20T08:30:00Z",
    description:
      "Scalability is key to handling increasing loads. This blog covers important concepts such as load balancing, caching, and horizontal scaling techniques.",
    tags: ["system design", "scalability", "architecture"],
  },
  {
    id: "3",
    topic: "DSA",
    readTime: "5 min read",
    title: "Mastering Data Structures",
    postingDate: "2024-07-15T15:45:00Z",
    description:
      "Data structures are fundamental to computer science. Learn about arrays, linked lists, trees, graphs, and how to use them effectively.",
    tags: ["dsa", "algorithms", "programming"],
  },
  {
    id: "4",
    topic: "Tech Trends",
    readTime: "7 min read",
    title: "Latest Trends in Technology",
    postingDate: "2024-09-10T10:00:00Z",
    description:
      "Technology evolves rapidly. Stay updated on the newest trends like AI advancements, blockchain, and cloud computing that are shaping the future.",
    tags: ["technology", "AI", "blockchain"],
  },
];

const Blogs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="
        px-4 sm:px-12 py-10 
        bg-gradient-to-b from-[#0a0f1f] via-[#10182f] to-[#1c2a4f]
        min-h-screen
      "
    >
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
          onClick={() => navigate("/blogs")}
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

      <div
        className="flex gap-6 overflow-x-auto scrollbar-hide px-2"
        aria-label="Scrollable list of blog posts"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {sampleBlogs.length === 0 ? (
          <p className="text-gray-500 text-center w-full">
            No blogs available.
          </p>
        ) : (
          sampleBlogs.map((blog) => (
            <div
              key={blog.id}
              className="scroll-snap-start flex-shrink-0"
              style={{ minWidth: "280px" }}
            >
              <BlogCard blog={blog} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Blogs;
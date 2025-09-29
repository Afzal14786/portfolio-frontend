import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/cards/BlogCard.tsx';
import { sampleBlogs } from "../data/data.ts";
import type { Blog } from "../types/Blog.ts";
import profileImage from "../assets/profileImage.jpeg"
import banner from "../assets/banner.png";

// Configuration
const USER_NAME = "Md Afzal Ansari";

const ACCENT_COLOR_TITLE = "#FF5722";
const ACCENT_COLOR_TEXT = "#64FFDA";
const CARDS_PER_ROW = 3;

const BlogGroup: React.FC<{ subject: string, blogs: Blog[] }> = ({ subject, blogs }) => {
    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);
    const visibleBlogs = showAll ? blogs : blogs.slice(0, CARDS_PER_ROW);
    const hasMoreBlogs = blogs.length > CARDS_PER_ROW;

    return (
        <div className="mb-16 last:mb-0">
            <h2 className="text-3xl font-extrabold text-white mb-6 border-b-2 border-gray-700 pb-2">
                {subject}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
            {(hasMoreBlogs || showAll) && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="inline-flex items-center rounded-full border px-8 py-3 font-semibold transition-all duration-300 shadow-lg"
                        style={{
                            borderColor: ACCENT_COLOR_TEXT,
                            color: ACCENT_COLOR_TEXT,
                            backgroundColor: "#1a203c"
                        }}
                    >
                        {showAll ? "Collapse View" : "View All"}
                    </button>
                </div>
            )}
        </div>
    );
};

const AllBlogs: React.FC = () => {
    const groupedBlogs = useMemo(() => {
        return sampleBlogs.reduce((acc, blog) => {
            const subject = blog.subject || 'Uncategorized';
            if (!acc[subject]) acc[subject] = [];
            acc[subject].push(blog);
            return acc;
        }, {} as Record<string, Blog[]>);
    }, []);

    const subjects = Object.keys(groupedBlogs);

    return (
        <div className="min-h-screen bg-[#070b18] text-gray-200">
            
            {/* --- Banner + Profile --- */}
            <div className="relative w-full">
                <img 
                    src={banner} 
                    alt="Banner" 
                    className="w-full h-40 sm:h-52 object-cover"
                />
                
                {/* Profile Image + Name */}
                <div className="max-w-7xl mx-auto px-4 sm:px-8">
                    <div className="flex items-center space-x-4 -mt-12 sm:-mt-16">
                        <img 
                            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg bg-white"
                            src={profileImage}
                            alt="User Avatar"
                        />
                        <p className="text-xl sm:text-2xl font-semibold text-white">{USER_NAME}</p>
                    </div>
                </div>
            </div>

            {/* --- Title Below Banner --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 mb-12">
                <h1 className="text-4xl md:text-6xl font-extrabold" style={{ color: ACCENT_COLOR_TITLE }}>
                    The Technical Archive
                </h1>
                <p className="text-lg md:text-xl mt-2" style={{ color: ACCENT_COLOR_TEXT }}>
                    Deep dives into DSA, System Design, Cloud, and the latest tech trends.
                </p>
            </div>

            {/* --- Blog Sections --- */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
                {subjects.length === 0 ? (
                    <p className="text-gray-500 text-center text-xl mt-12">
                        No blog posts found. Check data source.
                    </p>
                ) : (
                    subjects.map((subject) => (
                        <BlogGroup 
                            key={subject} 
                            subject={subject} 
                            blogs={groupedBlogs[subject]} 
                        />
                    ))
                )}
            </main>
        </div>
    );
};

export default AllBlogs;

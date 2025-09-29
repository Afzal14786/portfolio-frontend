import React, { useEffect, useState, useRef } from "react";
import type { MouseEvent, ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sampleBlogs } from "../data/data.ts";
import type { Blog } from "../types/Blog";
import profileImage from "../assets/profileImage.jpeg"; 
import { toast } from 'react-toastify';

// importing images
import twitter from '../assets/twitter.png'; 
import facebook from '../assets/facebook.png'; 
import linkedin from '../assets/linkedin.png'; 

// --- TYPE DEFINITIONS ---

type FullBlog = Blog & {
    fullContent: string;
};

interface ActionButtonProps {
    icon: ReactElement;
    label: string;
    count?: number;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    isActive?: boolean;
    className?: string;
    buttonClassName?: string;
}

interface SharePopoverProps {
    blogTitle: string;
    isVisible: boolean;
    onClose: () => void;
    positionClass?: string;
}

// --- CONSTANTS & UTILITIES ---

const AUTHOR_NAME = "Md Afzal Ansari";

const topicGradients = [
  'from-purple-500 to-indigo-600', 'from-cyan-400 to-blue-500', 'from-pink-500 to-rose-500',
  'from-green-400 to-teal-500', 'from-yellow-400 to-orange-400', 'from-blue-600 to-purple-700',
];

function getRandomGradient(topic: string) {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = topic.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % topicGradients.length;
  return topicGradients[index];
}

// --- HELPER COMPONENTS ---

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, count, onClick, isActive, className = '', buttonClassName = '' }) => (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
        <button 
            aria-label={label} 
            onClick={onClick}
            className={`transition-colors p-3 rounded-full ${isActive ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} ${buttonClassName}`}
        >
            {icon}
        </button>
        {count !== undefined && <span className="text-xs text-gray-400 font-medium">{count}</span>}
    </div>
);

const SharePopover: React.FC<SharePopoverProps> = ({ blogTitle, isVisible, onClose, positionClass = '' }) => {
    const pageUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blogTitle);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Logic to close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | globalThis.MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside as (e: globalThis.MouseEvent) => void);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside as (e: globalThis.MouseEvent) => void);
        };
    }, [isVisible, onClose]);
    
    // Social share options using imported PNGs/SVGs
    const shareOptions = [
        { 
            name: "Share on X (Twitter)", 
            icon: <img src={twitter} alt="X Icon" className="w-4 h-4" />,
            url: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${title}`
        },
        { 
            name: "Share on Facebook", 
            icon: <img src={facebook} alt="Facebook Icon" className="w-4 h-4" />,
            url: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`
        },
        { 
            name: "Share on LinkedIn", 
            icon: <img src={linkedin} alt="LinkedIn Icon" className="w-4 h-4" />,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${title}`
        },
        {
            name: "Copy link",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 group-hover:text-cyan-400"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            ),
            onClick: () => {
                navigator.clipboard.writeText(decodeURIComponent(pageUrl));
                // FIX: Actual toast notification integration
                toast.success('Link copied to clipboard!', { position: "top-center", autoClose: 2000 }); 
                onClose();
            }
        }
    ];

    if (!isVisible) return null;

    return (
        <div 
            ref={popoverRef}
            className={`absolute w-56 rounded-lg bg-[#161b22] shadow-xl border border-gray-700 z-50 text-sm overflow-hidden ${positionClass}`}
        >
            {shareOptions.map((option) => (
                <a 
                    key={option.name} 
                    href={option.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={option.onClick ? option.onClick : onClose}
                    className="flex items-center space-x-3 p-3 transition-colors duration-150 hover:bg-gray-700/50 group"
                >
                    {option.icon} 
                    <span className="text-gray-300 group-hover:text-cyan-400">{option.name}</span>
                </a>
            ))}
        </div>
    );
};


const ReadBlog: React.FC = () => {
  const { blogId, subjectSlug: _subjectSlug, titleSlug: _titleSlug } = useParams<{ 
    blogId: string; 
    subjectSlug?: string;
    titleSlug?: string; 
  }>();

  const navigate = useNavigate();
  
  const [blog, setBlog] = useState<FullBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showSharePopoverDesktop, setShowSharePopoverDesktop] = useState(false);
  const [showSharePopoverMobile, setShowSharePopoverMobile] = useState(false);
  
  const [likes, setLikes] = useState(0); 
  const [isLiked, setIsLiked] = useState(false);

  // Fetches and initializes blog data and mock likes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const foundBlog = sampleBlogs.find(b => b.id === blogId);

    if (foundBlog) {
      const fullContentBlog: FullBlog = {
          ...foundBlog,
          fullContent: foundBlog.description.repeat(4) 
      }
      setBlog(fullContentBlog);
      setLikes(100 + parseInt(blogId || '0', 10) * 5); 
    } else {
      setBlog(null);
      setError(`Blog post with ID: ${blogId} not found.`);
    }
    
    setLoading(false);
  }, [blogId]);

  // --- INTERACTION HANDLERS ---

  const handleLikeClick = () => {
    setIsLiked(prev => !prev);
    setLikes(prev => prev + (isLiked ? -1 : 1));
  };

  const handleShareClickDesktop = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    setShowSharePopoverDesktop(prev => !prev);
    setShowSharePopoverMobile(false);
  };

  const handleShareClickMobile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    setShowSharePopoverMobile(prev => !prev);
    setShowSharePopoverDesktop(false);
  };
  
  const handleClosePopoverDesktop = () => setShowSharePopoverDesktop(false);
  const handleClosePopoverMobile = () => setShowSharePopoverMobile(false);

  // --- RENDERING SETUP ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-cyan-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen p-8 flex flex-col items-center bg-[#0d1117] text-red-400">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-lg">{error}</p>
        <button
            onClick={() => navigate("/")}
            className="mt-6 text-cyan-400 hover:text-cyan-500 transition-colors border border-cyan-400 px-4 py-2 rounded-lg"
        >
            Go to Home
        </button>
      </div>
    );
  }

  const topicGradient = getRandomGradient(blog.topic);
  const formattedDate = new Date(blog.postingDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Reusable share icon SVG
  const shareIcon = (
    <svg className="w-6 h-6 text-gray-400 hover:text-green-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.45 1.25.71 2.04.71 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L7.14 9.87c-.54-.45-1.25-.71-2.04-.71-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.26 2.04-.71l7.12 4.16c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  );

  // Like icon SVG
  const likeIcon = (
    <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path fill={isLiked ? "currentColor" : "none"} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );

  // --- MAIN COMPONENT RETURN ---

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-200 relative">
        
      {/* Fixed Sidebar for Icons (Desktop) */}
      <div className="fixed left-0 top-0 h-full hidden xl:flex items-center justify-start p-6 z-10">
          <div className="flex flex-col space-y-4 p-3 bg-[#161b22] rounded-xl shadow-2xl border border-gray-700">
              
              <ActionButton 
                  label="Like" 
                  count={likes}
                  onClick={handleLikeClick}
                  isActive={isLiked}
                  icon={likeIcon}
              />
              
              {/* Share Button (Desktop) - Includes Popover */}
              <div className="relative">
                <ActionButton 
                    label="Share" 
                    onClick={handleShareClickDesktop}
                    icon={shareIcon}
                    buttonClassName="z-20"
                />
                <SharePopover 
                    blogTitle={blog.title} 
                    isVisible={showSharePopoverDesktop} 
                    onClose={handleClosePopoverDesktop} 
                    positionClass="left-full top-0 ml-4" 
                />
              </div>
          </div>
      </div>
      
      {/* Article Content Container */}
      <article className="max-w-4xl mx-auto px-4 py-12 md:px-6 lg:px-8 xl:px-4">
        
        {/* Topic Heading */}
        <span
          className={`inline-block mb-4 rounded-full px-4 py-1 text-sm font-semibold bg-gradient-to-r ${topicGradient} text-white select-none`}
        >
          {blog.topic}
        </span>
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          {blog.title}
        </h1>
        
        {/* Author and Metadata Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-700 pb-4 mb-8 space-y-4 sm:space-y-0">
          
          {/* Author/Writer Name */}
          <div className="flex items-center space-x-3">
            <img 
                className="w-10 h-10 rounded-full object-cover border border-cyan-400" 
                src={profileImage} 
                alt={AUTHOR_NAME}
            />
            <p className="text-sm font-semibold text-gray-400">{AUTHOR_NAME}</p>
          </div>
          
          {/* Date and Read Time */}
          <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
            <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Main Content Area - Image/Box */}
        <div className="relative mb-8 aspect-video w-full rounded-xl overflow-hidden shadow-2xl bg-gray-900 border border-gray-700">
            {blog.imageUrl ? (
                <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className={`flex items-center justify-center w-full h-full bg-gradient-to-r ${topicGradient} text-white text-xl md:text-3xl font-bold p-6 md:p-10 text-center`}>
                    No Image Available
                </div>
            )}
        </div>
        
        {/* Mobile/Tablet Action Icons */}
        <div className="flex justify-center space-x-6 mb-8 xl:hidden bg-[#161b22] p-4 rounded-xl border border-gray-700">
             
            {/* Like Button with Count */}
            <ActionButton 
                label="Like" 
                count={likes}
                onClick={handleLikeClick}
                isActive={isLiked}
                icon={likeIcon}
                className="flex-row items-center space-x-2 space-y-0"
            />
            
            {/* Share Button (Mobile) - Includes Popover */}
            <div className="relative">
                <ActionButton 
                    label="Share" 
                    onClick={handleShareClickMobile}
                    icon={shareIcon}
                />
                <SharePopover 
                    blogTitle={blog.title} 
                    isVisible={showSharePopoverMobile} 
                    onClose={handleClosePopoverMobile} 
                    positionClass="left-1/2 -translate-x-1/2 mt-2"
                />
            </div>

        </div>

        {/* Blog Content */}
        <div className="prose prose-xl prose-invert max-w-none text-lg leading-relaxed text-gray-300">
            <p className="mb-6">{blog.description}</p>
            <p className="mb-6">
                This is the main body of the blog post. In a real application, this content would be loaded from a separate markdown or HTML file. For example, this section would dive deep into access control strategies.
            </p>
            <h3 className="text-2xl md:text-3xl mt-10 mb-4 font-bold border-b border-gray-800 pb-2">Key Takeaways from {blog.topic}</h3>
            <p>{blog.fullContent}</p> 
            <p>
                The distributed nature of modern applications demands a clear understanding of data partitioning strategies. Whether you choose Range, Hash, or Directory sharding, consistency checks and resharding mechanisms will always be the most complex operational tasks.
            </p>
        </div>
        
        {/* Footer Section */}
        <div className="mt-12 pt-6 border-t border-gray-700">
             {/* Tags */}
             <div className="flex flex-wrap gap-3 mb-6">
                {blog.tags?.map((tag) => (
                    <span
                        key={tag}
                        className="bg-gray-800 text-cyan-400 text-sm px-4 py-1 rounded-full font-medium shadow-md"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end text-sm text-gray-500 space-y-2 sm:space-y-0">
                {/* Last Update */}
                <div className="flex items-center text-gray-400">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.836 0H20v-5m-14.213 6.467l-2.433 2.433m4.866 4.866l-2.433-2.433M20 12h.01M10 12h.01M4 12h.01M12 17.5l4-4 4 4"/></svg>
                    <span>Last Update: {formattedDate}</span>
                </div>
                {/* Thank You */}
                <span className="text-gray-300 font-semibold text-lg border-b border-cyan-500">Thank You For Reading</span>
            </div>
        </div>
      </article>
    </div>
  );
};

export default ReadBlog;
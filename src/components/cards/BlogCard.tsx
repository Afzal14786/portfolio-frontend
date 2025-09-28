import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../types/Blog';

const topicGradients = [
  'from-purple-500 to-indigo-600',
  'from-cyan-400 to-blue-500',
  'from-pink-500 to-rose-500',
  'from-green-400 to-teal-500',
  'from-yellow-400 to-orange-400',
  'from-blue-600 to-purple-700',
];

function getRandomGradient(topic: string) {
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = topic.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % topicGradients.length;
  return topicGradients[index];
}

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  const descriptionPreview =
    blog.description.length > 250 ? blog.description.slice(0, 250) + '...more' : blog.description;

  const topicGradient = getRandomGradient(blog.topic);

  return (
    <article
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      className="flex flex-col cursor-pointer rounded-lg border border-gray-700 bg-gradient-to-br from-[#0d1117] to-[#161b22] p-5 shadow-lg
      min-w-[280px] max-w-[320px] md:max-w-[360px] h-[440px] hover:shadow-cyan-500/50 transition-shadow duration-300
      focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      {/* Header: topic badge and read time */}
      <header className="flex items-center justify-between mb-3">
        <span
          className={`inline-block rounded-md px-3 py-1 text-sm font-semibold bg-gradient-to-r ${topicGradient} text-white select-none`}
        >
          {blog.topic}
        </span>
        <div className="flex items-center text-gray-400 text-xs select-none">
          {/* Watch icon */}
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {blog.readTime}
        </div>
      </header>

      {/* Centered Image or Title placeholder */}
      <div className="flex-grow flex items-center justify-center mb-4">
        <div className="h-36 w-full rounded-md overflow-hidden flex items-center justify-center bg-gray-800">
          {blog.imageUrl ? (
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="object-contain w-full h-full"
              loading="lazy"
            />
          ) : (
            <div
              className={`flex items-center justify-center w-full h-full bg-gradient-to-r ${topicGradient} text-white text-xl font-bold px-3 text-center break-words select-none`}
              aria-label={blog.title}
            >
              {blog.title}
            </div>
          )}
        </div>
      </div>

      {/* Title & posting date */}
      <div>
        <h3 className="text-white font-semibold text-lg md:text-xl mb-1 break-words">{blog.title}</h3>
        <div className="flex items-center text-gray-400 text-xs space-x-1 mb-3 select-none">
          {/* Calendar icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <time dateTime={new Date(blog.postingDate).toISOString()}>
            {new Date(blog.postingDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>
      </div>

      {/* Description & Tags container */}
      <div className="flex flex-col">
        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 overflow-hidden">{descriptionPreview}</p>

        {/* Tags */}
        <footer className="flex flex-wrap gap-2 mt-auto">
          {blog.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-md select-none"
            >
              #{tag}
            </span>
          ))}
        </footer>
      </div>
    </article>
  );
};

export default BlogCard;

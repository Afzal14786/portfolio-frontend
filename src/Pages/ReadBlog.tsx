import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { BlogService } from '../services/blog.service';
import type { Blog } from '../types/blog';

const extractSingleBlog = (response: unknown): Blog | null => {
  if (!response) return null;
  const res = response as Record<string, unknown>;

  if (res.data) {
    const inner1 = res.data as Record<string, unknown>;
    if (inner1.blog) return inner1.blog as Blog;
    if (inner1.data) {
      const inner2 = inner1.data as Record<string, unknown>;
      if (inner2.blog) return inner2.blog as Blog;
    }
  }
  
  if (res.blog) return res.blog as Blog;
  return null;
};

const ReadBlog = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      if (!slug) return;
      try {
        const rawResponse = await BlogService.getBlogBySlug(slug);
        const fetchedBlog = extractSingleBlog(rawResponse);
        
        if (fetchedBlog) {
           setBlog(fetchedBlog);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F2F2F7]">
        <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7]">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Article not found</h2>
        <Link to="/allBlogs" className="text-blue-600 font-bold hover:underline">Return to articles</Link>
      </div>
    );
  }

  const imgUrl = typeof blog.coverImage === 'string' ? blog.coverImage : blog.coverImage?.url || '/images/default_banner.jpg';
  const date = new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <article className="min-h-screen pt-32 pb-32">
      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Link to="/allBlogs" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors">
          <ArrowLeft size={18} /> Back to Articles
        </Link>
        <div className="flex items-center gap-4 text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">
          <div className="flex items-center gap-1.5"><Calendar size={16} className="text-blue-500" /> {date}</div>
          {blog.readTime && <div className="flex items-center gap-1.5"><Clock size={16} className="text-blue-500" /> {blog.readTime}</div>}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">{blog.title}</h1>
        <div className="flex flex-wrap gap-2">
          {blog.tags?.map((tag, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 backdrop-blur-md border border-white rounded-lg text-xs font-bold text-slate-600 shadow-sm">
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-xl border border-white/60 bg-slate-100">
          <img src={imgUrl} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="prose prose-slate lg:prose-lg prose-img:rounded-2xl prose-img:shadow-lg prose-headings:font-bold prose-a:text-blue-600 max-w-none" 
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
      </div>
    </article>
  );
};

export default ReadBlog;
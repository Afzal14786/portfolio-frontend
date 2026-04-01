import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { BlogService } from '../../services/blog.service';
import type { Blog } from '../../types/blog';

const generateExcerpt = (html: string, max: number = 120): string => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.length > max ? text.substring(0, max) + '...' : text;
};

const extractBlogs = (response: unknown): Blog[] => {
  if (!response) return [];
  const res = response as Record<string, unknown>;
  if (res.data) {
    const inner1 = res.data as Record<string, unknown>;
    if (Array.isArray(inner1.blogs)) return inner1.blogs as Blog[];
    if (inner1.data) {
      const inner2 = inner1.data as Record<string, unknown>;
      if (Array.isArray(inner2.blogs)) return inner2.blogs as Blog[];
    }
  }
  if (Array.isArray(res.blogs)) return res.blogs as Blog[];
  return [];
};

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const rawResponse = await BlogService.getPublishedBlogs();
        const fetchedBlogs = extractBlogs(rawResponse);
        
        if (fetchedBlogs.length > 0) {
          setBlogs(fetchedBlogs.slice(0, 3));
        }
      } catch (error: unknown) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <section id="blogs" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Latest Writings</h2>
            <p className="text-lg text-slate-500 max-w-2xl font-medium">Thoughts and insights on software development and modern tech.</p>
          </div>
          <Link to="/allBlogs" className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 hover:bg-white backdrop-blur-md border border-white/80 text-slate-800 font-bold rounded-xl shadow-sm transition-all group">
            View All Articles <ArrowRight size={18} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => {
              const imgUrl = typeof blog.coverImage === 'string' ? blog.coverImage : blog.coverImage?.url || '/images/default_banner.jpg';
              const date = new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

              return (
                <Link key={blog._id} to={`/blog/${blog.slug}`} className="group flex flex-col bg-white/60 backdrop-blur-md border border-white/60 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img src={imgUrl} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                      <Calendar size={14} className="text-blue-500"/> {date}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                    <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-3 leading-relaxed">
                      {blog.excerpt || generateExcerpt(blog.content)}
                    </p>
                    <div className="mt-auto flex items-center font-bold text-sm text-blue-600">
                      Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-sm">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="font-bold text-slate-700">No Articles Yet</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
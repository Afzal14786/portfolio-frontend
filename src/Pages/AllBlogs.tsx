import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import { BlogService } from '../services/blog.service';
import type { Blog } from '../types/blog';

const generateExcerpt = (html: string, max: number = 150): string => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  return text.length > max ? text.substring(0, max) + '...' : text;
};

// Bulletproof, any-free extractor for Arrays
const extractBlogs = (response: unknown): Blog[] => {
  if (!response) return [];
  const res = response as Record<string, unknown>;

  // Check response.data (Axios wrap level)
  if (res.data) {
    const inner1 = res.data as Record<string, unknown>;
    
    // Check response.data.blogs
    if (Array.isArray(inner1.blogs)) return inner1.blogs as Blog[];
    
    // Check response.data.data.blogs (Double wrapped)
    if (inner1.data) {
      const inner2 = inner1.data as Record<string, unknown>;
      if (Array.isArray(inner2.blogs)) return inner2.blogs as Blog[];
    }
  }
  
  // Direct response.blogs
  if (Array.isArray(res.blogs)) return res.blogs as Blog[];
  
  return [];
};

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const rawResponse = await BlogService.getPublishedBlogs();
        
        // Pass the raw response into our safe extractor
        const fetchedBlogs = extractBlogs(rawResponse);
        
        if (fetchedBlogs.length > 0) {
          setBlogs(fetchedBlogs);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch all blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filtered = blogs.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F2F2F7]">
        <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-6 transition-colors">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">All Articles</h1>
        </div>
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title or tag..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-700 font-medium" 
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(blog => {
            const imgUrl = typeof blog.coverImage === 'string' ? blog.coverImage : blog.coverImage?.url || '/images/default_banner.jpg';
            const date = new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            return (
              <Link key={blog._id} to={`/blog/${blog.slug}`} className="group flex flex-col bg-white/60 backdrop-blur-md border border-white/60 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="h-48 bg-slate-100 overflow-hidden">
                  <img src={imgUrl} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-2">
                    <Calendar size={14} className="text-blue-500"/> {date}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium line-clamp-3 mb-4">
                    {blog.excerpt || generateExcerpt(blog.content)}
                  </p>
                  <div className="mt-auto flex gap-2">
                    {blog.tags?.slice(0,2).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/80 rounded-md text-xs font-bold text-slate-500">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/60">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="font-bold text-slate-700">No Articles Found</h3>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
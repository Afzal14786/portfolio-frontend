import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ProfileService } from '../../services/profile.service';
import type { UserProfile } from '../../types/profile';

interface ProfileApiResponse {
  success: boolean;
  data: UserProfile | { profile: UserProfile };
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const rawResponse = await ProfileService.getPublicProfile();
        const response = rawResponse as unknown as ProfileApiResponse;
        
        let profileData: UserProfile | null = null;
        if (response && response.data) {
          if ('profile' in response.data && response.data.profile) {
             profileData = response.data.profile;
          } else {
             profileData = response.data as UserProfile;
          }
        }
        if (profileData) setUser(profileData);
      } catch (error: unknown) {
        console.error("Failed to fetch profile for header:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname);
      return;
    }

    const handleScroll = () => {
      const sections = ['journey', 'skills', 'projects', 'connect'];
      let currentSection = '/';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            currentSection = `/#${section}`;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Journey', path: '/#journey' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Blogs', path: '/allBlogs' },
    { name: 'Connect', path: '/#connect' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '');
      
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          const yOffset = -100; // Offset for the fixed header
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          window.history.pushState(null, '', path);
          setActiveSection(path);
        }
      }
    } else if (path === '/') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveSection('/');
      }
    }
  };

  const profileImageUrl = typeof user?.profile_image === 'string' 
    ? user.profile_image 
    : user?.profile_image?.url || '/images/default_user.png'; // Fallback to public folder

  return (
    <header className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-full px-8 py-3.5 flex items-center justify-between pointer-events-auto transition-all">
        
        {/* Logo */}
        <Link to="/" onClick={(e) => scrollToSection(e, '/')} className="text-xl font-extrabold tracking-tighter text-slate-900">
          Afzal<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.path;
            
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => scrollToSection(e, link.path)}
                className={`relative text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 py-1
                  ${isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}
                `}
              >
                {link.name}
                {/* Animated Underline */}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-blue-600 transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 hover:w-full'}
                `}></span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Image */}
        <div className="hidden md:block">
          <Link to="/me" className="block hover:scale-105 transition-transform duration-200">
            <img 
              src={profileImageUrl} 
              alt="Profile" 
              className="w-9 h-9 rounded-full object-cover border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.1)]"
            />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white/70 backdrop-blur-3xl border border-white/60 shadow-2xl rounded-2xl p-3 flex flex-col space-y-1 pointer-events-auto md:hidden">
          {navLinks.map((link) => {
             const isActive = activeSection === link.path;
             return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => scrollToSection(e, link.path)}
                className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors
                  ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-white/50'}
                `}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/me"
            className="px-4 py-2.5 text-sm text-blue-600 font-semibold rounded-lg hover:bg-white/50 border-t border-slate-200/50 mt-1"
          >
            View Full Profile
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
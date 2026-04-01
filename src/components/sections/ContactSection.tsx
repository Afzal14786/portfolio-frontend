import { useState, useEffect } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  Globe, 
  Code2, 
  BookOpen,
  ArrowUpRight,
  type LucideIcon
} from 'lucide-react';
import { ProfileService } from '../../services/profile.service';
import type { UserProfile } from '../../types/profile';

interface WrappedProfileResponse {
  success: boolean;
  data: UserProfile | { profile: UserProfile };
}

interface SocialConfig {
  icon: LucideIcon;
  color: string;
  name: string;
}

const getSocialConfig = (key: string): SocialConfig => {
  const configs: Record<string, SocialConfig> = {
    github: { icon: Github, color: 'hover:border-slate-800 hover:shadow-slate-800/20 text-slate-800', name: 'GitHub' },
    linkedin: { icon: Linkedin, color: 'hover:border-blue-600 hover:shadow-blue-600/20 text-blue-600', name: 'LinkedIn' },
    twitter: { icon: Twitter, color: 'hover:border-sky-500 hover:shadow-sky-500/20 text-sky-500', name: 'Twitter / X' },
    instagram: { icon: Instagram, color: 'hover:border-pink-600 hover:shadow-pink-600/20 text-pink-600', name: 'Instagram' },
    facebook: { icon: Facebook, color: 'hover:border-blue-700 hover:shadow-blue-700/20 text-blue-700', name: 'Facebook' },
    leetcode: { icon: Code2, color: 'hover:border-orange-500 hover:shadow-orange-500/20 text-orange-500', name: 'LeetCode' },
    medium: { icon: BookOpen, color: 'hover:border-slate-900 hover:shadow-slate-900/20 text-slate-900', name: 'Medium' },
    portfolio: { icon: Globe, color: 'hover:border-indigo-500 hover:shadow-indigo-500/20 text-indigo-500', name: 'Other Portfolio' },
    blogSite: { icon: Globe, color: 'hover:border-emerald-500 hover:shadow-emerald-500/20 text-emerald-500', name: 'Personal Blog' },
  };
  
  return configs[key] || { 
    icon: Globe, 
    color: 'hover:border-slate-500 hover:shadow-slate-500/20 text-slate-500', 
    name: key.charAt(0).toUpperCase() + key.slice(1) 
  };
};

const ContactSection = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const rawResponse = await ProfileService.getPublicProfile();
        const response = rawResponse as unknown as WrappedProfileResponse;
        
        // Extract the nested profile data robustly without 'any'
        let profileData: UserProfile | null = null;
        
        if (response && response.data) {
          if ('profile' in response.data && response.data.profile) {
             profileData = response.data.profile;
          } else {
             profileData = response.data as UserProfile;
          }
        }

        if (profileData) {
          setProfile(profileData);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch profile for connect section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section id="connect" className="py-24 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </section>
    );
  }

  if (!profile) return null;
  const activeSocialLinks = profile.social_media 
    ? Object.entries(profile.social_media)
        .filter(([url]) => typeof url === 'string' && url.trim() !== '')
        .map(([key, url]) => [key, url as string] as const)
    : [];

  return (
    <section id="connect" className="relative py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Let's Connect
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Primary Action: Direct Email Card (Left Side) */}
          <div className="lg:col-span-4 flex flex-col justify-center bg-white/60 backdrop-blur-md border border-white/80 rounded-[2.5rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
            
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-105 duration-300">
              <Mail size={32} strokeWidth={2.5} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Send an Email</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              Prefer direct communication? Drop me an email and I'll get back to you as soon as possible.
            </p>
            
            <a 
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center w-full gap-2 px-6 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/25 mt-auto"
            >
              {profile.email} <ArrowUpRight size={18} />
            </a>
          </div>

          {/* Social Links Grid (Right Side) */}
          <div className="lg:col-span-8">
            {activeSocialLinks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {activeSocialLinks.map(([key, url]) => {
                  const config = getSocialConfig(key);
                  const Icon = config.icon;

                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center justify-center gap-4 p-8 bg-white/50 backdrop-blur-sm border-2 border-white/60 rounded-[2rem] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white group ${config.color}`}
                    >
                      <Icon size={36} strokeWidth={1.5} className="transition-transform duration-300 group-hover:scale-110" />
                      <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {config.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 bg-white/40 backdrop-blur-sm rounded-[2.5rem] border border-white/60">
                <p className="text-slate-500 font-medium text-lg">No social links configured yet.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
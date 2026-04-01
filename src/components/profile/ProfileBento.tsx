import { useState, useEffect } from 'react';
import { Quote, Heart, BookOpen, ExternalLink } from 'lucide-react';
import { ProfileService } from '../../services/profile.service';
import type { UserProfile } from '../../types/profile';

interface WrappedProfileResponse {
  success: boolean;
  data: UserProfile | { profile: UserProfile };
}

const ProfileBento = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const rawResponse = await ProfileService.getPublicProfile();
        const response = rawResponse as unknown as WrappedProfileResponse;
        
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
        console.error("Failed to fetch profile bento data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        <div className="md:col-span-2 h-48 bg-white/40 rounded-[2rem]"></div>
        <div className="md:col-span-1 h-48 bg-white/40 rounded-[2rem]"></div>
        <div className="md:col-span-3 h-64 bg-white/40 rounded-[2rem]"></div>
      </div>
    );
  }

  if (!profile) return null;

  // Safely extract data arrays
  const hobbies = Array.isArray(profile.hobbies) ? profile.hobbies : [];
  const resources = Array.isArray(profile.reading_resources) ? profile.reading_resources : [];
  const quote = profile.quote || "Code is like humor. When you have to explain it, it's bad.";

  // If there is absolutely no data for this section, we don't render it.
  if (!quote && hobbies.length === 0 && resources.length === 0) return null;

  return (
    <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* 1. Philosophy / Quote Card (Spans 2 columns on desktop) */}
      <div className="md:col-span-2 bg-white/50 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-center">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none"></div>
        
        <Quote size={40} className="text-blue-500/30 mb-6 group-hover:text-blue-500/50 transition-colors duration-500 transform group-hover:-translate-y-1" />
        
        <blockquote className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight tracking-tight mb-4 relative z-10">
          "{quote}"
        </blockquote>
        <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-auto">
          Personal Philosophy
        </div>
      </div>

      {/* 2. Interests / Hobbies Card (Spans 1 column) */}
      <div className="md:col-span-1 bg-white/50 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
            <Heart size={24} strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Interests</h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {hobbies.length > 0 ? (
            hobbies.map((hobby, index) => (
              <span 
                key={index} 
                className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200 transition-all cursor-default"
              >
                {hobby}
              </span>
            ))
          ) : (
            <span className="text-slate-500 font-medium">Always exploring new things.</span>
          )}
        </div>
      </div>

      {/* 3. Reading Resources (Spans full width) */}
      {resources.length > 0 && (
        <div className="md:col-span-3 bg-white/50 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <BookOpen size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Reading List</h3>
              <p className="text-slate-500 font-medium text-sm mt-1">Resources and books I highly recommend.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <a 
                key={resource._id || index} 
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md hover:bg-white transition-all group"
              >
                <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors truncate pr-4">
                  {resource.title}
                </span>
                <ExternalLink size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
          
        </div>
      )}

    </div>
  );
};

export default ProfileBento;
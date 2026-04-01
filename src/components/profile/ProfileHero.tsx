import { useState, useEffect } from 'react';
import { Download, MapPin, Briefcase, Mail, CalendarDays } from 'lucide-react';
import { ProfileService } from '../../services/profile.service';
import type { UserProfile, CloudinaryMedia } from '../../types/profile';

interface WrappedProfileResponse {
  success: boolean;
  data: UserProfile | { profile: UserProfile };
}

const getImageUrl = (media?: CloudinaryMedia | string, fallback: string = ''): string => {
  if (!media) return fallback;
  if (typeof media === 'string') return media;
  return media.url || fallback;
};

const ProfileHero = () => {
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
        console.error("Failed to fetch profile hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-white/40 backdrop-blur-md rounded-3xl border border-white/60">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!profile) return null;

  const bannerUrl = getImageUrl(profile.banner_image, '/images/default_banner.jpg');
  const avatarUrl = getImageUrl(profile.profile_image, '/images/default_user.png');
  const resumeUrl = getImageUrl(profile.resume);

  const joinDate = new Date(profile.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/80 shadow-sm relative transition-all duration-500">
      
      {/* 1. Banner Image Section - Exactly 100% Space */}
      <div className="h-48 sm:h-64 w-full relative bg-slate-200">
        <img 
          src={bannerUrl} 
          alt="Profile Banner" 
          /* object-cover ensures no empty space. object-top anchors it nicely if it's a code snippet */
          className="w-full h-full object-cover object-top"
        />
        {/* Very subtle gradient just to blend the bottom edge slightly */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="px-6 sm:px-10 pb-10">
        
        {/* 2. Overlap Row: Avatar (Left) & Action Buttons (Right) */}
        <div className="flex justify-between items-start">
          
          {/* Left: Overlapping Avatar */}
          <div className="relative -mt-16 sm:-mt-20 z-10">
            <div className="p-1.5 bg-white/90 backdrop-blur-xl rounded-full shadow-lg inline-block">
              <img 
                src={avatarUrl} 
                alt={profile.name} 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-inner bg-white"
              />
            </div>
            {/* Online Status Dot */}
            <div className="absolute bottom-4 right-4 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 border-[3px] border-white rounded-full shadow-sm ring-2 ring-green-500/20"></div>
          </div>

          {/* Right: Action Buttons (Aligned below banner) */}
          <div className="flex items-center gap-3 pt-4 z-10">
            {resumeUrl && (
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full shadow-md shadow-slate-900/20 hover:bg-blue-600 hover:shadow-blue-500/30 transition-all duration-300"
              >
                <Download size={16} strokeWidth={2.5} />
                Download CV
              </a>
            )}
            
            {/* Mobile icon-only Resume button */}
            {resumeUrl && (
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex sm:hidden items-center justify-center p-2.5 bg-slate-900 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
                aria-label="Download CV"
              >
                <Download size={18} strokeWidth={2.5} />
              </a>
            )}

            <a 
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center p-2.5 sm:px-5 sm:py-2.5 bg-white/80 border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 font-bold text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white"
              aria-label="Send Email"
            >
              <Mail size={18} strokeWidth={2.5} className="sm:mr-2" />
              <span className="hidden sm:block">Email Me</span>
            </a>
          </div>
        </div>

        {/* 3. Name & Username Row */}
        <div className="mt-3 flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {profile.name}
          </h1>
          <span className="text-slate-500 font-medium mt-1">
            @{profile.user_name}
          </span>
        </div>

        {/* 4. Bio Row */}
        <div className="mt-5 max-w-3xl">
          <p className="text-[17px] text-slate-700 leading-relaxed font-medium">
            {profile.bio}
          </p>
        </div>

        {/* 5. Metadata / Badges Row */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-medium text-slate-500">
          
          <span className="flex items-center gap-1.5">
            <Briefcase size={18} className="text-slate-400" />
            {profile.role || 'Full Stack Developer'}
          </span>

          <span className="flex items-center gap-1.5">
            <MapPin size={18} className="text-slate-400" />
            India <span className="text-lg leading-none -mt-0.5" title="India">🇮🇳</span>
          </span>

          <span className="flex items-center gap-1.5">
            <CalendarDays size={18} className="text-slate-400" />
            Joined {joinDate}
          </span>
          
        </div>

      </div>
    </div>
  );
};

export default ProfileHero;
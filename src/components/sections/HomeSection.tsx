import { useState, useEffect } from 'react';
import { ProfileService } from '../../services/profile.service';
import type { UserProfile } from '../../types/profile';

import githubIcon from '../../assets/github.png';
import linkedinIcon from '../../assets/linkedin.png';
import twitterIcon from '../../assets/twitter.png';
import instagramIcon from '../../assets/instagram.png';
import facebookIcon from '../../assets/facebook.png';
import leetcodeIcon from '../../assets/leetcode.png';
import mediumIcon from '../../assets/medium.png';
import blogSiteIcon from '../../assets/blog.png';
import portfolioIcon from '../../assets/project.png';
import defaultGlobeIcon from '../../assets/openLink.png';

interface WrappedProfileResponse {
  success: boolean;
  data: UserProfile | { profile: UserProfile };
}

interface SocialImageConfig {
  src: string;
  alt: string;
}

const getSocialImage = (key: string): SocialImageConfig => {
  const configs: Record<string, SocialImageConfig> = {
    github: { src: githubIcon, alt: 'GitHub' },
    linkedin: { src: linkedinIcon, alt: 'LinkedIn' },
    twitter: { src: twitterIcon, alt: 'Twitter / X' },
    instagram: { src: instagramIcon, alt: 'Instagram' },
    facebook: { src: facebookIcon, alt: 'Facebook' },
    leetcode: { src: leetcodeIcon, alt: 'LeetCode' },
    medium: { src: mediumIcon, alt: 'Medium' },
    portfolio: { src: portfolioIcon, alt: 'Portfolio' },
    blogSite: { src: blogSiteIcon, alt: 'Personal Blog' },
  };
  
  return configs[key] || { src: defaultGlobeIcon, alt: key };
};

const HomeSection = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
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
          setUser(profileData);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  const name = user?.name || "Afzal";
  const bio = user?.bio || "A passionate Full Stack Developer specializing in crafting beautiful, scalable web applications.";
  const heroGifUrl = "/images/dev-animation.gif";

  const activeSocialLinks = user?.social_media 
    ? Object.entries(user.social_media)
        .filter(([url]) => typeof url === 'string' && url.trim() !== '')
        .map(([key, url]) => [key, url as string] as const)
    : [];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
          
          {/* Left Column: Typography & Socials */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-5 tracking-tight leading-tight">
              Hello I'm <br className="hidden md:block" />
              <span className="text-blue-600">{name},</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-500 mb-8 max-w-lg leading-relaxed font-medium">
              {bio}
            </p>

            {/* Dynamic Real-Image Social Media Bar */}
            {activeSocialLinks.length > 0 && (
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 p-3 rounded-[1.5rem] bg-white/70 border border-white/60 backdrop-blur-md shadow-sm">
                {activeSocialLinks.map(([key, url]) => {
                  const imageConfig = getSocialImage(key);
                  
                  return (
                    <a 
                      key={key}
                      href={url} 
                      target="_blank" 
                      rel="noreferrer" 
                      // Removed text colors since we are using real images now.
                      // Kept the nice hover lift and scale animations.
                      className="p-2 bg-white/50 hover:bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
                      aria-label={`Visit my ${key}`}
                    >
                      <img 
                        src={imageConfig.src} 
                        alt={imageConfig.alt} 
                        className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: GIF Animation inside CIRCULAR Smokey Glass Card */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end mb-6 md:mb-0">
            <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px]">
              <div className="relative w-full h-full p-4 bg-white/60 backdrop-blur-md border border-white/60 rounded-full shadow-lg transition-transform duration-500 hover:-translate-y-2 flex items-center justify-center overflow-hidden">
                <img 
                  src={heroGifUrl} 
                  alt="Developer coding animation" 
                  className="w-[90%] h-[90%] object-contain drop-shadow-sm rounded-full"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeSection;
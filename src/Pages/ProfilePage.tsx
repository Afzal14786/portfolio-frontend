import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProfileHero from '../components/profile/ProfileHero';
import ProfileBento from '../components/profile/ProfileBento';
import CertificateGallery from '../components/profile/CertificateGallery';

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F7] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>

        <div className="flex flex-col space-y-8">
          <ProfileHero />
          <ProfileBento />
          <CertificateGallery />
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
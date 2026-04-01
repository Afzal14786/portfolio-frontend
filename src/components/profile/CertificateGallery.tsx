import { useState, useEffect } from 'react';
import { Award, ShieldCheck, X, Maximize2, Code, User } from 'lucide-react';
import { CertificateService } from '../../services/certificate.service';
import type { Certificate, CertificateImage } from '../../types/certificate';

const getImageUrl = (media?: CertificateImage | string, fallback: string = '/images/default_cert.png'): string => {
  if (!media) return fallback;
  if (typeof media === 'string') return media;
  return media.url || fallback;
};

// Bulletproof, any-free extractor for Arrays
const extractCertificates = (response: unknown): Certificate[] => {
  if (!response) return [];
  const res = response as Record<string, unknown>;

  if (res.data) {
    const inner1 = res.data as Record<string, unknown>;
    if (Array.isArray(inner1.certificates)) return inner1.certificates as Certificate[];
    if (Array.isArray(inner1)) return inner1 as Certificate[];
    
    if (inner1.data) {
      const inner2 = inner1.data as Record<string, unknown>;
      if (Array.isArray(inner2.certificates)) return inner2.certificates as Certificate[];
      if (Array.isArray(inner2)) return inner2 as Certificate[];
    }
  }
  
  if (Array.isArray(res.certificates)) return res.certificates as Certificate[];
  return [];
};

const CertificateGallery = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const rawResponse = await CertificateService.getPublicCertificates();
        const fetchedCerts = extractCertificates(rawResponse);
        
        if (fetchedCerts.length > 0) {
          setCertificates(fetchedCerts);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  if (loading) {
    return (
      <div className="w-full mt-12 mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-72 bg-white/40 rounded-3xl border border-white/60"></div>
        ))}
      </div>
    );
  }

  if (certificates.length === 0) return null;

  return (
    <div className="w-full mt-12 mb-24 relative z-10">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl shadow-sm">
          <Award size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Licenses & Certifications</h2>
          <p className="text-slate-500 font-medium mt-1">Proof of continuous learning and skill mastery.</p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => {
          const imgUrl = getImageUrl(cert.certificateImage);
          const teacherImgUrl = getImageUrl(cert.teacherImage, ''); 

          return (
            <div 
              key={cert._id} 
              className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col group"
            >
              
              {/* Image Thumbnail Container */}
              <div 
                className="relative h-48 w-full bg-slate-100 overflow-hidden cursor-pointer border-b border-white/60"
                onClick={() => setSelectedImage(imgUrl)}
              >
                <img 
                  src={imgUrl} 
                  alt={cert.courseName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Hover Overlay for expanding image */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white shadow-lg">
                    <Maximize2 size={24} />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3 line-clamp-2">
                  {cert.courseName}
                </h3>
                
                {/* Institute & Teacher Info Block */}
                <div className="flex flex-col gap-3 mb-4">
                  {/* Institute */}
                  <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                    <ShieldCheck size={16} className="text-amber-500" />
                    {cert.instituteName}
                  </div>

                  {/* Teacher Info (Dynamically Rendered if available) */}
                  {cert.teacherName && (
                    <div className="flex items-center gap-2">
                      {teacherImgUrl ? (
                        <img 
                          src={teacherImgUrl} 
                          alt={cert.teacherName} 
                          className="w-6 h-6 rounded-full object-cover border border-slate-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300">
                          <User size={12} className="text-slate-500" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-slate-500">
                        Instructor: <span className="font-bold text-slate-700">{cert.teacherName}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Display Skills */}
                <div className="mt-auto pt-4 flex flex-wrap items-center gap-2 border-t border-slate-200/60">
                  {cert.skills && cert.skills.length > 0 ? (
                    cert.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white/80 border border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-bold rounded-lg shadow-sm">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <Code size={14} /> Completed
                    </span>
                  )}
                  {cert.skills && cert.skills.length > 3 && (
                    <span className="text-xs font-bold text-slate-400">+{cert.skills.length - 3}</span>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedImage(null)}
          ></div>
          
          <button 
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-colors z-[110]"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={2.5} />
          </button>

          <div className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center pointer-events-none">
            <img 
              src={selectedImage} 
              alt="Certificate Full View" 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.3)]"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default CertificateGallery;
import React from "react";
import type { Certificate } from "../../types/Certificate.ts";

const CertificateCard: React.FC<Certificate> = ({
  course_name,
  certificate_image_url,
  skills,
  instructor_image_url,
  institute_name,
  teacher_name
}) => (
  <div className="bg-gradient-to-br from-indigo-950 via-gray-900 to-indigo-900 rounded-3xl shadow-2xl shadow-indigo-900/50 w-full p-6 flex flex-col mx-auto transition-all duration-500 hover:scale-[1.03] hover:shadow-cyan-500/30">
    
    {/* Course name */}
    <h2 className="text-2xl font-extrabold text-white mb-4 text-center tracking-wide border-b border-cyan-400/30 pb-2">
      {course_name}
    </h2>

    {/* Certificate Image Area - Sleek border and overflow */}
    <div className="bg-gray-950 rounded-lg overflow-hidden mb-5 shadow-xl border border-indigo-700/50">
      <div className="w-full aspect-video flex justify-center items-center">
        {/* The image itself */}
        <img
          src={certificate_image_url}
          alt={`Certificate for ${course_name}`}
          className="w-full h-full object-cover transition duration-500 hover:opacity-90"
          onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/600x337/312E81/D1D5DB?text=Certificate+Image" }}
        />

        {!certificate_image_url && (
          <span className="text-white/60 text-xl font-mono">Certificate Image</span>
        )}
      </div>
    </div>

    {/* Skills Area - Glowing Tags */}
    <div className="flex flex-wrap gap-2 mb-6">
      {skills.map((skill, idx) => (
        <span
          key={idx}
          className="bg-purple-700/50 text-cyan-200 px-3 py-1 rounded-full text-sm font-medium transition duration-300 transform hover:scale-105 shadow-md shadow-cyan-400/20 cursor-default"
        >
          #{skill}
        </span>
      ))}
    </div>

    <div className="mt-auto pt-3"> 
        {/* Instructor Heading */}
        <h3 className="text-base font-semibold text-gray-300 mb-3 tracking-wider">
          Instructor
        </h3>

        {/* Instructor Content */}
        <div className="flex items-center gap-4 mb-3">
          {/* Instructor Image - Glowing border effect */}
          <img
            src={instructor_image_url}
            alt={teacher_name}
            className="w-14 h-14 rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-400/40 object-cover flex-shrink-0 transition duration-300 hover:border-pink-300"
            onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/100x100/A78BFA/1F2937?text=T" }}
          />
          
          {/* Institute Name */}
          <div className="flex flex-col justify-center">
            <p className="font-extrabold text-cyan-300 text-lg leading-snug">
              {institute_name}
            </p>
          </div>
        </div>

        {/* Teacher Name - Prominent and separated footer style */}
        <p className="text-xl font-bold text-pink-400 pt-3 border-t border-purple-500/50 mt-2">
          {teacher_name}
        </p>
    </div>
  </div>
);

export default CertificateCard;
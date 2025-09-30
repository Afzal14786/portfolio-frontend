import React, { useState, useMemo } from "react";

// --- TYPE IMPORTS ---
import type { Certificate } from "../types/Certificate"; // Importing Certificate interface from separate file

// NOTE: We assume 'certificates' is successfully imported from the path below
import { certificates } from "../data/data.ts"; // Data import (destructured as per your snippet)
import CertificateCard from "../components/cards/CertificateCard.tsx"; // Imported Card component

import banner from "../assets/banner.png";
import profileImage from "../assets/profileImage.jpeg";
import facebook from "../assets/facebook.png";
import github from "../assets/github.png";
import linkedin from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import leetcode from "../assets/leetcode.png";

// --- TYPE DEFINITIONS ---
// Removed redundant inline Certificate interface definition here

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string; 
}

interface Resource {
    id: number;
    title: string;
    url: string;
}

interface Hobby {
    id: number;
    name: string;
}

interface MockData {
    QUOTE: string;
    BLOGS_COUNT: number;
    READING_RESOURCES: Resource[];
    SOCIAL_LINKS: SocialLink[];
    HOBBIES: Hobby[];
}
// --- TYPE DEFINITIONS ---

// Accent theme
const ACCENT_TEXT_COLOR = "text-cyan-400";
const ACCENT_BG_COLOR = "bg-cyan-600/30";
const BUTTON_COLOR = "bg-cyan-600 hover:bg-cyan-700";
const CARD_BG = "bg-gray-800"; 

// Configuration for certificate display
const CARDS_PER_CLICK = 3;

// --- NEW CODE-QUOTE FOR DISPLAY ---
const CODE_PHILOSOPHY_SNIPPET = `
#include <life>
using namespace std;

// The main function of existence
int main() {
    bool is_awake = true;

    while (is_awake) {
        do_work();
        learn_new_things();
        be_creative();
    }
    
    // Always returns a positive value
    return 1; 
}

void do_work() {
    // Let's Build Something Unique Together ... !
}
`;

/**
 * All this data comes from database
 */

// We cast the mock data to the defined type to ensure consistency
const MOCK_DATA: MockData = {
  QUOTE: "Programming is life.",
  BLOGS_COUNT: 235,
  READING_RESOURCES: [
    { id: 1, title: "Tailwind Docs", url: "https://tailwindcss.com/" },
    { id: 2, title: "React Hooks", url: "https://react.dev/reference/react" },
    { id: 3, title: "Deep Learning", url: "https://deeplearning.ai/" },
    { id: 4, title: "Testing Strategies", url: "https://testing.com/" },
    { id: 5, title: "Web Security", url: "https://owasp.org/" },
    { id: 6, title: "Next.js Guide", url: "https://nextjs.org/docs" },
    { id: 7, title: "CSS Grid Layout", url: "https://css-tricks.com/snippets/css/a-guide-to-css-grid/" },
    { id: 8, title: "Aesthetic Design", url: "https://dribbble.com/" },
  ],
  SOCIAL_LINKS: [
    { id: "github", name: "GitHub", url: "https://github.com/afzal14786", icon: github as string },
    { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/mdafzal14786", icon: linkedin as string },
    { id: "facebook", name: "Facebook", url: "https://facebook.com/mdafzal14786", icon: facebook as string },
    { id: "twitter", name: "Twitter", url: "https://twitter.com/mdafzal14786", icon: twitter as string },
    { id: "instagram", name: "Instagram", url: "https://instagram.com/mdafzal14786", icon: instagram as string },
    { id: "leetcode", name: "LeetCode", url: "https://leetcode.com/mdafzal14786", icon: leetcode as string },
  ],
  HOBBIES: [ // Mock Hobbies data
    { id: 1, name: "Making Tea" },
    { id: 2, name: "Playing Cricket" },
    { id: 3, name: "BGMI/Gaming" },
    { id: 4, name: "Reading Sci-Fi" },
    { id: 5, name: "Cycling" },
    { id: 6, name: "Web Dev Tutorials" },
  ]
};

const USER_NAME = "Md Afzal Ansari";

// Social Media Icon
const SocialIcon = ({ link }: { link: SocialLink }) => (
  <a href={link.url} target="_blank" rel="noopener noreferrer" className="relative group">
    <img
      src={link.icon}
      alt={link.name}
      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-700 hover:border-cyan-400 transition duration-300 transform hover:scale-105 shadow-xl object-cover"
      onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/100x100/1F2937/9CA3AF?text=?" }}
    />
  </a>
);

const Profile = () => {
  const { BLOGS_COUNT, READING_RESOURCES, SOCIAL_LINKS, HOBBIES } = MOCK_DATA;
  const resourcesToDisplay = READING_RESOURCES.slice(0, 10);
  
  // --- START CERTIFICATE LOGIC ---
  // 1. Use the imported 'certificates' data array
  const allCertificates = certificates as Certificate[]; 
  
  // 2. State for controlling the number of visible certificates
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_CLICK);
  const totalCertificates = allCertificates.length;
  const showViewMoreButton = visibleCount < totalCertificates;

  // 3. Function to load the next set of cards
  const loadMore = () => {
    // If the next click would show more than (current + 3), set it to show all remaining
    const nextCount = visibleCount + CARDS_PER_CLICK;
    if (nextCount > totalCertificates) {
        setVisibleCount(totalCertificates); 
    } else {
        setVisibleCount(nextCount);
    }
  };

  // 4. Memoized array of certificates to display
  const certificatesToDisplay = useMemo(() => {
    return allCertificates.slice(0, visibleCount);
  }, [allCertificates, visibleCount]);
  // --- END CERTIFICATE LOGIC ---

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* --- BANNER SECTION --- */}
      <div className="relative w-full">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-40 sm:h-52 object-cover"
          onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/1920x200/2D3748/F7FAFC?text=Banner" }}
        />

        {/* Profile + Resume */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20">
            {/* Profile + Name */}
            <div className="flex items-end space-x-4">
              <img
                className="w-35 h-35 sm:w-42 sm:h-42 rounded-full border-4 border-gray-900 shadow-2xl bg-gray-700 object-cover"
                src={profileImage}
                alt="User Avatar"
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/100x100/1F2937/9CA3AF?text=👤" }}
              />
              <div className="mb-1">
                <p
                  className={`text-2xl sm:text-3xl font-extrabold ${ACCENT_TEXT_COLOR}`}
                >
                  {USER_NAME}
                </p>
              </div>
            </div>

            {/* Resume Button */}
            <button
              className={`mt-4 sm:mt-0 px-6 py-2 rounded-lg font-semibold ${BUTTON_COLOR} text-white shadow-lg transition duration-300 transform hover:scale-[1.02]`}
            >
              My Resume
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Row 1: Quote (Code Philosophy) | Follow Me On + Reading Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 1. Quote (Code Philosophy) - Left Column */}
          <div className={`p-6 rounded-xl ${ACCENT_BG_COLOR} shadow-inner`}>
            {/* Title: The only way to do great work is to love what you do. */}
            <p className="text-base text-gray-300 font-medium mb-4">
               The only way to do great work is to love what you do.
            </p>
            {/* C++ Code Philosophy Display Area - Styling adjusted */}
            <div className="p-4 bg-gray-950 rounded-lg border border-gray-700 text-left overflow-x-auto font-mono text-sm shadow-xl">
                <pre className="whitespace-pre-wrap break-words">
                  {/* Changed text color for better contrast and classic coding theme */}
                  <code className="text-lime-300"> 
                      {CODE_PHILOSOPHY_SNIPPET}
                  </code>
                </pre>
            </div>
          </div>

          {/* 2. Right Column Container: Social + Resources (Stacked) */}
          <div className="flex flex-col gap-6">
            
            {/* Follow Me On - Top Section in Right Column */}
            <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 self-start">
              <h2 className={`text-xl font-semibold mb-4 ${ACCENT_TEXT_COLOR}`}>
                Follow Me On
              </h2>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <SocialIcon key={link.id} link={link} />
                ))}
                {/* Placeholder circles */}
                {Array(
                  Math.max(0, 8 - SOCIAL_LINKS.length)
                )
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-500"
                    >
                      +
                    </div>
                  ))}
              </div>
            </div>

            {/* Reading Resources - Bottom Section in Right Column (NO MARGIN TOP NEEDED) */}
            <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
              <h2 className={`text-xl font-semibold mb-4 ${ACCENT_TEXT_COLOR}`}>
                Reading Resources
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                {resourcesToDisplay.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-lg text-sm text-center font-medium hover:bg-gray-600 transition duration-200 truncate"
                    title={resource.title}
                  >
                    {resource.title}
                  </a>
                ))}
                {/* Placeholders */}
                {Array(Math.max(0, 10 - resourcesToDisplay.length))
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`res-placeholder-${index}`}
                      className="p-3 bg-gray-700/50 rounded-lg text-sm text-center text-gray-500 flex items-center justify-center"
                    >
                      Resource Slot
                    </div>
                  ))}
              </div>
              {READING_RESOURCES.length > 10 && (
                <p className="text-sm text-gray-500 mt-4 text-center">
                  and {READING_RESOURCES.length - 10} more...
                </p>
              )}
            </div>

          </div> {/* End of Right Column Container */}
        </div>

        {/* Row 2: Blogs + Hobbies (2-column layout) */}
        {/* REWORKED LAYOUT: Blogs (col-1) | Hobbies (col-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* 1. Blogs Count (col-span-1) */}
          <div className="col-span-1 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-center items-center text-center">
            <p className="text-lg text-gray-400 font-medium mb-2">
              Total Published
            </p>
            <div
              className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 border-cyan-400 ${ACCENT_BG_COLOR} shadow-inner`}
            >
              <p className="text-5xl font-extrabold text-white">
                {BLOGS_COUNT}
              </p>
            </div>
            <p className={`text-2xl font-bold mt-2 ${ACCENT_TEXT_COLOR}`}>
              Blogs
            </p>
          </div>

          {/* 2. Hobbies (New Section, col-span-1) */}
          <div className="col-span-1 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <h2 className={`text-xl font-semibold mb-4 ${ACCENT_TEXT_COLOR}`}>
              My Hobbies
            </h2>
            <div className="flex flex-wrap gap-2">
              {HOBBIES.map((hobby) => (
                <span
                  key={hobby.id}
                  className="px-3 py-1 bg-cyan-600/50 text-white text-sm font-medium rounded-full transition duration-200 hover:bg-cyan-600 cursor-default"
                >
                  {hobby.name}
                </span>
              ))}
              {/* Placeholder for Hobbies */}
              {Array(Math.max(0, 8 - HOBBIES.length))
                .fill(0)
                .map((_, index) => (
                  <span
                    key={`hobby-placeholder-${index}`}
                    className="px-3 py-1 bg-gray-700/50 text-gray-400 text-sm rounded-full border border-dashed border-gray-600"
                  >
                    Hobby Slot
                  </span>
                ))}
            </div>
          </div>
        </div>
              {/* certificate section */}
        {/* Only render the section if there are certificates */}
        {totalCertificates > 0 && (
            <div className={`p-6 ${CARD_BG} rounded-xl shadow-2xl border border-gray-700 mt-6`}>
                <h2 className={`text-3xl font-extrabold text-center mb-8 ${ACCENT_TEXT_COLOR}`}>
                    My Certificates
                </h2>
                
                {/* Certificate Grid: Responsive layout (3 columns on lg, 2 on sm, 1 on mobile) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificatesToDisplay.map((cert) => (
                        // Key fix applied, using 'id'
                        <CertificateCard key={cert.id} {...cert} />
                    ))}
                </div>

                {/* View More Button */}
                {showViewMoreButton && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={loadMore}
                            className={`px-8 py-3 text-lg font-bold rounded-full ${BUTTON_COLOR} text-white shadow-xl transition duration-300 transform hover:scale-[1.05]`}
                        >
                            {/* Dynamic button text for the last click */}
                            {certificatesToDisplay.length === CARDS_PER_CLICK ? 
                                "View Next" : 
                                `View All (${totalCertificates - visibleCount} Remaining)`
                            }
                        </button>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default Profile;

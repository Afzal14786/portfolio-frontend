import { useState, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { ProfileService } from '../../services/profile.service';
import type { Journey } from '../../types/journey';

const extractJourneys = (response: unknown): Journey[] => {
  if (!response) return [];
  const res = response as Record<string, unknown>;

  if (res.data) {
    const inner1 = res.data as Record<string, unknown>;
    
    if (Array.isArray(inner1.journey)) return inner1.journey as Journey[];
    if (Array.isArray(inner1)) return inner1 as Journey[];
    
    if (inner1.data) {
      const inner2 = inner1.data as Record<string, unknown>;
      if (Array.isArray(inner2.journey)) return inner2.journey as Journey[];
      if (Array.isArray(inner2)) return inner2 as Journey[];
    }
  }
  
  if (Array.isArray(res.journey)) return res.journey as Journey[];
  
  return [];
};

const JourneySection = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const rawResponse = await ProfileService.getPublicJourneys();
        const fetchedJourneys = extractJourneys(rawResponse);
        
        if (fetchedJourneys.length > 0) {
          setJourneys(fetchedJourneys);
        }
      } catch (error: unknown) {
        console.error("Failed to fetch journeys:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJourneys();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <section id="journey" className="relative py-24 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </section>
    );
  }

  return (
    <section id="journey" className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            My Journey
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            The milestones, education, and experiences that have shaped my career as a developer.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Center/Left Lines */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-transparent -translate-x-1/2 rounded-full"></div>
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/40 to-transparent rounded-full"></div>

          {journeys.map((item: Journey, index: number) => {
            const isEven = index % 2 === 0;
            const isExpanded = !!expandedCards[item._id];
            const isLongText = item.description && item.description.length > 200;

            return (
              <div 
                key={item._id} 
                className={`relative flex items-start justify-between mb-12 md:mb-16 ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                } flex-row`}
              >
                {/* Spacer for desktop layout */}
                <div className="hidden md:block w-[45%]"></div>
                
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 mt-6 flex items-center justify-center w-10 h-10 rounded-full bg-white border-[3px] border-blue-500 shadow-sm z-20">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                </div>

                {/* Content Card */}
                <div className="w-[calc(100%-5rem)] ml-[5rem] md:ml-0 md:w-[45%] group">
                  <div className="p-6 sm:p-8 bg-white/60 backdrop-blur-md border border-white/60 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                    
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200 shadow-sm mb-4">
                      <Calendar size={14} className="text-blue-600" />
                      <span className="text-xs font-extrabold text-blue-600 tracking-wider">
                        {item.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-tight">
                      {item.title}
                    </h3>
                    
                    {/* Description & Toggle */}
                    <div className="relative">
                      <p 
                        className={`text-slate-500 font-medium leading-relaxed transition-all duration-500 ${
                          !isExpanded && isLongText ? 'line-clamp-4' : ''
                        }`}
                        style={{ whiteSpace: 'pre-wrap' }}
                      >
                        {item.description}
                      </p>

                      {isLongText && (
                        <button
                          onClick={() => toggleExpand(item._id)}
                          // Chevron Icons added back here!
                          className="mt-3 flex items-center gap-1.5 text-sm font-bold text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                        >
                          {isExpanded ? (
                            <>Show Less <ChevronUp size={16} strokeWidth={2.5} /></>
                          ) : (
                            <>Read More <ChevronDown size={16} strokeWidth={2.5} /></>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom faded indicator (ChevronDown added back here!) */}
          {journeys.length > 0 && (
            <div className="flex justify-center mt-8 relative z-20">
              <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200/50 flex items-center justify-center text-slate-400">
                <ChevronDown size={20} />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default JourneySection;
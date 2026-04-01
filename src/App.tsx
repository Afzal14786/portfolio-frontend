import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';

import HomeSection from './components/sections/HomeSection';
import JourneySection from './components/sections/JourneySection';
import TechnicalSection from './components/sections/TechnicalSection';
import ProjectSection from './components/sections/ProjectSection';
import BlogSection from './components/sections/BlogSection'; 
import ContactSection from './components/sections/ContactSection';

import AllBlogs from './Pages/AllBlogs';
import ReadBlog from './Pages/ReadBlog';
import ProfilePage from './Pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        <Header />
        
        <Routes>
\          <Route path="/" element={
            <main>
              <HomeSection />
              <JourneySection />
              <TechnicalSection />
              <ProjectSection />
              <BlogSection /> 
              <ContactSection /> 
            </main>
          } />
          <Route path="/me" element={<ProfilePage />} />
          {/* 2. The Hub Page */}
          <Route path="/allBlogs" element={<AllBlogs />} />

          {/* 3. The Reading Page (Dynamic Parameter :slug) */}
          <Route path="/blog/:slug" element={<ReadBlog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
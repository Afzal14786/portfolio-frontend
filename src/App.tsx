import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPages from "./Pages/AllPages";
import AllBlogs from "./Blog/AllBlogs";
import ReadBlog from "./Blog/ReadBlog";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllPages />} />
          <Route path="/allBlogs" element={<AllBlogs />} />
          <Route path="/blog/:subjectSlug/:titleSlug/:blogId" element={<ReadBlog />}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;

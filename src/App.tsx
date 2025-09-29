import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AllPages from "./Pages/AllPages";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllPages/>}/>
        </Routes>
      </Router>
      
    </>
  )
}

export default App

// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VideosDashboard from "./components/Theme1/VideosDashboard";
import BloosomDashboard from "./components/Theme5/T5Dashboard";
import RainyDashboard from "./components/Theme3/T3Dashboard";
import Tree5Dashboard from "./components/Theme4/T4Dashboard";
import TreeLessonDashboard from "./components/Theme4/TreeLessonDashboard";
import MissionDashboard from "./components/Theme5/MissionDashboard";
import LessonQuizPanel from "./components/Theme3/Lesson&QuizPanel";
import Quiz from "./components/Theme3/Quiz";
import T1Page from "./pages/T1Page";
import T2Page from "./pages/T2Page";
import T3Page from "./pages/T3Page";
import T4Page from "./pages/T4Page";
import T5Page from "./pages/T5Page";
import HoverCard from "./components/Theme4/HoverCard";
import GarbageDashboard from "./components/Theme1/T1Dashboard";
import DustyDashboard from "./components/Theme2/T2Dashboard";
import VRDashboard from "./components/Theme2/VRDashBoard";
import TreeDashboard from "./components/Theme4/T4Dashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/theme1" element={<T1Page />} />
        <Route path="/theme1dashboard" element={<GarbageDashboard /> } />
        <Route path="/videos" element={<VideosDashboard/>} />

        <Route path="/theme2" element={<T2Page />} />
        <Route path="/theme2dashboard" element={<DustyDashboard /> } />
        <Route path="/vrvideos" element={<VRDashboard /> } />

        <Route path="/theme3" element={<T3Page/> } />
        <Route path="/theme3dashboard" element={<RainyDashboard /> } />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/lesson-Quiz" element={<LessonQuizPanel />} />
        
        <Route path="/theme4" element={<T4Page /> } />
        <Route path="/theme4dashboard" element={<TreeDashboard /> } />
        <Route path="/tree-lessons" element={<TreeLessonDashboard />} />

        <Route path="/theme5" element={<T5Page /> } />
        <Route path="/theme5dashboard" element={<BloosomDashboard /> } />
        <Route path="/blossom-mission" element={<MissionDashboard /> } />
        
      </Routes>
    </Router>
  );
};

export default App;
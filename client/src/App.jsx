// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetail from "./pages/QuestionDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import "./App.css"; // Import the CSS!
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="cyber-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ask" element={<AskQuestion />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

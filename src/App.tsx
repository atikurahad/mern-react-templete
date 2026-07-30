import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimateChartsPage from "./pages/AnimateChartsPage";
import MarqueePage from "./pages/MarqueePage";
import SocialLoginPage from "./pages/SocialLoginPage";
import TestmonialsPage from "./pages/TestmonialsPage";
import Navbar from "./shared/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen ">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<AnimateChartsPage />} />
            <Route path="/charts" element={<AnimateChartsPage />} />
            <Route path="/testimonials" element={<TestmonialsPage />} />
            <Route path="/marquee" element={<MarqueePage />} />
            <Route path="/social-login" element={<SocialLoginPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

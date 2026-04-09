import { Routes, Route, useLocation } from "react-router-dom";
import { NoiseOverlay } from "./components/NoiseOverlay.jsx";
import { AmbientBlobs } from "./components/AmbientBlobs.jsx";
import { PageTransition } from "./components/PageTransition.jsx";
import { Navbar } from "./layout/Navbar.jsx";
import { Footer } from "./layout/Footer.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import DarkCTFIntro from "./components/DarkCTFIntro.jsx";
import { useState } from "react";
import Leaderboard from "./components/leaderboard/Leaderboard.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function AppRoutes({ showIntro, setShowIntro }) {
  const location = useLocation();

  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route
          path="/"
          element={
            <>
              {showIntro ? (
                <DarkCTFIntro onComplete={() => setShowIntro(false)} />
              ) : (
                <>
                  <Navbar />
                  <HomePage />
                  <Footer />
                </>
              )}
            </>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <div className="pt-24 pb-12 px-6 min-h-screen">
              <Navbar />
              <Leaderboard />
              <Footer />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <NotFoundPage />
              <Footer />
            </>
          }
        />
      </Routes>
    </PageTransition>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-bg text-text">
      <ScrollToTop />
      <NoiseOverlay />
      <AmbientBlobs />
      <AppRoutes showIntro={showIntro} setShowIntro={setShowIntro} />
    </div>
  );
}


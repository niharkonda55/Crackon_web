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

function AppRoutes() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);

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
  return (
    <div className="min-h-screen bg-bg text-text">
      <NoiseOverlay />
      <AmbientBlobs />
      <AppRoutes />
    </div>
  );
}


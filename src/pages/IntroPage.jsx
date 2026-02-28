import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DarkCTFIntro from "../components/DarkCTFIntro.jsx";

const INTRO_FLAG = "darkctf_intro_seen";

export function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_FLAG);
    if (seen === "1") {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleComplete = () => {
    sessionStorage.setItem(INTRO_FLAG, "1");
    navigate("/home", { replace: true });
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <DarkCTFIntro onComplete={handleComplete} />
    </div>
  );
}


import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import auLogo from "@/assets/au-logo.png";

const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary px-6 py-4 flex items-center gap-4">
      <button onClick={() => navigate(-1)} className="text-white">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <img src={auLogo} alt="AU Small Finance Bank" className="h-8" />
    </header>
  );
};

export default PageHeader;

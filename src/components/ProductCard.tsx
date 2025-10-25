import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  description: string;
  illustration: string;
  gradient: string;
  applyRoute?: string;
}

export const ProductCard = ({ title, description, illustration, gradient, applyRoute }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleApply = () => {
    if (applyRoute) {
      navigate(applyRoute);
    }
  };

  return (
    <div className={`${gradient} rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/90 text-sm mb-6">{description}</p>
          <div className="flex gap-3">
            <Button variant="solid" size="sm" onClick={handleApply}>Apply</Button>
            <Button variant="outline" size="sm" className="text-white border-white">Know More</Button>
          </div>
        </div>
        <div className="w-24 h-24 flex-shrink-0">
          <img src={illustration} alt={title} className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

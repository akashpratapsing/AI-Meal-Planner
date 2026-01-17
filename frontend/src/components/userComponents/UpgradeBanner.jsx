import { Crown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const UpgradeBanner = ({
  title = "Upgrade to PRO",
  description = "This feature is available for PRO users only.",
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-base-100 rounded-3xl shadow-xl border border-base-200 p-10 text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Crown className="w-10 h-10 text-primary" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-base-content mb-3">
          {title}
        </h2>

        {/* Description */}
        <p className="text-base-content/60 mb-8 leading-relaxed">
          {description}
        </p>

        {/* CTA */}
        <Link
          to="/dashboard/pricing"
          className="btn btn-primary btn-lg rounded-full gap-2"
        >
          Upgrade Now <ArrowRight size={18} />
        </Link>

        {/* Subtext */}
        <p className="text-xs text-base-content/40 mt-4">
          Cancel anytime • No hidden charges
        </p>
      </div>
    </div>
  );
};

export default UpgradeBanner;

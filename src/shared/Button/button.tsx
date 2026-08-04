import { ArrowRight } from "lucide-react";

export interface ViewAllButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function ViewAllButton({
  label = "View All Listings",
  onClick,
  href,
  className = "",
}: ViewAllButtonProps) {
  const classes = `inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {label}
        <ArrowRight className="h-4 w-4" />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
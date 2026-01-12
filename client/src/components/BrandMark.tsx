import { Home } from "lucide-react";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
}

export default function BrandMark({ size = "md" }: BrandMarkProps) {
  const sizeClasses = {
    sm: { text: "text-lg", label: "text-[8px]", icon: "w-2.5 h-2.5" },
    md: { text: "text-xl", label: "text-[10px]", icon: "w-3 h-3" },
    lg: { text: "text-2xl", label: "text-xs", icon: "w-3.5 h-3.5" }
  };

  const classes = sizeClasses[size];

  return (
    <div className="flex flex-col">
      <span 
        className={`${classes.text} font-semibold tracking-tight`} 
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        <span className="text-foreground">Bour</span>
        <span className="text-primary">arro</span>
      </span>
      <span className={`flex items-center gap-1 ${classes.label} font-semibold tracking-[0.2em] uppercase text-muted-foreground`}>
        <Home className={classes.icon} />
        Properties
      </span>
    </div>
  );
}

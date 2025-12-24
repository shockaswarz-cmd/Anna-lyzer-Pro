import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface NextSectionButtonProps {
  href: string;
  label: string;
}

export default function NextSectionButton({ href, label }: NextSectionButtonProps) {
  return (
    <div className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground mb-4">Ready to explore more?</p>
        <Link href={href}>
          <Button size="lg" className="gap-2" data-testid="button-next-section">
            {label}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

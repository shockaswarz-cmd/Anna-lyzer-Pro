import { ThemeProvider } from '../ThemeProvider';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from '../ThemeProvider';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      data-testid="theme-toggle"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function ThemeProviderExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-4 bg-background text-foreground min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Theme Provider Example</h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground">
          This demonstrates the theme provider functionality. Click the toggle to switch between light and dark modes.
        </p>
      </div>
    </ThemeProvider>
  );
}
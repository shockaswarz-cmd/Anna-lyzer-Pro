import { ThemeProvider } from '../ThemeProvider';
import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background text-foreground min-h-screen">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Theme Toggle Example</h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground mt-4">
          Click the toggle button to switch between light and dark themes.
        </p>
      </div>
    </ThemeProvider>
  );
}
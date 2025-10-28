import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileType, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-primary p-2 rounded-lg transition-transform group-hover:scale-110">
              <FileType className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ConvertMe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Pricing
            </Link>
            <SignedIn>
              <Link to="/conversions" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Conversions
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </SignedIn>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <SignedOut>
              <Button variant="ghost" asChild>
                <Link to="/auth/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity">
                <Link to="/auth/sign-up">Get Started</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  Hi, {user?.firstName || user?.username}
                </span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10"
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link
              to="/#features"
              className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <SignedIn>
              <Link
                to="/conversions"
                className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Conversions
              </Link>
              <Link
                to="/dashboard"
                className="block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </SignedIn>
            <div className="flex flex-col space-y-2 pt-4">
              <div className="px-4">
                <ThemeToggle />
              </div>
              <SignedOut>
                <Button variant="ghost" asChild>
                  <Link to="/auth/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-primary">
                  <Link to="/auth/sign-up">Get Started</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center space-x-3 px-4">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">{user?.firstName || user?.username}</span>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

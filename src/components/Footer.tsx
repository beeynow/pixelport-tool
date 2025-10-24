import { Link } from "react-router-dom";
import { FileType, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <FileType className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ConvertMe
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Fast, secure, and reliable file conversion at your fingertips.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/#features" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors group"
              >
                <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors group"
              >
                <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors group"
              >
                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ConvertMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

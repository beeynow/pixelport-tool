import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found (404) | ConvertAny</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to ConvertAny to access our free online file converter tools." />
        <link rel="canonical" href={`https://convertany.site${location.pathname}`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background px-4">
        <div className="text-center max-w-2xl">
          <h1 className="mb-6 text-8xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="mb-4 text-3xl font-bold">Oops! Page Not Found</h2>
          <p className="mb-8 text-xl text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or may have been moved. Let's get you back to converting files!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Home className="w-5 h-5" />
                Go to Homepage
              </Button>
            </Link>
            <Button onClick={() => window.history.back()} variant="outline" size="lg" className="gap-2">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Popular conversions:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/pdf-to-word" className="text-sm text-primary hover:underline">PDF to Word</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/jpg-to-png" className="text-sm text-primary hover:underline">JPG to PNG</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/compress-pdf" className="text-sm text-primary hover:underline">Compress PDF</Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/mp4-to-mp3" className="text-sm text-primary hover:underline">MP4 to MP3</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

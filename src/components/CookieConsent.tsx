import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner every time user enters the site
    setTimeout(() => setShowBanner(true), 1000);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDeny = () => {
    localStorage.setItem("cookie-consent", "denied");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <Card className="max-w-4xl mx-auto bg-gradient-card backdrop-blur-xl border border-border/50 shadow-glow">
        <div className="p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Cookie className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Cookie Preferences</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                By clicking "Accept", you consent to our use of cookies.
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="outline"
              onClick={handleDeny}
              className="border-border/50 hover:border-primary/30"
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-gradient-primary hover:opacity-90"
            >
              Accept
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;

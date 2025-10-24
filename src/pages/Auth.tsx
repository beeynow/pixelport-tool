import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileType } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent, type: "signin" | "signup") => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth - will be replaced with actual Lovable Cloud auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: type === "signin" ? "Welcome back!" : "Account created!",
        description: type === "signin" 
          ? "You've successfully signed in." 
          : "Your account has been created successfully.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <FileType className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ConvertMe
            </span>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Welcome</h1>
          <p className="text-muted-foreground mt-2">Sign in or create an account to continue</p>
        </div>

        <Card className="p-6 bg-gradient-card backdrop-blur-sm border border-border/50 shadow-glow animate-scale-in">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={(e) => handleAuth(e, "signin")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={(e) => handleAuth(e, "signup")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;

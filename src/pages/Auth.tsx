import { SignIn, SignUp } from "@clerk/clerk-react";
import { FileType } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const isSignUp = location.pathname.includes("sign-up");

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
          <p className="text-muted-foreground mt-2">
            {isSignUp ? "Create an account to get started" : "Sign in to your account"}
          </p>
        </div>

        <div className="flex justify-center animate-scale-in">
          {isSignUp ? (
            <SignUp
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-gradient-card backdrop-blur-sm border border-border/50 shadow-glow",
                },
              }}
              routing="path"
              path="/auth/sign-up"
              signInUrl="/auth/sign-in"
              afterSignUpUrl="/dashboard"
            />
          ) : (
            <SignIn
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-gradient-card backdrop-blur-sm border border-border/50 shadow-glow",
                },
              }}
              routing="path"
              path="/auth/sign-in"
              signUpUrl="/auth/sign-up"
              afterSignInUrl="/dashboard"
            />
          )}
        </div>

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

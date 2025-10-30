import { Helmet } from "react-helmet-async";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { FileType } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const isSignUp = location.pathname.includes("sign-up");

  return (
    <>
      <Helmet>
        <title>
          {isSignUp ? "Sign Up" : "Sign In"} - ConvertMe | Professional File
          Conversion
        </title>
        <meta
          name="description"
          content={
            isSignUp
              ? "Create your ConvertMe account to access unlimited file conversions and premium features."
              : "Sign in to your ConvertMe account to access your file conversions."
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 mb-4 hover:scale-105 transition-transform"
            >
              <div className="bg-gradient-primary p-2 rounded-lg shadow-glow">
                <FileType className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ConvertMe
              </span>
            </Link>
            <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              {isSignUp
                ? "Create an account to get started"
                : "Sign in to your account"}
            </p>
          </div>

          <div className="flex justify-center animate-scale-in">
            {isSignUp ? (
              <SignUp
                appearance={{
                  elements: {
                    rootBox: "mx-auto",
                    card: "bg-gradient-card backdrop-blur-xl border-2 border-border/50 shadow-glow rounded-2xl",
                    headerTitle: "text-2xl font-bold",
                    headerSubtitle: "text-muted-foreground",
                    formButtonPrimary:
                      "bg-gradient-primary hover:opacity-90 transition-all duration-300",
                    formFieldInput:
                      "border-border/50 focus:border-primary transition-colors",
                    footerActionLink: "text-primary hover:text-primary/80",
                    identityPreviewText: "text-foreground",
                    formFieldLabel: "text-foreground",
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
                    card: "bg-gradient-card backdrop-blur-xl border-2 border-border/50 shadow-glow rounded-2xl",
                    headerTitle: "text-2xl font-bold",
                    headerSubtitle: "text-muted-foreground",
                    formButtonPrimary:
                      "bg-gradient-primary hover:opacity-90 transition-all duration-300",
                    formFieldInput:
                      "border-border/50 focus:border-primary transition-colors",
                    footerActionLink: "text-primary hover:text-primary/80",
                    identityPreviewText: "text-foreground",
                    formFieldLabel: "text-foreground",
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
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

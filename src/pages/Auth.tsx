import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/myrealco-logo.png";

const Auth = () => {
  const [step, setStep] = useState<"email" | "password" | "signup">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // Move to password step
    setStep("password");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast({
        title: "Error",
        description: "Please enter your password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Sign in Failed",
        description: error.message === "Invalid login credentials" 
          ? "Invalid email or password. Please try again."
          : error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      navigate("/");
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      let errorMessage = error.message;
      if (error.message.includes("already registered")) {
        errorMessage = "This email is already registered. Please sign in instead.";
        setStep("password");
      }
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } else if (data.user) {
      // Insert profile with user's name
      await supabase.from('profiles' as any).insert({
        id: data.user.id,
        full_name: fullName,
      });
      
      toast({
        title: "Account Created!",
        description: "Welcome! You have successfully registered.",
      });
      navigate("/");
    }
    
    setIsLoading(false);
  };




  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <div className="mx-auto max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <img src={logo} alt="MyRealCo" className="h-12 w-auto" />
          </div>

          {/* Email Step */}
          {step === "email" && (
            <>
              <h1 className="text-2xl font-bold mb-6">Sign in</h1>
              
              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email Address*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 text-base rounded-lg border-2"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base rounded-lg bg-[#8B9DC3] hover:bg-[#7A8BB2] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>

              <p className="mt-4 text-sm">
                New to MyRealCo?{" "}
                <button
                  onClick={() => setStep("signup")}
                  className="text-primary font-medium hover:underline"
                >
                  Create account
                </button>
              </p>

              {/* Terms */}
              <p className="mt-8 text-sm text-muted-foreground">
                By submitting, I accept MyRealCo's{" "}
                <Link to="/terms-of-use" className="text-primary hover:underline">
                  terms of use
                </Link>
              </p>
            </>
          )}

          {/* Password Step */}
          {step === "password" && (
            <>
              <button
                onClick={() => setStep("email")}
                className="text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                ← Back
              </button>
              
              <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
              <p className="text-muted-foreground mb-6">{email}</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 text-base rounded-lg border-2 pr-12"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base rounded-lg bg-[#8B9DC3] hover:bg-[#7A8BB2] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <p className="mt-4 text-sm">
                <Link to="#" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </p>
            </>
          )}

          {/* Signup Step */}
          {step === "signup" && (
            <>
              <button
                onClick={() => setStep("email")}
                className="text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                ← Back
              </button>
              
              <h1 className="text-2xl font-bold mb-6">Create account</h1>
              
              <form onSubmit={handleSignup} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Full Name*"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-14 text-base rounded-lg border-2"
                  required
                  disabled={isLoading}
                />
                
                <Input
                  type="email"
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 text-base rounded-lg border-2"
                  required
                  disabled={isLoading}
                />
                
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password* (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 text-base rounded-lg border-2 pr-12"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password*"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-14 text-base rounded-lg border-2 pr-12"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base rounded-lg bg-[#8B9DC3] hover:bg-[#7A8BB2] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <p className="mt-4 text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Link to="/terms-of-use" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/terms-of-use" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>

              <p className="mt-4 text-sm">
                Already have an account?{" "}
                <button
                  onClick={() => setStep("email")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Auth;

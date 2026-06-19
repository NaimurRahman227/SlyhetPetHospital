import { useState, FormEvent } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { 
  KeyRound, 
  Mail, 
  User, 
  Lock, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  X
} from "lucide-react";

export default function Login() {
  const { 
    user, 
    isAdmin, 
    loginWithGoogle, 
    loginWithEmail, 
    signUpWithEmail, 
    promoteToAdmin, 
    demoteToUser,
    loginAsDemoUser,
    googleModalOpen,
    setGoogleModalOpen
  } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [enrollAsAdmin, setEnrollAsAdmin] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Custom input for Google simulator modal
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");
  const [customGoogleRole, setCustomGoogleRole] = useState<"admin" | "patient">("patient");

  const handleEmailAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitLoading(true);

    try {
      if (isSignUp) {
        if (!fullName.trim()) {
          throw new Error("Full Name is required for Registration.");
        }
        await signUpWithEmail(email, password, fullName);
        setSuccessMsg("Pristine JWT Token generated. Logging you in...");
        
        // Handle admin checkboxes or presets
        const emailNorm = email.toLowerCase();
        if (enrollAsAdmin || emailNorm.includes("admin")) {
          promoteToAdmin();
        } else {
          demoteToUser();
        }

        setTimeout(() => {
          navigate(enrollAsAdmin || emailNorm.includes("admin") ? "/admin" : "/");
        }, 1200);
      } else {
        await loginWithEmail(email, password);
        setSuccessMsg("JWT Token Verified successfully. Redirecting...");
        
        if (enrollAsAdmin) {
          promoteToAdmin();
        }

        setTimeout(() => {
          const emailNorm = email.toLowerCase();
          navigate(isAdmin || enrollAsAdmin || emailNorm.includes("admin") ? "/admin" : "/");
        }, 1250);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Credential verification failed. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleQuickLogin = (role: "admin" | "patient" | "doctor", name: string, emailStr: string) => {
    setErrorMsg(null);
    setSuccessMsg(`Simulating JWT Sign In as ${name}...`);
    setSubmitLoading(true);

    setTimeout(() => {
      loginAsDemoUser(role, name, emailStr);
      setSuccessMsg(`Access Token Minted! Welcome back, ${name}.`);
      setSubmitLoading(false);
      setTimeout(() => {
        navigate(role === "admin" || role === "doctor" ? "/admin" : "/");
      }, 900);
    }, 500);
  };

  const handleGoogleSelect = (name: string, mail: string, role: "admin" | "patient") => {
    setGoogleModalOpen(false);
    setErrorMsg(null);
    setSuccessMsg(`Exchanging Google OAuth code for JWT: ${name}...`);
    setSubmitLoading(true);

    setTimeout(() => {
      loginAsDemoUser(role === "admin" ? "admin" : "patient", name, mail);
      setSuccessMsg(`Authenticated via Google Sign In!`);
      setSubmitLoading(false);
      setTimeout(() => {
        navigate(role === "admin" ? "/admin" : "/");
      }, 900);
    }, 600);
  };

  const handleCustomGoogleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail || !customGoogleName) return;
    handleGoogleSelect(customGoogleName, customGoogleEmail, customGoogleRole);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24 relative overflow-hidden transition-colors duration-300" id="login-container">
      
      {/* Background radial effects */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-brand-secondary/5 dark:bg-brand-secondary/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="p-3 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center border border-brand-primary/10">
              <KeyRound className="w-7 h-7" />
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isSignUp ? "Generate Account JWT" : "Secure Log In"}
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-450 font-semibold uppercase tracking-wider">
            Clinical Role-Based Authentication
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-in" id="login-form-box">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-xl border border-slate-150 dark:border-slate-800 rounded-3xl transition-colors duration-300">
          
          {/* Quick Preseeded Accounts Panel */}
          <div className="mb-6 bg-slate-50 dark:bg-slate-950 p-4 border border-slate-200/50 dark:border-slate-850 rounded-2xl">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                1-Click Quick Testing (Recommended)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("admin", "Dr. James Carter", "admin@paws.com")}
                className="flex flex-col items-center justify-center p-2.5 bg-white dark:bg-slate-900 border border-amber-200 hover:border-amber-500 dark:border-amber-950/50 dark:hover:border-amber-550 rounded-xl transition-all hover:bg-amber-50/20 shadow-sm cursor-pointer"
              >
                <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400">ADMIN</span>
                <span className="text-[9px] font-bold text-slate-500 truncate max-w-full text-center mt-0.5">Dr. James</span>
              </button>
              
              <button
                type="button"
                onClick={() => handleQuickLogin("doctor", "Dr. Sarah Jenkins", "doctor@paws.com")}
                className="flex flex-col items-center justify-center p-2.5 bg-white dark:bg-slate-900 border border-teal-200 hover:border-teal-500 dark:border-teal-950/50 dark:hover:border-teal-550 rounded-xl transition-all hover:bg-teal-50/20 shadow-sm cursor-pointer"
              >
                <span className="text-[10px] font-extrabold text-teal-600 dark:text-teal-400">SURGEON</span>
                <span className="text-[9px] font-bold text-slate-500 truncate max-w-full text-center mt-0.5">Dr. Sarah</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("patient", "Eleanor Vance", "patient@paws.com")}
                className="flex flex-col items-center justify-center p-2.5 bg-white dark:bg-slate-900 border border-sky-200 hover:border-sky-500 dark:border-sky-950/50 dark:hover:border-sky-550 rounded-xl transition-all hover:bg-sky-50/20 shadow-sm cursor-pointer"
              >
                <span className="text-[10px] font-extrabold text-sky-600 dark:text-sky-400">PATIENT</span>
                <span className="text-[9px] font-bold text-slate-500 truncate max-w-full text-center mt-0.5">Eleanor</span>
              </button>
            </div>
          </div>

          {/* Toggle tabs for standard logins */}
          <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl mb-6 border border-slate-200/50 dark:border-slate-900">
            <button
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-1.8 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                !isSignUp 
                  ? "bg-white dark:bg-slate-800 text-brand-secondary dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-450"
              }`}
            >
              Sign In with Credentials
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-1.8 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                isSignUp 
                  ? "bg-white dark:bg-slate-800 text-brand-secondary dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-450"
              }`}
            >
              Create Account (JWT)
            </button>
          </div>

          <form onSubmit={handleEmailAuthSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-1.5"
                >
                  <label htmlFor="fullname-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <User className="font-bold w-4 h-4" />
                    </span>
                    <input
                      id="fullname-input"
                      type="text"
                      required={isSignUp}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Eleanor Vance"
                      className="w-full text-xs py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-slate-850 dark:text-slate-200 font-semibold"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label htmlFor="email-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Email Address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="font-bold w-4 h-4" />
                </span>
                <input
                  id="email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@paws.com"
                  className="w-full text-xs py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-slate-850 dark:text-slate-200 font-semibold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="pass-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Password</label>
                {!isSignUp && (
                  <span className="text-[10px] font-extrabold text-slate-450 hover:text-brand-primary transition-colors cursor-pointer" onClick={() => alert("Password is any custom character string (e.g. 'password' or 'admin123') in sandbox mode.")}>Help?</span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="font-bold w-4 h-4" />
                </span>
                <input
                  id="pass-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all text-slate-850 dark:text-slate-200 font-semibold"
                />
              </div>
            </div>

            {/* Configurable admin flag */}
            <div className="p-3 bg-brand-primary/5 dark:bg-slate-950 border border-brand-primary/15 dark:border-slate-850 rounded-2xl flex items-start gap-2.5">
              <input
                type="checkbox"
                id="sandbox-admin-chk"
                checked={enrollAsAdmin}
                onChange={(e) => setEnrollAsAdmin(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-brand-primary border-slate-350 dark:border-slate-700 bg-white dark:bg-slate-900 rounded cursor-pointer"
              />
              <div className="text-left">
                <label htmlFor="sandbox-admin-chk" className="text-[11px] font-extrabold text-slate-805 dark:text-slate-200 cursor-pointer block select-none">
                  Bypass with Administrator Clearances
                </label>
                <p className="text-[9.5px] text-slate-450 mt-0.5 leading-normal">
                  Grant this session administrative privileges automatically. Great for examining doctor lists, messages and surgeries!
                </p>
              </div>
            </div>

            {/* Actions alerts */}
            {errorMsg && (
              <div className="p-3 bg-rose-50 dark:bg-rose-955/20 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-xl border border-rose-100 dark:border-rose-900/30 flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-955/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-brand-primary hover:bg-brand-primary/95 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-brand-primary/15 disabled:opacity-75 cursor-pointer mt-2 uppercase tracking-wide"
            >
              {submitLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>MINTING Access JWT...</span>
                </>
              ) : (
                <span>{isSignUp ? "Generate Token & Log In" : "Sign In & Expose Token"}</span>
              )}
            </button>
          </form>

          {/* Separation line */}
          <div className="relative my-5 select-none text-[10px]">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center uppercase font-black tracking-widest text-[#94a3b8] dark:text-[#475569]">
              <span className="px-3 bg-white dark:bg-slate-900">Or Continue With</span>
            </div>
          </div>

          {/* Simulated Google Button */}
          <button
            onClick={loginWithGoogle}
            disabled={submitLoading}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 bg-white dark:bg-slate-900 rounded-xl text-slate-700 dark:text-slate-200 font-extrabold text-xs transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>

      {/* 
        =========================================================
        GOOGLE ACCOUNT SELECTOR MODAL DECORATIVE SIMULATOR OVERLAY
        =========================================================
      */}
      <AnimatePresence>
        {googleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGoogleModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[24px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 z-10 relative text-left"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-850/60 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Sign in with Google</span>
                </div>
                <button 
                  onClick={() => setGoogleModalOpen(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Body */}
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">Choose an Account</h4>
                  <p className="text-[11px] text-slate-450 dark:text-slate-400 mt-0.5 font-medium">To proceed with secure Paws &amp; Care clinical authorization:</p>
                </div>

                {/* Preseeded Google Options */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleGoogleSelect("Eleanor Vance", "eleanor.vance@gmail.com", "patient")}
                    className="w-full flex items-center justify-between p-3 border border-slate-150 dark:border-slate-805 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-2xl transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-extrabold text-xs rounded-xl flex items-center justify-center">
                        EV
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-primary">Eleanor Vance</p>
                        <p className="text-[10px] text-slate-400">eleanor.vance@gmail.com</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-sky-50 dark:bg-sky-955/20 text-sky-600 rounded">PATIENT</span>
                  </button>

                  <button
                    onClick={() => handleGoogleSelect("Dr. James Carter", "james.carter@pawsandcare.com", "admin")}
                    className="w-full flex items-center justify-between p-3 border border-slate-150 dark:border-slate-805 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-2xl transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold text-xs rounded-xl flex items-center justify-center">
                        JC
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-primary">Dr. James Carter</p>
                        <p className="text-[10px] text-slate-400">james.carter@pawsandcare.com</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-amber-50 dark:bg-amber-955/20 text-amber-600 rounded">ADMIN</span>
                  </button>
                </div>

                <div className="relative flex py-2 items-center select-none">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">Use Custom Account</span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                </div>

                {/* Custom Google Fields */}
                <form onSubmit={handleCustomGoogleSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 dark:text-slate-350 block">Google Account Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={customGoogleName}
                      onChange={(e) => setCustomGoogleName(e.target.value)}
                      className="w-full text-xs py-2 px-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl outline-none font-semibold text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 dark:text-slate-350 block">Google Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane.doe@gmail.com"
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      className="w-full text-xs py-2 px-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl outline-none font-semibold text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] font-bold text-slate-705 dark:text-slate-350 block">Assign Sandbox Role</label>
                    <select
                      value={customGoogleRole}
                      onChange={(e) => setCustomGoogleRole(e.target.value as "admin" | "patient")}
                      className="w-full text-xs py-2 px-3 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-xl outline-none font-semibold text-slate-800 dark:text-slate-200"
                    >
                      <option value="patient">Patient (Manage own appointments)</option>
                      <option value="admin">Administrator (Full Dashboard panel access)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#34a853] hover:bg-[#2d964a] text-white py-2.5 rounded-xl font-bold text-[11px] cursor-pointer mt-2 text-center shadow-lg shadow-emerald-700/10"
                  >
                    Authorize and Connect
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

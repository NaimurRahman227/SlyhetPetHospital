import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PawPrint, Calendar, Phone, Menu, X, ShieldAlert, LayoutDashboard, Sun, Moon, LogIn, LogOut, User as UserIcon, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined" && localStorage.getItem("paws-care-theme")) {
      return localStorage.getItem("paws-care-theme") === "dark" ? "dark" : "light";
    }
    return "light";
  });
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("paws-care-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/#" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/#about" },
    { name: "Doctors", href: "/#doctors" },
    { name: "Wellness Tips", href: "/#blog" },
    { name: "Reviews", href: "/#testimonials" },
    { name: "FAQs", href: "/#faq" },
    { name: "Contact", href: "/#contact" }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (isAdminRoute) {
      navigate("/");
      // Let React Route hydrate before attempting to scroll
      setTimeout(() => {
        const id = href.replace("/#", "");
        if (id) {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      const id = href.replace("/#", "");
      if (id) {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/75 dark:bg-slate-950/75 backdrop-blur-md shadow-md py-3 border-b border-slate-200/50 dark:border-slate-800/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" onClick={() => handleNavClick("/#")} className="flex items-center gap-2 group">
            <div className="p-2 bg-brand-primary/15 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <PawPrint className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <span className="text-xl font-bold font-sans tracking-tight text-brand-secondary dark:text-white flex items-center gap-1 transition-colors">
                Paws <span className="text-brand-primary">&</span> Care
              </span>
              <p className="text-[9px] font-medium text-brand-primary tracking-widest uppercase">
                Veterinary Hospital
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          {!isAdminRoute ? (
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="px-3 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-brand-primary rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-xs font-mono bg-brand-primary/10 text-brand-primary font-bold px-3 py-1 rounded-full animate-pulse">
                ADMIN CONSOLE
              </span>
            </div>
          )}

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-200 border border-slate-200/65 dark:border-slate-800 cursor-pointer flex items-center justify-center"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              )}
            </button>

            <a
              href="tel:+15557239900"
              className="flex items-center gap-2 text-rose-500 hover:text-rose-600 font-bold text-sm bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100/60 dark:hover:bg-rose-950/30 px-3 py-2 rounded-xl transition-all duration-300 border border-rose-100 dark:border-rose-900/40"
            >
              <Phone className="w-4 h-4 animate-bounce shrink-0" />
              <span>EMERGENCY: 24/7</span>
            </a>

            {user ? (
              <div className="flex items-center gap-3 animate-fade-in" id="user-profile-widget">
                {/* User avatar and metadata */}
                <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800/80 p-1.5 pr-3 rounded-xl border border-slate-200/50 dark:border-slate-800 transition-colors select-none">
                  <div className="w-7 h-7 bg-brand-primary text-white font-extrabold text-xs rounded-lg flex items-center justify-center shadow-inner uppercase">
                    {(user.displayName || user.email || "P").substring(0, 2)}
                  </div>
                  <div className="text-left leading-none">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-[110px]">
                      {user.displayName || user.email?.split("@")[0] || "Patient User"}
                    </p>
                    <span className={`inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded mt-0.5 uppercase tracking-wide leading-none ${
                      isAdmin 
                        ? "bg-amber-100 dark:bg-amber-955/40 text-amber-700 dark:text-amber-400"
                        : "bg-teal-100 dark:bg-teal-955/40 text-teal-700 dark:text-teal-400"
                    }`}>
                      {isAdmin ? "Admin" : "Patient"}
                    </span>
                  </div>
                </div>

                {isAdminRoute ? (
                  <Link
                    id="btn-nav-client"
                    to="/"
                    className="flex items-center gap-2 text-slate-705 dark:text-slate-300 bg-slate-150 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-850 transition-all duration-300 cursor-pointer"
                  >
                    Exit Dashboard
                  </Link>
                ) : (
                  <>
                    {isAdmin && (
                      <Link
                        id="btn-nav-admin"
                        to="/admin"
                        className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 hover:text-brand-primary dark:hover:text-brand-primary font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 transition-all duration-300 cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      id="btn-nav-book"
                      onClick={() => handleNavClick("/#appointment-section")}
                      className="flex items-center gap-1.5 bg-brand-primary hover:bg-[#0c8d8c] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-brand-primary/15 hover:shadow-brand-primary/30 hover:translate-y-[-1px] transition-all duration-300 cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Pet</span>
                    </button>
                  </>
                )}

                {/* Log Out Button */}
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="p-2.5 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 text-slate-400 rounded-xl transition-all border border-transparent hover:border-rose-100/50 cursor-pointer flex items-center justify-center shrink-0"
                  title="Log Out of Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  id="btn-nav-admin-locked"
                  to="/admin"
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 bg-white/30 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-850 font-bold text-xs px-3 py-2.5 rounded-xl border border-slate-200/40 dark:border-slate-850 transition-all cursor-pointer"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </Link>

                <Link
                  id="btn-nav-signin"
                  to="/login"
                  className="flex items-center gap-1.5 text-slate-750 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200/55 dark:border-slate-850 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Sign In</span>
                </Link>

                <button
                  id="btn-nav-book"
                  onClick={() => handleNavClick("/#appointment-section")}
                  className="flex items-center gap-1.5 bg-brand-primary hover:bg-[#0c8d8c] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-brand-primary/15 hover:translate-y-[-1px] transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburguer Button */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 transition-colors"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              )}
            </button>

            <a
              href="tel:+15557239900"
              className="p-2.5 text-rose-500 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 rounded-xl"
              title="Call Emergency Hotline"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl hover:text-brand-primary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mt-2 mx-4 rounded-2xl"
          >
            <div className="px-4 py-5 space-y-3">
              {!isAdminRoute ? (
                <div className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 rounded-xl transition-all"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-2">
                  <span className="text-xs font-mono bg-brand-primary/10 text-brand-primary font-bold px-3 py-1 rounded-full animate-pulse">
                    ADMIN CONSOLE MODE
                  </span>
                </div>
              )}

              {user && (
                <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-150 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-primary text-white font-extrabold rounded-xl flex items-center justify-center shadow-inner uppercase">
                    {(user.displayName || user.email || "P").substring(0, 2)}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[170px]">
                      {user.displayName || user.email?.split("@")[0] || "Patient User"}
                    </h5>
                    <span className={`inline-block text-[9px] font-extrabold px-1.5 py-0.5 rounded mt-0.5 uppercase tracking-wide leading-none ${
                      isAdmin 
                        ? "bg-amber-100 dark:bg-amber-955/40 text-amber-700 dark:text-amber-400"
                        : "bg-teal-100 dark:bg-teal-955/40 text-teal-700 dark:text-teal-400"
                    }`}>
                      {isAdmin ? "Admin Role" : "Patient Role"}
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                {isAdminRoute ? (
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="flex justify-center items-center gap-2 w-full text-center text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 font-bold px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Exit Admin Dashboard
                  </Link>
                ) : (
                  <div className="space-y-2">
                    {user ? (
                      <>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setIsOpen(false)}
                            className="flex justify-center items-center gap-2 w-full text-center text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 font-bold px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Open Admin Panel</span>
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            logout();
                            navigate("/");
                          }}
                          className="flex justify-center items-center gap-2 w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-4 py-3 rounded-xl hover:text-rose-700 transition-all border border-rose-100/40"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out of Account</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setIsOpen(false)}
                          className="flex justify-center items-center gap-2 w-full text-center text-white bg-brand-primary font-bold px-4 py-3 rounded-xl hover:bg-brand-primary/95 transition-all shadow-md shadow-brand-primary/10"
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Sign In / Sign Up</span>
                        </Link>
                        
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="flex justify-center items-center gap-2 w-full text-center text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/70 font-semibold px-4 py-3 rounded-xl hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Admin Portal Preview</span>
                        </Link>
                      </>
                    )}

                    <button
                      onClick={() => handleNavClick("/#appointment-section")}
                      className="flex justify-center items-center gap-2 w-full bg-brand-primary/15 text-brand-primary font-extrabold px-4 py-3 rounded-xl hover:bg-brand-primary/20 transition-all border border-brand-primary/10"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

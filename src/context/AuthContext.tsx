import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// JWT Helper Utilities
function encodeJwt(payload: any): string {
  try {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    // Using escape/unescape for robust UTF-8 support inside base64 packing
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const signature = "paws_care_secure_jwt_secret_sig";
    return `${header}.${data}.${signature}`;
  } catch (e) {
    return "invalid_jwt_token";
  }
}

function decodeJwt(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const dataStr = decodeURIComponent(escape(atob(parts[1])));
    return JSON.parse(dataStr);
  } catch (e) {
    return null;
  }
}

interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "patient" | "doctor";
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  isDemoAuth: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  promoteToAdmin: () => void;
  demoteToUser: () => void;
  loginAsDemoUser: (role: "admin" | "patient" | "doctor", name?: string, email?: string) => void;
  googleModalOpen: boolean;
  setGoogleModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial preseeded core database of users
const INITIAL_DEMO_USERS = [
  {
    uid: "paws-user-admin-james",
    email: "admin@paws.com",
    password: "admin123",
    displayName: "Dr. James Carter",
    role: "admin" as const,
  },
  {
    uid: "paws-user-doc-sarah",
    email: "doctor@paws.com",
    password: "password",
    displayName: "Dr. Sarah Jenkins",
    role: "admin" as const, // both act as admin view clearance
  },
  {
    uid: "paws-user-client-eleanor",
    email: "patient@paws.com",
    password: "password",
    displayName: "Eleanor Vance",
    role: "patient" as const,
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  // Initialize and load user registry and check local JWT storage on startup
  useEffect(() => {
    // Seed standard accounts if not yet set
    const savedRegistry = localStorage.getItem("paws_local_users");
    if (!savedRegistry) {
      localStorage.setItem("paws_local_users", JSON.stringify(INITIAL_DEMO_USERS));
    }

    const storedToken = localStorage.getItem("paws_jwt_token");
    if (storedToken) {
      const decoded = decodeJwt(storedToken);
      if (decoded && decoded.exp > Date.now()) {
        setUser({
          uid: decoded.uid,
          email: decoded.email,
          displayName: decoded.displayName,
          role: decoded.role,
        });
        setToken(storedToken);
      } else {
        // Token format outdated or expired
        localStorage.removeItem("paws_jwt_token");
      }
    }
    setLoading(false);
  }, []);

  const isAdmin = user?.role === "admin";
  const isDemoAuth = true; // JWT simulation behaves like an offline safe testing sandbox mode!

  // Helper helper to generate and persists jwt session
  const saveSession = (profile: AuthUser) => {
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 Hours duration
    const jwtString = encodeJwt({
      uid: profile.uid,
      email: profile.email,
      displayName: profile.displayName,
      role: profile.role,
      exp: expiresAt,
    });

    localStorage.setItem("paws_jwt_token", jwtString);
    setUser(profile);
    setToken(jwtString);
  };

  const loginWithEmail = async (emailInput: string, passInput: string) => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const emailNorm = emailInput.trim().toLowerCase();
    const registryStr = localStorage.getItem("paws_local_users") || JSON.stringify(INITIAL_DEMO_USERS);
    const usersList = JSON.parse(registryStr);

    const matched = usersList.find((u: any) => u.email.toLowerCase() === emailNorm);
    if (!matched) {
      setLoading(false);
      throw new Error("No clinical account found with that email. Choose patient@paws.com or register a new sandbox user.");
    }

    if (matched.password !== passInput) {
      setLoading(false);
      throw new Error("Incorrect system credentials. Hint: Password is 'password' or check pre-seeds.");
    }

    saveSession({
      uid: matched.uid,
      email: matched.email,
      displayName: matched.displayName,
      role: matched.role,
    });
    setLoading(false);
  };

  const signUpWithEmail = async (emailInput: string, passInput: string, fullName: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const emailNorm = emailInput.trim().toLowerCase();
    const registryStr = localStorage.getItem("paws_local_users") || JSON.stringify(INITIAL_DEMO_USERS);
    const usersList = JSON.parse(registryStr);

    if (usersList.some((u: any) => u.email.toLowerCase() === emailNorm)) {
      setLoading(false);
      throw new Error(`Account already exists for ${emailNorm}. Use other email or Sign In instead.`);
    }

    // Determine sandbox role from tags
    let resolvedRole: "admin" | "patient" | "doctor" = "patient";
    if (emailNorm.includes("admin") || emailNorm.endsWith("@paws.com")) {
      resolvedRole = "admin";
    }

    const newUserObj = {
      uid: `paws-user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      email: emailNorm,
      password: passInput,
      displayName: fullName,
      role: resolvedRole
    };

    const updated = [...usersList, newUserObj];
    localStorage.setItem("paws_local_users", JSON.stringify(updated));

    saveSession({
      uid: newUserObj.uid,
      email: newUserObj.email,
      displayName: newUserObj.displayName,
      role: newUserObj.role,
    });
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    // Open specialized mock Google modal to choose any customized role on the fly
    setGoogleModalOpen(true);
  };

  const loginAsDemoUser = (role: "admin" | "patient" | "doctor", name?: string, email?: string) => {
    const mockUid = `paws-demo-${role}-${Date.now().toString().slice(-4)}`;
    const profile: AuthUser = {
      uid: mockUid,
      email: email || `${role}@paws.com`,
      displayName: name || (role === "admin" ? "Dr. James Carter" : "Eleanor Vance"),
      role: role === "doctor" ? "admin" : role, // doctor matches admin views
    };

    saveSession(profile);
  };

  const logout = async () => {
    setLoading(true);
    localStorage.removeItem("paws_jwt_token");
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  const promoteToAdmin = () => {
    if (user) {
      const updatedUser: AuthUser = { ...user, role: "admin" };
      saveSession(updatedUser);
    }
  };

  const demoteToUser = () => {
    if (user) {
      const updatedUser: AuthUser = { ...user, role: "patient" };
      saveSession(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      loading, 
      isAdmin, 
      isDemoAuth,
      loginWithGoogle, 
      loginWithEmail, 
      signUpWithEmail, 
      logout,
      promoteToAdmin,
      demoteToUser,
      loginAsDemoUser,
      googleModalOpen,
      setGoogleModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

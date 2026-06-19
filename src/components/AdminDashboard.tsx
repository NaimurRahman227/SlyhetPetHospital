import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  Layers,
  Heart,
  MessageSquare,
  ShieldCheck,
  Trash2,
  Clock,
  LayoutDashboard,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Search,
  CheckCircle,
  FileSpreadsheet,
  XCircle,
  PawPrint,
  Lock,
  LogIn
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import { doctorsData, testimonialsData } from "../mockData";
import { Appointment, ContactMessage, DashboardStats } from "../types";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "appointments" | "doctors" | "testimonials" | "messages">("dashboard");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [appointmentSearch, setAppointmentSearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");

  // Load database items on mounting or changes
  const loadData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [appRes, msgRes, statsRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/contacts"),
        fetch("/api/stats")
      ]);

      if (!appRes.ok || !msgRes.ok || !statsRes.ok) {
        throw new Error("Failed to transceive data from veterinary backend.");
      }

      const appData = await appRes.json();
      const msgData = await msgRes.json();
      const statsData = await statsRes.json();

      setAppointments(appData);
      setMessages(msgData);
      setStats(statsData);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Could not retrieve MongoDB database collections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) {
      loadData();
    }
  }, [user, isAdmin]);

  // Update status (Confirmed, Completed, Cancelled)
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error("Failed to edit reservation status inside database.");
      }

      // Update locally
      setAppointments((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus as any } : app))
      );
      
      // Reload stats aggregates
      const statsRes = await fetch("/api/stats");
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Delete Reservation
  const handleDeleteAppointment = async (id: string) => {
    if (!window.confirm("Are you absolutely sure you want to cancel and delete this appointment from MongoDB?")) {
      return;
    }
    try {
      const response = await fetch(`/api/appointments/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to drop appointment from database.");
      }

      setAppointments((prev) => prev.filter((app) => app._id !== id));
      
      const statsRes = await fetch("/api/stats");
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Delete Contact message
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Delete this inquiry from logs? This is irreversible.")) {
      return;
    }
    try {
      const response = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to drop message.");
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== id));

      const statsRes = await fetch("/api/stats");
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Filter lists based on search bars
  const filteredAppointments = appointments.filter(
    (app) =>
      app.ownerName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.petName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
      app.doctorSelection.toLowerCase().includes(appointmentSearch.toLowerCase())
  );

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
      msg.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
      (msg.subject && msg.subject.toLowerCase().includes(messageSearch.toLowerCase()))
  );

  // Pie Chart Colors
  const COLORS = ["#0EA5A4", "#1E293B", "#F59E0B", "#10B981", "#EC4899", "#8B5CF6"];

  // 1. Guard check for loading auth state
  if (authLoading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[70vh] space-y-4">
        <svg className="animate-spin h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-sm font-extrabold text-[#0ea5a4] font-mono tracking-wider animate-pulse">
          VERIFYING ACCESS PRIVILEGES...
        </p>
      </div>
    );
  }

  // 2. Guard check for authenticated administrator state
  if (!user || !isAdmin) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 transition-colors duration-300">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-150 dark:border-slate-800 text-center relative overflow-hidden group">
          
          {/* Decorative ambient gradients */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-brand-primary/10 dark:bg-brand-primary/5 rounded-full blur-2xl pointer-events-none" />

          {/* Secure lock visual icon */}
          <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-950/45 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 border border-amber-200/50 dark:border-amber-800/40">
            <Lock className="w-8 h-8 animate-pulse" />
          </div>

          <p className="text-xs font-mono font-extrabold text-brand-primary tracking-widest uppercase mb-2">
            Clinical Security Center
          </p>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-3">
            Administrative Access Only
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            This sector manages sensitive medical treatment charts, surgeon schedules, emergency medical calls, and pet parent feedback forms.
          </p>

          {/* Sandbox Info Box */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-850 text-left mb-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="font-extrabold text-brand-primary block uppercase tracking-wider mb-1">
              Sandbox Test Credentials:
            </span>
            To instantly unlock full administrator permissions:
            <ul className="list-disc pl-4 mt-1.5 space-y-1">
              <li>Sign in/register with any email containing <code className="font-mono bg-slate-200 dark:bg-slate-800 px-1 rounded text-[#0ea5a4]">admin</code> (e.g., <code className="font-mono text-[#0ea5a4]">admin@paws.com</code>)</li>
              <li>Or simply click the <span className="font-bold text-slate-700 dark:text-slate-300">"Admin Sandbox Bypass"</span> checkmark on the Sign In dashboard.</li>
            </ul>
          </div>

          {/* Navigation action buttons */}
          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 bg-[#0ea5a4] hover:bg-[#0c8d8c] text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-lg shadow-brand-primary/15 hover:shadow-brand-primary/30"
            >
              <LogIn className="w-4 h-4" />
              <span>Go to Sign In Dashboard</span>
            </Link>
            
            <Link
              to="/"
              className="text-slate-600 dark:text-slate-400 font-semibold text-sm hover:text-slate-850 dark:hover:text-slate-200 transition-colors py-2"
            >
              Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !stats) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <svg className="animate-spin h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-sm font-extrabold text-slate-600 font-mono">Syncing with Paws & Care MongoDB Database...</p>
      </div>
    );
  }

  return (
    <section className="pt-28 pb-16 bg-slate-100 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Error strip */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl flex items-center gap-3 text-rose-800 dark:text-rose-300 text-sm font-semibold animate-shake">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg} - Defaulting to standalone local fallback variables if database cluster is waking up.</span>
          </div>
        )}

        {/* Dashboard Frame */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 grid lg:grid-cols-12 min-h-[750px] transition-colors duration-300">
          
          {/* Dashboard SIDEBAR */}
          <div className="lg:col-span-3 bg-slate-900 text-slate-355 p-6 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Profile stamp */}
              <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Hospital Admin</h4>
                  <p className="text-[10px] font-mono text-brand-primary font-bold">Paws & Care Console</p>
                </div>
              </div>

              {/* Sidebar Menu elements */}
              <nav className="flex flex-col gap-1.5 font-bold text-xs sm:text-sm">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "dashboard"
                      ? "bg-brand-primary text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Overview stats
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab("appointments")}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "appointments"
                      ? "bg-brand-primary text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Appointments
                    <span className="ml-1.5 bg-teal-500/20 text-teal-400 border border-teal-500/30 text-[9px] px-1.5 py-0.5 rounded-full">
                      {appointments.length}
                    </span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab("doctors")}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "doctors"
                      ? "bg-brand-primary text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Expert Roster
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab("testimonials")}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "testimonials"
                      ? "bg-brand-primary text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Reviews Feed
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setActiveTab("messages")}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "messages"
                      ? "bg-brand-primary text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Inquiry Inbox
                    <span className="ml-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] px-1.5 py-0.5 rounded-full">
                      {messages.length}
                    </span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </nav>
            </div>

            {/* Bottom logout toggle link */}
            <div className="pt-6 border-t border-slate-800 text-center font-bold text-xs text-slate-500">
              <Link to="/" className="text-slate-450 hover:text-white hover:underline block cursor-pointer">
                Return to Landing App
              </Link>
            </div>
          </div>

          {/* Dashboard BODY CONTENT */}
          <div className="lg:col-span-9 p-8 sm:p-10 space-y-8 bg-slate-50 dark:bg-slate-950 relative overflow-x-hidden transition-colors duration-300">
            
            {/* 1. TABS CONTENT: STATS OVERVIEW & CHARTS */}
            {activeTab === "dashboard" && stats && (
              <div className="space-y-8 animate-fade-in">
                {/* Headline */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Active Analytics Overview</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold mt-1">Live aggregates compiled from your MongoDB cluster connection.</p>
                  </div>
                  <button
                    onClick={loadData}
                    className="flex items-center gap-1.5 bg-white border border-slate-200/80 hover:border-brand-primary hover:text-brand-primary text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all cursor-pointer font-bold"
                  >
                    Refresh Sync
                  </button>
                </div>

                {/* Agg Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/50 space-y-2 relative overflow-hidden">
                    <div className="absolute right-[-15px] bottom-[-15px] opacity-10 text-brand-primary">
                      <Calendar className="w-16 h-16" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Appointments</p>
                    <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalAppointments}</h3>
                    <p className="text-[10px] text-emerald-500 font-extrabold">+{stats.growth.appointments}% compared to yesterday</p>
                  </div>
                  {/* Card 2 */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/50 space-y-2 relative overflow-hidden">
                    <div className="absolute right-[-15px] bottom-[-15px] opacity-10 text-teal-500">
                      <Users className="w-16 h-16" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Visitors</p>
                    <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalVisitors}</h3>
                    <p className="text-[10px] text-emerald-500 font-extrabold">+{stats.growth.visitors}% growth from last week</p>
                  </div>
                  {/* Card 3 */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/50 space-y-2 relative overflow-hidden">
                    <div className="absolute right-[-15px] bottom-[-15px] opacity-10 text-amber-500">
                      <ShieldCheck className="w-16 h-16" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Doctors on Shift</p>
                    <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalDoctors}</h3>
                    <p className="text-[10px] text-slate-400 font-extrabold">6 fully board-certified veteleads</p>
                  </div>
                  {/* Card 4 */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/50 space-y-2 relative overflow-hidden">
                    <div className="absolute right-[-15px] bottom-[-15px] opacity-10 text-blue-500">
                      <MessageSquare className="w-16 h-16" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inbox Enquiries</p>
                    <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalMessages}</h3>
                    <p className="text-[10px] text-slate-400 font-extrabold">All processed securely in DB</p>
                  </div>
                </div>

                {/* CHARTS CONTAINER USING RECHARTS */}
                <div className="grid md:grid-cols-12 gap-8">
                  {/* Left Column: Line/Area trend */}
                  <div className="md:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800">Hospital Traffic & Daily Bookings</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Trend tracking arrivals and reservations over the last 7 days.</p>
                    </div>

                    <div className="h-64 filter drop-shadow-sm text-[10px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats.dailyTrend}>
                          <defs>
                            <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0EA5A4" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#0EA5A4" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="appointments"
                            name="New Bookings"
                            stroke="#0EA5A4"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorApp)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Right Column: Pie breakdown */}
                  <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800">Pet Type Breakdowns</h4>
                      <p className="text-[10px] text-slate-400 font-bold">Statistical ratio of pet species currently registered in DB.</p>
                    </div>

                    <div className="h-44 flex items-center justify-center text-[10px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.petData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {stats.petData.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legends */}
                    <div className="flex flex-wrap gap-2.5 justify-center text-[10px] font-bold text-slate-600">
                      {stats.petData.map((item: any, idx: number) => (
                        <div key={item.name} className="flex items-center gap-1">
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          />
                          <span>{item.name} ({item.value})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dynamic recent list */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-800">Up-Next Active Consultations</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-semibold text-slate-600">
                      <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-sidebar-divider">
                        <tr>
                          <th className="py-3 px-4">Owner Name</th>
                          <th className="py-3 px-2">Pet Patient</th>
                          <th className="py-3 px-2">Preference Doctor</th>
                          <th className="py-3 px-2">Scheduled Date</th>
                          <th className="py-3 px-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {appointments.slice(0, 3).map((app) => (
                          <tr key={app._id} className="hover:bg-slate-50/50">
                            <td className="py-3.5 px-4 font-bold text-slate-800">{app.ownerName}</td>
                            <td className="py-3.5 px-2">
                              {app.petName} <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full uppercase ml-1">{app.petType}</span>
                            </td>
                            <td className="py-3.5 px-2">{app.doctorSelection}</td>
                            <td className="py-3.5 px-2 font-mono">
                              {new Date(app.preferredDate).toLocaleDateString("en-US")}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                app.status === "Confirmed"
                                  ? "bg-teal-50 text-brand-primary"
                                  : app.status === "Completed"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : app.status === "Cancelled"
                                  ? "bg-rose-50 text-rose-500"
                                  : "bg-amber-50 text-amber-500"
                              }`}>
                                {app.status || "Pending"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* 2. TABS CONTENT: APPOINTMENT MANAGER */}
            {activeTab === "appointments" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Manage Patient Reservations</h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Audit active bookings, assign confirmations, and delete cancelled records.</p>
                  </div>
                  {/* Search box */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-[50%] translate-y-[-50%] text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      value={appointmentSearch}
                      onChange={(e) => setAppointmentSearch(e.target.value)}
                      className="w-full text-xs font-semibold py-2.5 pl-9 pr-3 rounded-xl border border-slate-200 outline-none focus:border-brand-primary bg-white text-slate-700"
                    />
                  </div>
                </div>

                {filteredAppointments.length > 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-semibold text-slate-600 min-w-[700px]">
                        <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="py-4 px-4">Owner & Pet Details</th>
                            <th className="py-4 px-4">Contact Contact</th>
                            <th className="py-4 px-4">Veterinarian Preferred</th>
                            <th className="py-4 px-4">Date scheduled</th>
                            <th className="py-4 px-4">Status state</th>
                            <th className="py-4 px-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150">
                          {filteredAppointments.map((app) => (
                            <tr key={app._id} className="hover:bg-slate-50/50">
                              <td className="py-4 px-4">
                                <h4 className="font-extrabold text-slate-900">{app.ownerName}</h4>
                                <p className="text-[10px] text-slate-450 mt-0.5">
                                  Pet: <span className="font-extrabold text-slate-700">{app.petName}</span> ({app.petType})
                                </p>
                              </td>
                              <td className="py-4 px-4 text-slate-500 space-y-0.5 font-mono text-[10px]">
                                <div>{app.phone}</div>
                                <div>{app.email}</div>
                              </td>
                              <td className="py-4 px-4 font-bold text-slate-800">{app.doctorSelection}</td>
                              <td className="py-4 px-4">
                                <span className="font-mono">{new Date(app.preferredDate).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                                  app.status === "Confirmed"
                                    ? "bg-teal-50 text-brand-primary border border-brand-primary/10"
                                    : app.status === "Completed"
                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                    : app.status === "Cancelled"
                                    ? "bg-rose-50 text-rose-500 border border-rose-100"
                                    : "bg-amber-50 text-amber-600 border border-amber-100"
                                }`}>
                                  {app.status || "Pending"}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex gap-1.5 justify-center items-center">
                                  {app.status === "Pending" && (
                                    <button
                                      onClick={() => handleUpdateStatus(app._id!, "Confirmed")}
                                      className="p-1.5 bg-brand-primary/10 hover:bg-brand-primary hover:text-white rounded-lg text-brand-primary transition-all cursor-pointer"
                                      title="Confirm Visit"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  {app.status === "Confirmed" && (
                                    <button
                                      onClick={() => handleUpdateStatus(app._id!, "Completed")}
                                      className="p-1.5 bg-emerald-50 hover:bg-emerald-500 hover:text-white rounded-lg text-emerald-600 transition-all cursor-pointer"
                                      title="Complete Visit"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteAppointment(app._id!)}
                                    className="p-1.5 bg-rose-50 hover:bg-rose-500 hover:text-white rounded-lg text-rose-550 transition-all cursor-pointer"
                                    title="Cancel & Delete Visit"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 bg-white rounded-2xl border text-center font-bold text-slate-500 space-y-2">
                    <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                    <p>No reservations currently in the database queue.</p>
                  </div>
                )}
              </div>
            )}

            {/* 3. TABS CONTENT: DOCTORS ROSTER */}
            {activeTab === "doctors" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Veterinary Roster & Availabilities</h2>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Review core shifts, specialty profiles, and direct inbox contacts.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {doctorsData.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-2xl p-5 border border-slate-250 flex gap-4">
                      <img src={doc.image} alt={doc.name} className="h-20 w-20 rounded-xl object-cover shrink-0 bg-slate-100" />
                      <div className="space-y-2 flex-grow">
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-extrabold text-slate-900 leading-tight">{doc.name}</h4>
                          <p className="text-[10px] text-brand-primary font-bold">{doc.specialty}</p>
                        </div>
                        <p className="text-[10px] text-slate-500 italic leading-snug line-clamp-2">{doc.bio}</p>
                        <div className="text-[9px] font-bold text-slate-450 pt-1 flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-brand-primary" />
                          <span>Shift: {doc.availability}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. TABS CONTENT: TESTIMONIALS */}
            {activeTab === "testimonials" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Client Reviews Log</h2>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Review active emotional validations posted of pet patients.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {testimonialsData.map((test) => (
                    <div key={test.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative space-y-4">
                      {/* Customer stamp */}
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <img src={test.customerPhoto} alt={test.customerName} className="h-10 w-10 rounded-full object-cover shrink-0 bg-slate-100" />
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-800 leading-snug">{test.customerName}</h4>
                            <p className="text-[9px] text-slate-400 font-bold">{test.customerRole}</p>
                          </div>
                        </div>
                        <div className="flex gap-1 text-amber-400 text-[10px]">
                          {Array.from({ length: test.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-650 leading-relaxed font-semibold italic">"{test.review}"</p>
                      
                      {/* Pet tag */}
                      <div className="inline-flex items-center gap-2.5 bg-slate-50 border border-slate-150 rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-600">
                        <img src={test.petPhoto} alt={test.petName} className="h-5 w-5 rounded-full object-cover bg-slate-100" />
                        <span>Recovered Patient: <span className="text-slate-900 font-extrabold">{test.petName}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. TABS CONTENT: MESSAGES */}
            {activeTab === "messages" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Inquiry Messages Box</h2>
                    <p className="text-xs text-slate-500 font-semibold mt-1">Audit guest questions submitted via the physical contact form.</p>
                  </div>
                  {/* Search bar */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-[50%] translate-y-[-50%] text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={messageSearch}
                      onChange={(e) => setMessageSearch(e.target.value)}
                      className="w-full text-xs font-semibold py-2.5 pl-9 pr-3 rounded-xl border border-slate-200 outline-none focus:border-brand-primary bg-white text-slate-705 text-slate-800"
                    />
                  </div>
                </div>

                {filteredMessages.length > 0 ? (
                  <div className="space-y-4">
                    {filteredMessages.map((msg) => (
                      <div key={msg._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-extrabold text-slate-900">{msg.name}</h4>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold text-slate-400">
                              <span className="font-mono text-brand-primary">{msg.email}</span>
                              <span>•</span>
                              <span>Received: {msg.createdAt ? new Date(msg.createdAt).toLocaleString("en-US") : "Today"}</span>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteMessage(msg._id!)}
                            className="p-2 text-rose-500 bg-rose-50 rounded-xl hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                            title="Delete Inquiry Log"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>

                        <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl space-y-1.5 text-xs">
                          {msg.subject && <p className="font-extrabold text-slate-850">Subject: <span className="font-medium text-slate-700">{msg.subject}</span></p>}
                          <p className="font-semibold text-slate-600 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 bg-white rounded-2xl border text-center font-bold text-slate-500 space-y-2">
                    <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                    <p>No inquiries currently logged in the MongoDB collection.</p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}

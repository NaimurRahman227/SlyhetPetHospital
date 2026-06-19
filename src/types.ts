export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  image: string;
  email: string;
  phone: string;
  bio: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface Appointment {
  _id?: string;
  ownerName: string;
  email: string;
  phone: string;
  petName: string;
  petType: "Dog" | "Cat" | "Bird" | "Rabbit" | "Other";
  doctorSelection: string;
  preferredDate: string;
  status?: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt?: string;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerRole?: string;
  customerPhoto: string;
  petName: string;
  petPhoto: string;
  review: string;
  rating: number;
}

export interface HealthTip {
  id: string;
  title: string;
  category: "Nutrition" | "Vaccination" | "Dental" | "Prevention";
  summary: string;
  content: string;
  image: string;
  readTime: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Pets" | "Facilities" | "Doctors" | "Grooming";
  image: string;
  cols?: number; // for masonry grid layouts
}

export interface DashboardStats {
  totalAppointments: number;
  totalVisitors: number;
  totalDoctors: number;
  totalMessages: number;
  growth: {
    appointments: number;
    visitors: number;
    messages: number;
  };
}

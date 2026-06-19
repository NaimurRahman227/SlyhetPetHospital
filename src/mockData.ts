import { Doctor, Testimonial, HealthTip, GalleryItem } from "./types";

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string; // Will match Lucide icon names dynamically
  image: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "pet-checkups",
    title: "Comprehensive Wellness Checkups",
    shortDesc: "Routine medical exams, weight monitoring, and health screenings tailored to your pet's age.",
    longDesc: "Our comprehensive wellness exams are the foundation of your pet's long-term health. We examine eyes, ears, teeth, heart, lungs, and joints to catch any early signs of health challenges. Tailored preventive recommendations are provided at each stage of your pet's life.",
    iconName: "Stethoscope",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=720"
  },
  {
    id: "vaccination",
    title: "Advanced Vaccinations",
    shortDesc: "Essential vaccines and customized immunisation plans to shield pets from infections.",
    longDesc: "Protect your furry companions from serious contagious diseases. We formulate customized vaccination schedules based on your pet's risk profile, lifestyle, and local epidemiological threats to ensure optimum protective antibodies.",
    iconName: "Shield",
    image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&q=80&w=720"
  },
  {
    id: "surgery",
    title: "Modern Veterinary Surgery",
    shortDesc: "Highly safe soft-tissue and orthopedic procedures using state-of-the-art anesthetic monitoring.",
    longDesc: "Our surgical suite features advanced physiological monitors, temperature-regulated tables, and sterilized surgical instruments. From standard spay/neuter routines to complex internal reconstructive and orthopedic surgeries, our expert clinical team handles everything with unmatched precision and care.",
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=720"
  },
  {
    id: "dental-care",
    title: "Deep Dental Prophylaxis",
    shortDesc: "Professional scale & polish under safe general anesthesia to fight periodontal disease.",
    longDesc: "Oral hygiene directly impacts your pet's vital organs like the heart and kidneys. We perform complete dental cleanings, ultrasonic scaling, subgingival cleaning, dental X-rays, and extractions to alleviate pain and arrest systemic bacterial entry.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&q=80&w=720"
  },
  {
    id: "pet-grooming",
    title: "Premium Aesthetic Grooming",
    shortDesc: "Relaxing therapeutic bath, meticulous breed-specific haircuts, claw trims, and ear flushing.",
    longDesc: "A happy pet starts with healthy skin and hair. Our expert groomers offer soothing medicated skin-conditioner baths, detangling, hand-blow drying, deshedding treatments, nail filing, and external expression procedures to ensure they feel and look like superstars.",
    iconName: "Scissors",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=720"
  },
  {
    id: "emergency-care",
    title: "24/7 Lifeline Emergency Care",
    shortDesc: "Instant critical care, emergency trauma intervention, toxic ingress management, and oxygenation.",
    longDesc: "When every second counts, Paws & Care is ready with an active ICU. We are staffed 24 hours a day, 365 days a year. Our emergency workflows include triage protocols, real-time blood gas analysis, mechanical ventilators, and specialized surgical standby.",
    iconName: "HeartPulse",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=720"
  },
  {
    id: "laboratory-tests",
    title: "In-House Advanced Laboratory",
    shortDesc: "High-speed blood screening, urinalysis, biochemistry, digital microscopy, and pathology.",
    longDesc: "We don't believe in waiting days for critical reports. Our comprehensive in-house diagnostics suite is fully integrated with automated analyzers, providing hematology, organ profile values, endocrine tests, and coagulation benchmarks in under 15 minutes.",
    iconName: "FlaskConical",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&q=80&w=720"
  },
  {
    id: "pet-boarding",
    title: "Luxury Safe Retreat Boarding",
    shortDesc: "Climate-controlled suites, supervised playtime, premium nutrition, and on-call vet security.",
    longDesc: "Treat your pet to a five-star vacation while you travel! Our temperature-regulated boarding complex has separate canine and feline wings to minimize sensory distress, custom raised cot bedding, customizable feeding plans, and hourly behavioral checks.",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=720"
  }
];

export const doctorsData: Doctor[] = [
  {
    id: "dr-mitchell",
    name: "Dr. Sarah Mitchell",
    specialty: "Chief Medical Officer & Lead Surgeon",
    experience: "12 Years Experience",
    availability: "Mon, Tue, Wed (09:00 AM - 05:00 PM)",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    email: "s.mitchell@pawsandcare.com",
    phone: "+1 (555) 723-9901",
    bio: "Dr. Mitchell graduated with top honors from Cornell University College of Veterinary Medicine. She specializes in minimally invasive soft tissue surgery and is committed to using fear-free clinical strategies.",
    socials: { twitter: "#", linkedin: "#", facebook: "#" }
  },
  {
    id: "dr-mercer",
    name: "Dr. Alex Mercer",
    specialty: "Senior Cardiologist & Internal Medicine",
    experience: "10 Years Experience",
    availability: "Tue, Thu, Fri (10:00 AM - 06:00 PM)",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    email: "a.mercer@pawsandcare.com",
    phone: "+1 (555) 723-9902",
    bio: "An authority on canine congestive heart failure, Dr. Mercer completed his residency at UC Davis. He loves helping older pets preserve their quality of life via state-of-the-art pharmacological management.",
    socials: { linkedin: "#", facebook: "#" }
  },
  {
    id: "dr-rostova",
    name: "Dr. Elena Rostova",
    specialty: "Exotics & Small Mammals Specialist",
    experience: "8 Years Experience",
    availability: "Mon, Wed, Fri (09:00 AM - 04:00 PM)",
    image: "https://images.unsplash.com/photo-1594824497964-58615b41437b?auto=format&fit=crop&q=80&w=400",
    email: "e.rostova@pawsandcare.com",
    phone: "+1 (555) 723-9903",
    bio: "Dr. Rostova has a global reputation in avian medicine, treating domestic reptiles, birds, and pocket pets including ferrets, hedgehogs, and rabbits. She works closely with local pet rehabilitation sanctuaries.",
    socials: { twitter: "#", linkedin: "#" }
  },
  {
    id: "dr-carter",
    name: "Dr. James Carter",
    specialty: "Orthopedic & Joint Surgery Specialist",
    experience: "14 Years Experience",
    availability: "Wed, Thu, Sat (11:00 AM - 07:00 PM)",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    email: "j.carter@pawsandcare.com",
    phone: "+1 (555) 723-9904",
    bio: "Dr. Carter holds a patent on advanced biological knee implants for larger dogs. He is passionate about getting energetic animals back on four legs through specialized physical therapy and surgical repair.",
    socials: { twitter: "#", facebook: "#" }
  },
  {
    id: "dr-vance",
    name: "Dr. Sophia Vance",
    specialty: "Feline Rehabilitation & Dermatology",
    experience: "7 Years Experience",
    availability: "Mon, Thu, Fri (08:00 AM - 04:00 PM)",
    image: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=400",
    email: "s.vance@pawsandcare.com",
    phone: "+1 (555) 723-9905",
    bio: "Dr. Vance is a certified Feline Practitioner. She believes cats are unique medical patients who deserve a calm clinical environment, specializing in heavy-allergen food diets and complex dermatological conditions.",
    socials: { linkedin: "#", twitter: "#" }
  },
  {
    id: "dr-broady",
    name: "Dr. Marcus Broady",
    specialty: "Critical Emergency Care Director",
    experience: "9 Years Experience",
    availability: "Flexible - 24/7 ICU Lead Rotation",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    email: "m.broady@pawsandcare.com",
    phone: "+1 (555) 723-9906",
    bio: "A calm presence in high-stress situations, Dr. Broady thrives in our emergency ward. His background includes intensive military working-dog paramedic duties and advanced surgical disaster training.",
    socials: { facebook: "#", linkedin: "#" }
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    customerName: "Eleanor Vance",
    customerRole: "Golden Retriever Owner",
    customerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
    petName: "Cooper",
    petPhoto: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=300",
    rating: 5,
    review: "Dr. Mitchell restored our sweet Cooper's agility! When he tore his ACL, we was devastated. Her expertise in orthopedics, coupled with her warm patient follow-ups, helped Cooper run like a puppy again. Highly recommend!"
  },
  {
    id: "t2",
    customerName: "Jeremy Powell",
    customerRole: "Maine Coon Owner",
    customerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    petName: "Oreo",
    petPhoto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300",
    rating: 5,
    review: "Incredible staff. My Maine Coon Cat is extremely jumpy at the doctors, but Dr. Vance utilized her feline-only techniques which made Oreo feel right at home. The dental cleaning was very fast, transparent and completely stress-free."
  },
  {
    id: "t3",
    customerName: "Ananya Patel",
    customerRole: "Parrot & Turtle Rescuer",
    customerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    petName: "Kiwi",
    petPhoto: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=300",
    rating: 5,
    review: "Finding a vet who truly understands exotic parrots is nearly impossible. Dr. Elena Rostova is an absolute blessing. Her deep care and knowledge saved Kiwi from a respiratory infection. The boarding unit is clean and secure!"
  },
  {
    id: "t4",
    customerName: "Brandon Lee",
    customerRole: "French Bulldog Dad",
    customerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    petName: "Buster",
    petPhoto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=300",
    rating: 5,
    review: "Their 24/7 Emergency response is flawless. Buster swallowed a peach pit at 2 AM. We brought him rushed, and Dr. Broady removed it laparoscopically in 20 minutes! They saved my best friend's life. Words cannot express how grateful I am."
  },
  {
    id: "t5",
    customerName: "Catherine Zeta",
    customerRole: "Rabbit Enthusiast",
    customerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    petName: "Thumper",
    petPhoto: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=300",
    rating: 5,
    review: "Thumper was showing heavy tooth pain. Paws & Care has amazing rabbit dental specialized instruments. Dr. Mitchell treated him gently and walked us through nutrition changes carefully. Exceptional health center."
  },
  {
    id: "t6",
    customerName: "William Sterling",
    customerRole: "Labradoodle Owner",
    customerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    petName: "Daisy",
    petPhoto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300",
    rating: 5,
    review: "We regularly use the Premium Aesthetic Grooming package for Daisy. She comes out smelling phenomenal, completely clean, and her nail files are perfect. No cuts or quick-injuries, she wags her tail when walking into their lobby!"
  }
];

export const healthTipsData: HealthTip[] = [
  {
    id: "tip-nutrition",
    title: "Dog Nutrition Guide: Setting Solid Foundations",
    category: "Nutrition",
    summary: "Discover the vital components of high-protein formulas, raw-diet pros, and keeping weights aligned with lifespan.",
    content: "A healthy dog diet is not one-size-fits-all. Large breed puppies need specific calcium-to-phosphorus ratios to prevent skeletal rapid bone defects, while senior dogs require lower calorie counts with added supplements like glucosamine and omega-3 fatty acids for joint cartilage hydration. Ensure you check for real meat as the top ingredient and limit grain filler.",
    image: "https://images.unsplash.com/photo-1589741492723-5e9270b92e81?auto=format&fit=crop&q=80&w=600",
    readTime: "5 min read",
    date: "June 14, 2026"
  },
  {
    id: "tip-vaccination",
    title: "Understanding Cat Vaccination Schedules",
    category: "Vaccination",
    summary: "A timeline of core kitten vaccines (FVRCP) and non-core shields like feline leukemia (FeLV).",
    content: "Feline respiratory pathogens like Calicivirus are highly infectious. Introducing FVRCP booster vaccines at 8, 12, and 16 weeks provides vital immunity. For indoor/outdoor cats, we strongly emphasize the Feline Leukemia (FeLV) series, which shields of lymphatic tumors spread via shared bowls/rival groomings.",
    image: "https://images.unsplash.com/photo-1574158622643-69d34d72650a?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read",
    date: "May 28, 2026"
  },
  {
    id: "tip-dental",
    title: "Everyday Pet Dental Care Tips at Home",
    category: "Dental",
    summary: "How to brush canine/feline teeth, introducing enzyme toothpastes, and tracking bad breath triggers.",
    content: "More than 80% of dogs have periodontal disease by age 3. This oral bacteria enters their blood streams, gradually eroding kidneys, heart valves, and liver tissue. Prevent this by brushing twice a week with enzymatic pet toothpaste (Never use human paste, which contains toxic xylitol), and offering treats designed to break tartar safely.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=600",
    readTime: "6 min read",
    date: "April 19, 2026"
  },
  {
    id: "tip-prevention",
    title: "Preventing Fleas, Ticks, and Common Parasites",
    category: "Prevention",
    summary: "Breaking down systemic oral chews vs collars to shield against Lyme disease and heartworms.",
    content: "A single tick can transmit Lyme disease or Anaplasmosis inside 24 hours. In recent years, oral prevention tablets (isoxazolines) have proven significantly safer and more robust than traditional skin-applied oils. Pair this with a year-round heartworm medication to combat mosquito-originated parasites completely.",
    image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&q=80&w=600",
    readTime: "4 min read",
    date: "March 11, 2026"
  }
];

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "Dr. Sarah Mitchell holding a kitten",
    category: "Doctors",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g2",
    title: "State-of-the-Art Surgical Theater",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1584515934003-7f164dd24391?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g3",
    title: "Grooming session for a Pomeranian",
    category: "Grooming",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g4",
    title: "Happy Labrador in retriever workout",
    category: "Pets",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g5",
    title: "Feline climate-controlled suites",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g6",
    title: "Dr. Carter during emergency ultrasound",
    category: "Doctors",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g7",
    title: "Playful rabbit checkup diagnostic exam",
    category: "Pets",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "g8",
    title: "Styling scissor cut for Poodle puppy",
    category: "Grooming",
    image: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?auto=format&fit=crop&q=80&w=600"
  }
];

export const faqsData = [
  {
    id: "faq-1",
    question: "How often should my pet visit the vet for routine wellness?",
    answer: "Healthy puppies, kittens, and senior pets should visit more frequently. For adult dogs and cats (1 - 7 years old) with no existing chronic conditions, an annual comprehensive wellness examination, fecal analysis, and vaccination booster schedule is highly recommended. Pets above 7 years should be screened bi-annually as they enter critical aging phases."
  },
  {
    id: "faq-2",
    question: "What core vaccinations are legally or clinically mandatory?",
    answer: "For dogs, the Rabies vaccine is legally mandated across most regions, highly supported by the DHPP core booster (Distemper, Hepatitis, Parvovirus, Parainfluenza). For cats, Rabies and the FVRCP complex (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) are core requirements. Outdoor pets are strongly recommended to receive Lyme, Leptospirosis, or Feline Leukemia coverage."
  },
  {
    id: "faq-3",
    question: "Do you offer physical emergency services during holiday nights?",
    answer: "Yes, our emergency ICU is fully staffed 24/7/365. No matter if it's Thanksgiving night or 3 AM on a Monday, our emergency vet triage leads, surgical standby crew, and lifesupport oxygen complexes are online and capable of immediate response. If possible, call us while driving so we can prep a trauma suite."
  },
  {
    id: "faq-4",
    question: "How can I prep my pet for their surgical procedure?",
    answer: "Most surgeries requiring general anesthesia dictate complete fasting (no food of any kind) beginning at midnight the evening prior to the surgery. Watering is usually fine up to 2 hours before check-in. For stress-prone pets, let us know – we can dispense natural pre-visit relaxants to ensure a soft entry."
  },
  {
    id: "faq-5",
    question: "Are your appointments fully refundable if cancelled on short notice?",
    answer: "Absolutely! We do not charge scheduling or holding fees. We understand that pet schedules and emergencies change. If you can, please update us 24 hours in advance so we can release that doctor's block to another animal in clinical distress. Otherwise, you can reschedule via your client view or phone."
  }
];

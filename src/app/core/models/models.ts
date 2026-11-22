export type Role = 'user' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  goal?: string;
  level?: string;
  joinDate?: string;
  weight?: number;
  height?: number;
  xp?: number;
  badges?: string[];
}

export interface Trainer {
  id: number;
  initials: string;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  experience: string;
  specialties: string[];
  bio?: string;
  certifications?: string[];
  price?: number;
}

export interface WorkoutPlan {
  id: number;
  category: string;
  icon: string;
  rating: number;
  title: string;
  desc: string;
  duration: string;
  calories: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export interface GymClass {
  id: number;
  title: string;
  trainerId: number;
  category: string;
  schedule: string;
  capacity: number;
  spotsLeft: number;
}

export interface Booking {
  id: number;
  userId: number;
  classId: number;
  date: string;
  status: 'confirmed' | 'cancelled';
}

export interface KnowledgeEntry {
  id: number;
  topic: string;
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  sources?: string[];
}

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sets: number;
  reps: number;
  rest: number;
  description?: string;
  calories?: number;
}

export interface WorkoutSession {
  id: string;
  name: string;
  category: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: Exercise[];
  calories?: number;
  description?: string;
  targetMuscles?: string[];
  rating?: number;
}

export interface ProgressEntry {
  date: string;
  weight: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  arms?: number;
  legs?: number;
  bmi?: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number;
  currentDay: number;
  category: string;
  xpReward: number;
  badge?: string;
  enrolled?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  xp: number;
  badge?: string;
  change?: number;
}

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  type: 'class' | 'trainer' | 'membership' | 'supplement';
  description?: string;
}

export interface PaymentRecord {
  id: string;
  item: PaymentItem;
  date: string;
  cardLast4: string;
  status: 'paid';
}

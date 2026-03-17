export type ClientStatus = "Active" | "Paused" | "Completed";
export type PaymentStatus = "Paid" | "Pending" | "Overdue";
export type InvoiceStatus = PaymentStatus | "Draft";
export type Priority = "High" | "Medium" | "Low";

export interface Client {
  id: string;
  company: string;
  initials: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: ClientStatus;
  monthlyRetainer: number;
  videosDelivered: number;
  videosTarget: number;
  nextShootDate: string;
  lastPaymentStatus: PaymentStatus;
  totalRevenue: number;
  satisfactionScore: number;
  notes: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  editorName: string;
  editorInitials: string;
  dueDate: string;
  status: "Shooting" | "Editing" | "Review" | "Delivered";
  priority: Priority;
  progress: number;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  status: "Available" | "In Edit" | "On Shoot";
  videosPerWeek: number;
  avgEditHours: number;
  currentAssignment: string;
  output7Days: number[];
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  clientId: string;
  clientName: string;
  amount: number;
  dateIssued: string;
  dueDate: string;
  status: InvoiceStatus;
  description: string;
}

export interface MonthlyFinance {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  status: "New" | "Sent" | "Opened" | "Replied" | "Meeting" | "Won";
  lastContact: string;
  score: "Hot" | "Warm" | "Cold" | "New";
}

export interface ContentTrend {
  id: string;
  platform: "Instagram" | "LinkedIn" | "X" | "YouTube";
  preview: string;
  likes: number;
  shares: number;
  comments: number;
  viralScore: number;
  nicheTag: string;
}

export interface TweetTemplate {
  id: string;
  type: string;
  preview: string;
  prediction: string;
}

export interface TweetQueueItem {
  id: string;
  time: string;
  text: string;
  status: "Scheduled" | "Draft" | "Empty";
}

export interface LinkedInPost {
  id: string;
  author: string;
  headline: string;
  preview: string;
  reactions: number;
  comments: number;
  reposts: number;
}

export interface ActivityItem {
  id: string;
  type: "invoice" | "lead" | "delivery" | "payment" | "content" | "project";
  text: string;
  timestamp: string;
}

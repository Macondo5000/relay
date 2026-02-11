export interface Employee {
  id: string;
  name: string;
  department: string;
  roleDescription: string;
  avatarUrl: string;
  initials: string;
  status: 'active' | 'departing';
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  senderName?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  title: string;
  avatarBg: string;
  avatarText: string;
  role: 'admin' | 'active' | 'departing';
}

export interface Organization {
  id: string;
  name: string;
  logo: string;
}
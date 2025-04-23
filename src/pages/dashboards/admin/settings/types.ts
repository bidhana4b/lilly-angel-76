
export interface GeneralSettings {
  websiteName: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  timezone: string;
  currency: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  lastUpdated: string;
}

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  lastUpdated?: string;
  usersAssigned: number;
}

export interface Permission {
  id: string;
  module: string;
  action: 'view' | 'create' | 'edit' | 'delete' | 'manage';
  description: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

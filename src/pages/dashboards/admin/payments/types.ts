
export type PaymentMethod = "credit_card" | "debit_card" | "bank_transfer" | "cash" | "paypal";
export type PaymentStatus = "paid" | "pending" | "overdue" | "refunded" | "cancelled";

export interface Transaction {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  date: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  description: string;
  receiptUrl?: string;
}

export interface DuePayment {
  id: string;
  studentName: string;
  studentId: string;
  amount: number;
  dueDate: string;
  course: string;
  paymentFor: string;
  daysOverdue: number;
  lastReminder?: string;
}

export interface PaymentGateway {
  name: string;
  isActive: boolean;
  apiKey?: string;
  secretKey?: string;
  webhookKey?: string;
  lastUpdated?: string;
}


import { Transaction, DuePayment, PaymentGateway } from "./types";

export const mockTransactions: Transaction[] = [
  {
    id: "TRX-001",
    studentName: "Alex Johnson",
    studentId: "ST-1001",
    amount: 499.99,
    date: "2025-04-15",
    paymentMethod: "credit_card",
    status: "paid",
    description: "Tuition Fee - Spring Semester",
    receiptUrl: "/receipts/trx-001.pdf"
  },
  {
    id: "TRX-002",
    studentName: "Maria Garcia",
    studentId: "ST-1002",
    amount: 120.00,
    date: "2025-04-14",
    paymentMethod: "paypal",
    status: "paid",
    description: "Lab Equipment Fee",
    receiptUrl: "/receipts/trx-002.pdf"
  },
  {
    id: "TRX-003",
    studentName: "James Wilson",
    studentId: "ST-1010",
    amount: 1200.00,
    date: "2025-04-10",
    paymentMethod: "bank_transfer",
    status: "pending",
    description: "Tuition Fee - Summer Program"
  },
  {
    id: "TRX-004",
    studentName: "Sofia Chen",
    studentId: "ST-1022",
    amount: 350.00,
    date: "2025-04-05",
    paymentMethod: "debit_card",
    status: "paid",
    description: "Advanced Course Enrollment",
    receiptUrl: "/receipts/trx-004.pdf"
  },
  {
    id: "TRX-005",
    studentName: "Michael Davis",
    studentId: "ST-1015",
    amount: 49.99,
    date: "2025-04-03",
    paymentMethod: "credit_card",
    status: "refunded",
    description: "Workshop Registration - Canceled",
    receiptUrl: "/receipts/trx-005.pdf"
  },
  {
    id: "TRX-006",
    studentName: "Emma Rodriguez",
    studentId: "ST-1019",
    amount: 299.99,
    date: "2025-03-28",
    paymentMethod: "cash",
    status: "paid",
    description: "Library Fee and Semester Registration"
  },
  {
    id: "TRX-007",
    studentName: "David Kim",
    studentId: "ST-1008",
    amount: 599.99,
    date: "2025-03-25",
    paymentMethod: "bank_transfer",
    status: "paid",
    description: "International Student Program Fee",
    receiptUrl: "/receipts/trx-007.pdf"
  },
  {
    id: "TRX-008",
    studentName: "Olivia Martinez",
    studentId: "ST-1005",
    amount: 180.00,
    date: "2025-03-20",
    paymentMethod: "paypal",
    status: "overdue",
    description: "Student Activities Fee"
  }
];

export const mockDuePayments: DuePayment[] = [
  {
    id: "DUE-001",
    studentName: "Olivia Martinez",
    studentId: "ST-1005",
    amount: 180.00,
    dueDate: "2025-03-15",
    course: "Business Economics",
    paymentFor: "Student Activities Fee",
    daysOverdue: 39,
    lastReminder: "2025-04-10"
  },
  {
    id: "DUE-002",
    studentName: "Daniel Jackson",
    studentId: "ST-1014",
    amount: 450.00,
    dueDate: "2025-04-01",
    course: "Advanced Physics",
    paymentFor: "Lab Equipment Fee",
    daysOverdue: 22
  },
  {
    id: "DUE-003",
    studentName: "Sophia Adams",
    studentId: "ST-1023",
    amount: 1200.00,
    dueDate: "2025-04-10",
    course: "Computer Science",
    paymentFor: "Tuition Fee - Spring",
    daysOverdue: 13,
    lastReminder: "2025-04-15"
  },
  {
    id: "DUE-004",
    studentName: "James Wilson",
    studentId: "ST-1010",
    amount: 1200.00,
    dueDate: "2025-04-15",
    course: "Summer Program",
    paymentFor: "Tuition Fee - Summer Program",
    daysOverdue: 8
  },
  {
    id: "DUE-005",
    studentName: "Emily Zhang",
    studentId: "ST-1017",
    amount: 75.00,
    dueDate: "2025-04-20",
    course: "Art History",
    paymentFor: "Course Materials",
    daysOverdue: 3
  }
];

export const mockPaymentGateways: PaymentGateway[] = [
  {
    name: "stripe",
    isActive: true,
    apiKey: "pk_test_***********************",
    secretKey: "sk_test_***********************",
    webhookKey: "whsec_***********************",
    lastUpdated: "2025-01-15"
  },
  {
    name: "paypal",
    isActive: false,
    apiKey: "",
    secretKey: "",
    webhookKey: "",
    lastUpdated: undefined
  }
];

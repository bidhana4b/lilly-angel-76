
export type NotificationStatus = 'draft' | 'scheduled' | 'sent' | 'failed';
export type NotificationTarget = 'all' | 'students' | 'teachers' | 'student' | 'teacher' | 'course';

export interface Notification {
  id: string;
  title: string;
  message: string;
  target: NotificationTarget;
  targetId?: string; // For specific student, teacher, or course
  targetName?: string; // Display name of target
  createdAt: string;
  scheduledFor?: string;
  sentAt?: string;
  status: NotificationStatus;
  sender: string;
  senderId: string;
}

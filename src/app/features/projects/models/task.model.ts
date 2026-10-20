export type Priority = 'Haute' | 'Moyenne' | 'Basse';
export type Status = 'En attente' | 'En cours' | 'Terminé';
export interface Task {
  id: number;
  title: string;
  priority: Priority;
  status: Status;
  assigneeId?: number;
  dueDate?: string;      // 'YYYY-MM-DD'
  description?: string;
}
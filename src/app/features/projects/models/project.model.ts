import { Status, Task } from './task.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: Status;
  startDate: string;     // 'YYYY-MM-DD'
  budget: number;        // TND
  tasks: Task[];
}
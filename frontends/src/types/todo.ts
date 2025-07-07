export interface Todo {
  id: number;
  title: string;
  description: string | null;
  category: number | null; // Or an object, depending on how the API returns it
  priority_score:number;
  status: 0 | 1 | 2 | 3; // Reflects choices: Todo, Pending, Completed, In Progress
  deadline: string | null; // ISO date string, e.g., "2025-07-07"
}
  
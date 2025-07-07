'use client';
import { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
}

const statusLabels: Record<Todo['status'], string> = {
  '0': 'Todo',
  '1': 'Pending',
  '2': 'Completed',
  '3': 'In Progress',
};

function getPriorityColor(score: number) {
  if (score === 0) return 'bg-red-500'; // High priority (0)
  if (score === 1) return 'bg-yellow-400'; // Medium priority (1)
  return 'bg-green-500'; // Low priority (2 or greater)
}


export default function TodoItem({ todo }: Props) {
  return (
    <li
      className="flex items-center space-x-3 border px-4 py-2 rounded-md w-md shadow-sm"
      title={`Priority: ${todo.priority_score}, Status: ${statusLabels[todo.status]}`}
    >
      {/* Priority indicator dot */}
      <span
        className={`w-4 h-4 rounded-full ${getPriorityColor(todo.priority_score)}`}
        aria-label={`Priority: ${todo.priority_score}`}
      ></span>

      {/* Task info */}
      <div>
        <h3 className="text-lg font-semibold">{todo.title}</h3>
        <p className="text-md text-gray-600">{statusLabels[todo.status]}</p>
      </div>
    </li>
  );
}

'use client';
import { Todo } from '@/types/todo';

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  return (
    <li
      className={`border px-4 py-2 rounded shadow-sm ${
        todo.completed ? 'bg-green-100 text-gray-500 line-through' : ''
      }`}
    >
      {todo.title}
    </li>
  );
}

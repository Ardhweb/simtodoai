'use client';

import TodoItem from '@/components/TodoItem';
import { Todo } from '@/types/todo';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

import { X } from "lucide-react"
import TodoForm from '@/components/TodoForm';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // ← Add this line
};

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = () => {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then((res) => {
        const fetchedTodos: Todo[] = res.data;
        setTodos(fetchedTodos);
      })
      .catch((err) => {
        console.error('API call failed:', err);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const [isModalOpen, setModalOpen] = useState(false);

  function getPriorityColor(score: number) {
    if (score >= 7) return 'bg-red-500';     // high priority (7-10)
    if (score >= 4) return 'bg-yellow-400';  // medium priority (4-6)
    return 'bg-green-500';                    // low priority (0-3)
  }

  
  const handleTodoCreated = () => {
    fetchTodos();              // Refresh todo list
    setModalOpen(false);       // Close the modal
  };
  

  return (
    <div className='p-3'>
      <button
        className="btn bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        onClick={() => setModalOpen(true)}
      >
      Quick Add Todo
      </button>

    

<Dialog open={isModalOpen} onOpenChange={(open) => !open && setModalOpen(false)}>
  <DialogContent className="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle>Create a new Todo</DialogTitle>
      <DialogDescription>Fill out the form below.</DialogDescription>
    </DialogHeader>

    {/* Inject TodoForm directly here */}
    <TodoForm onSuccess={handleTodoCreated} />
       {/* <TodoForm></TodoForm> */}
    <DialogClose asChild>
      <button
        className="absolute top-3 right-3 rounded-full p-1 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </DialogClose>
  </DialogContent>
</Dialog>

      <h1 className="text-3xl font-bold mb-4">Task List</h1>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

'use client';
import Image from "next/image";
import TodoItem from '@/components/TodoItem';
import { Todo } from '@/types/todo';
import Modal from "@/components/Modal";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const todos: Todo[] = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Walk the dog', completed: true },
    { id: 3, title: 'Read a book', completed: false },
  ];
 
 // Here we Handling CORS Origin API call with axios and storig response as data state.
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then((res) => {
        console.log(res.data);
        setData(res.data.message);
      })
      .catch((err) => {
        console.error('API call failed:', err);
      });
  }, []);
  // API call code end here

  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="p-6">
      <button
        className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setModalOpen(true)}
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Hello from Modal!</h2>
        <p>This is a simple modal controlled with React state and TailwindCSS.</p>
      </Modal>
    </div>
     
    <h1 className="text-3xl font-bold mb-4">My Task</h1>
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  </div>
  );
}

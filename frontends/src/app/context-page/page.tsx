"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface ContextEntry {
  id: number;
  content: string;
  source_type: string;
  processed_insights?: any;
}

const sourceTypes = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
  { value: "notes", label: "Notes" },
  { value: "youtube", label: "YouTube" },
];

export default function ContextInputPage() {
  const [content, setContent] = useState("");
  const [sourceType, setSourceType] = useState("notes");
  const [history, setHistory] = useState<ContextEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch context history on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ContextEntry[]>("/api/daily-context/");
      setHistory(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load context history");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Please enter some content");
      return;
    }

    try {
      await axios.post("/api/daily-context/", {
        content,
        source_type: sourceType,
      });
      setContent("");
      setSourceType("notes");
      fetchHistory(); // refresh list
    } catch (err) {
      alert("Failed to submit context");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Daily Context Input</h1>

      <form onSubmit={handleSubmit} className="mb-10">
        <label htmlFor="sourceType" className="block mb-2 font-semibold">
          Source Type
        </label>
        <select
          id="sourceType"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        >
          {sourceTypes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <label htmlFor="content" className="block mb-2 font-semibold">
          Content
        </label>
        <textarea
          id="content"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
          placeholder="Enter your message, email, or notes..."
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Add Context
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Context History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : history.length === 0 ? (
        <p>No context entries yet.</p>
      ) : (
        <ul className="space-y-4">
          {history.map(({ id, source_type, content, processed_insights }) => (
            <li
              key={id}
              className="border rounded p-4 bg-gray-50 shadow-sm"
            >
              <p>
                <strong>Type:</strong> {source_type}
              </p>
              <p>{content}</p>
              {processed_insights && (
                <pre className="mt-2 text-sm bg-gray-100 p-2 rounded whitespace-pre-wrap">
                  {JSON.stringify(processed_insights, null, 2)}
                </pre>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

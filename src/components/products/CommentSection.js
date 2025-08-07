"use client"; // Since you likely want interactivity (form, fetch) on client side

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CommentSection({ productId, userId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments sorted by sentiment (positive first)
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await axios.get(`/api/comments/${productId}`);
        setComments(res.data);
      } catch (error) {
        toast.error("Failed to load comments");
      }
    }
    fetchComments();
  }, [productId]);

  // Submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      await axios.post("/api/comments", { productId, userId, text });
      setText("");
      // Refresh comments
      const res = await axios.get(`/api/comments/${productId}`);
      setComments(res.data);
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to submit comment");
    }
    setLoading(false);
  };

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          rows={3}
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <ul className="space-y-4 max-h-80 overflow-y-auto">
        {comments.map(({ _id, text, sentimentScore }) => (
          <li key={_id} className="p-4 bg-gray-100 rounded-md dark:bg-gray-700">
            <p className="text-gray-800 dark:text-gray-200">{text}</p>
            <small
              className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${
                sentimentScore > 0
                  ? "bg-green-200 text-green-800"
                  : sentimentScore < 0
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-200 text-gray-700"
              }`}>
              {sentimentScore > 0
                ? "Positive"
                : sentimentScore < 0
                ? "Negative"
                : "Neutral"}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CommentSection;

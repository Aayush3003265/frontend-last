"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addComment, getCommentsByProduct } from "@/api/comment";
import { toast } from "react-toastify";

const Stars = ({ count }) => (
  <span className="text-yellow-400">
    {"★".repeat(count)}
    {"☆".repeat(5 - count)}
  </span>
);

export default function CommentSectionClient({ productId, ratings }) {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || user?.id;

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await getCommentsByProduct(productId);
      setComments(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      await addComment({
        productId,
        userId,
        text,
      });

      setText("");
      toast.success("Comment posted!");
      fetchComments();
    } catch (error) {
      console.error("❌ Error submitting comment:", error);
      toast.error(error.response?.data?.message || "Failed to post comment");
    }
  };

  // Get rating value given by userId from ratings array
  const getUserRating = (userId) => {
    if (!ratings) return 0;
    const ratingObj = ratings.find((r) =>
      typeof r.user === "object"
        ? r.user._id === userId
        : r.user.toString() === userId
    );
    return ratingObj ? ratingObj.value : 0;
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  return (
    <div className="mt-10 border-t pt-6 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Comments ({comments.length})
      </h2>

      {!user ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please log in to post a comment.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment..."
            rows={3}
            className="w-full rounded border px-4 py-2 text-sm dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
          />
          <button
            type="submit"
            className="self-end bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!text.trim()}>
            Post Comment
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((c) => (
            <li
              key={c._id}
              className="border p-3 rounded text-sm dark:border-gray-700 dark:text-white">
              <p className="font-semibold text-gray-900 dark:text-gray-200">
                User:{" "}
                {typeof c.userId === "object"
                  ? c.userId.name || c.userId._id
                  : c.userId}
              </p>
              <p className="mt-1">{c.text}</p>
              {/* <p className="mt-1">
                <Stars
                  count={getUserRating(
                    typeof c.userId === "object" ? c.userId._id : c.userId
                  )}
                />
              </p> */}
              {c.sentimentScore !== undefined && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Sentiment Score: {c.sentimentScore}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-4 font-medium">{error}</p>
      )}
    </div>
  );
}

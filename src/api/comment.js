import api from "./api";

export async function addComment(data) {
  return await api.post("/api/comments", data);
}

export const getCommentsByProduct = async (productId) => {
  return await api.get(`/api/comments/${productId}`);
};

export async function deleteComment(commentId) {
  return await api.delete(`/api/comments/${commentId}`);
}

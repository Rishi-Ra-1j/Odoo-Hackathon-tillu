import api from "./api";

export async function postAnswer(questionId, content) {
  const { data } = await api.post(`/answers/${questionId}`, { content });
  return data;
}

export async function acceptAnswer(answerId) {
  const { data } = await api.put(`/answers/${answerId}/accept`);
  return data;
}

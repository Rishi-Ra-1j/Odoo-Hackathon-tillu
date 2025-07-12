import api from "./api";

export async function fetchQuestions() {
  const { data } = await api.get("/questions");
  return data;
}

export async function askQuestion({ title, description, tags }) {
  const { data } = await api.post("/questions", { title, description, tags });
  return data;
}

export async function voteQuestion(id, type) {
  // type: "upvote" or "downvote"
  const { data } = await api.put(`/questions/${id}/${type}`);
  return data;
}

// DEMO ONLY: Replace with real API calls
export const getAllQuestions = async () => [
  {
    _id: "1",
    title: "How to use JWT for authentication in React?",
    description: "<p>Can someone explain JWT with code sample?</p>",
    tags: ["React", "JWT"],
    answers: [],
    author: "user123"
  },
  {
    _id: "2",
    title: "How to upload images in a rich text editor?",
    description: "<p>I'm building a Q&A forum like Stack Overflow. How do I support image upload in answers?</p>",
    tags: ["React", "RichText"],
    answers: [],
    author: "admin"
  }
];

export const getQuestionById = async (id) => {
  const questions = await getAllQuestions();
  const q = questions.find(q => q._id === id);
  if (!q) throw new Error("Not found");
  return { question: q, answers: [] };
};

export const askQuestion = async (question) => Promise.resolve(question);

import { useEffect, useState } from "react";
import { fetchQuestions } from "../services/questionService";
import { Link } from "react-router-dom";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuestions()
      .then((data) => {
        console.log("Fetched questions:", data);
        setQuestions(data);
      })
      .catch((err) => {
        console.log("FETCH ERROR:", err);
        setError("Failed to fetch questions");
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Questions</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {questions.map(q => (
          <li key={q._id} className="list-group-item">
            <Link to={`/question/${q._id}`} className="fw-bold">{q.title}</Link>
            <span className="ms-2 text-muted">{q.tags.join(', ')}</span>
            <span className="float-end">{q.upvotes.length} ▲ | {q.downvotes.length} ▼</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

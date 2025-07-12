import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get("/api/questions").then(res => setQuestions(res.data));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Questions</h2>
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
};

export default QuestionList;

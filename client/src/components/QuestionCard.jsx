import { Link } from "react-router-dom";
export default function QuestionCard({ question }) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="mb-2">
          {(question.tags || []).map(tag => (
            <span key={tag} className="badge bg-primary me-1">{tag}</span>
          ))}
        </div>
        <Link to={`/question/${question._id}`} className="h5 card-title text-primary">
          {question.title}
        </Link>
        <p className="card-text text-muted" dangerouslySetInnerHTML={{__html: question.description?.slice(0, 120)}} />
        <div className="d-flex align-items-center justify-content-between mt-2 small text-secondary">
          <span>
            {(question.answers || []).length} Answers • Asked by {question.author?.username || question.author || "Anonymous"}
          </span>
        </div>
      </div>
    </div>
  );
}

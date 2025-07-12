import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuestions } from "../services/questionService";
import { postAnswer, acceptAnswer } from "../services/answerService";
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";

export default function QuestionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchQuestions(id)
      .then(setQuestion)
      .catch(() => setError("Failed to fetch question"));
  }, [id, reload]);

  const handleAnswer = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await postAnswer(id, answerText);
      setAnswerText("");
      setReload(r => !r);
    } catch (err) {
      setError("Failed to post answer");
    }
    setLoading(false);
  };

  const handleAccept = async (answerId) => {
    try {
      await acceptAnswer(answerId);
      setReload(r => !r);
    } catch (err) {
      setError("Failed to accept answer");
    }
  };

  if (error)
    return (
      <div className="container my-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  if (!question)
    return (
      <div className="container my-5">
        <div>Loading...</div>
      </div>
    );

    const handleVote = async (type) => {
  if (!user) {
    setError("You must be logged in to vote.");
    return;
  }
  try {
    if (type === "upvote") {
      await upvoteQuestion(question._id, user.token);
    } else {
      await downvoteQuestion(question._id, user.token);
    }
    setReload(r => !r); // This will re-fetch question and update UI
  } catch (err) {
    setError("Voting failed");
  }
};


  return (
    <div className="container my-5">
      <div className="card shadow mb-3">
        <div className="card-body">
          <h3 className="fw-bold">{question.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: question.description }} />
          <div className="mb-2">
            <strong>Tags:</strong> {(question.tags || []).join(", ")}
          </div>
          <div>
             <button className="btn btn-outline-success me-2" onClick={() => handleVote('upvote')}>
    ▲ {(question.upvotes || []).length}
  </button>
  <button className="btn btn-outline-danger me-2" onClick={() => handleVote('downvote')}>
    ▼ {(question.downvotes || []).length}
  </button>
            <span className="badge bg-secondary">{(question.answers || []).length} Answers</span>
          </div>
        </div>
      </div>

      <h5>Answers</h5>
      {(question.answers || []).length > 0 ? (
        (question.answers || []).map(ans => (
          <div key={ans._id} className={`card my-2 ${ans.isAccepted ? "border-success" : ""}`}>
            <div className="card-body">
              <div dangerouslySetInnerHTML={{ __html: ans.content }} />
              <div className="d-flex justify-content-between align-items-center mt-2">
                <span className="text-muted">By: {ans.author?.username || ans.author || "Anonymous"}</span>
                <span>
                  <span className="badge bg-success me-2">{(ans.upvotes || []).length} ▲</span>
                  <span className="badge bg-danger me-2">{(ans.downvotes || []).length} ▼</span>
                  {user && question.author?._id === user._id && !ans.isAccepted && (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleAccept(ans._id)}
                    >
                      Accept
                    </button>
                  )}
                  {ans.isAccepted && (
                    <span className="badge bg-success">Accepted</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info mt-2">No answers yet.</div>
      )}

      {user ? (
        <form onSubmit={handleAnswer} className="card p-3 my-3">
          <ReactQuill value={answerText} onChange={setAnswerText} />
          <button className="btn btn-primary mt-2" type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Answer"}
          </button>
          {error && <div className="text-danger">{error}</div>}
        </form>
      ) : (
        <div className="alert alert-warning mt-3">Login to answer this question.</div>
      )}
    </div>
  );
}

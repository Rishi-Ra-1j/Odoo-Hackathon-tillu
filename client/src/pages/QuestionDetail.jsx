import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ReactQuill from "react-quill";

const QuestionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get(`/api/questions/${id}`).then(res => setQuestion(res.data));
  }, [id, reload]);

  const vote = async (type) => {
    if (!user) return;
    await axios.put(`/api/questions/${id}/${type}`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
    setReload(r => !r);
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`/api/answers/${id}`, { content: answerText }, { headers: { Authorization: `Bearer ${user.token}` } });
      setAnswerText("");
      setReload(r => !r);
    } catch (err) {
      setError("Failed to post answer");
    }
  };

  const acceptAnswer = async (answerId) => {
    await axios.put(`/api/answers/${answerId}/accept`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
    setReload(r => !r);
  };

  if (!question) return <div className="container my-5">Loading...</div>;

  return (
    <div className="container my-5">
      <div className="card shadow mb-3">
        <div className="card-body">
          <h3 className="fw-bold">{question.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: question.description }} />
          <div className="mb-2">
            <strong>Tags:</strong> {question.tags.join(', ')}
          </div>
          <div>
            <button className="btn btn-outline-success me-2" onClick={() => vote('upvote')}>▲ {question.upvotes.length}</button>
            <button className="btn btn-outline-danger me-2" onClick={() => vote('downvote')}>▼ {question.downvotes.length}</button>
          </div>
        </div>
      </div>

      <h5>Answers</h5>
      {(question.answers && question.answers.length > 0) ? (
        question.answers.map(ans => (
          <div key={ans._id} className={`card my-2 ${ans.isAccepted ? "border-success" : ""}`}>
            <div className="card-body">
              <div dangerouslySetInnerHTML={{ __html: ans.content }} />
              <div>
                <span className="text-muted">By: {ans.author?.username}</span>
                <span className="float-end">
                  <span className="badge bg-success me-2">{ans.upvotes.length} ▲</span>
                  <span className="badge bg-danger me-2">{ans.downvotes.length} ▼</span>
                  {user && question.author._id === user._id && !ans.isAccepted && (
                    <button className="btn btn-sm btn-outline-success" onClick={() => acceptAnswer(ans._id)}>Accept</button>
                  )}
                  {ans.isAccepted && <span className="badge bg-success">Accepted</span>}
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
          <button className="btn btn-primary mt-2" type="submit">Post Answer</button>
          {error && <div className="text-danger">{error}</div>}
        </form>
      ) : (
        <div className="alert alert-warning mt-3">Login to answer this question.</div>
      )}
    </div>
  );
};

export default QuestionDetail;

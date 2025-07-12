import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import TagSelect from "../components/TagSelect";

const tagOptions = [
  { value: "react", label: "React" },
  { value: "jwt", label: "JWT" },
  { value: "node", label: "Node" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "api", label: "API" },
  // ...add more tags as you wish
];

const AskQuestion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  if (!user) return <div className="container my-5"><div className="alert alert-warning">You must be logged in to ask a question.</div></div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("/api/questions", {
        title,
        description,
        tags: tags.map(t => t.value),
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post question");
    }
  };

  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit} className="col-md-8 card shadow p-4 mx-auto">
        <h2 className="mb-4 text-primary fw-bold">Ask a Question</h2>
        <input type="text" name="title" required placeholder="Title" className="form-control mb-3" value={title} onChange={e => setTitle(e.target.value)} />
        <ReactQuill theme="snow" value={description} onChange={setDescription} className="mb-3" placeholder="Describe your question (rich text allowed)" />
        <TagSelect options={tagOptions} value={tags} onChange={setTags} />
        <button type="submit" className="btn btn-primary w-100 mt-4">Submit</button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default AskQuestion;

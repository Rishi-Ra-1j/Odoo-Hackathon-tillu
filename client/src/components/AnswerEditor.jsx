// src/components/AnswerEditor.jsx
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AnswerEditor({ value, onChange, placeholder }) {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      placeholder={placeholder || "Write here..."}
      style={{ background: "white", minHeight: 120 }}
    />
  );
}

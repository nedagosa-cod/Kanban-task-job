import IconDescription from "../../../icons/IconDescription";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function DescriptionTask({ task, updateDescription }) {
  const module = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formattin
    ],
  };

  return (
    <div className="panel-description">
      <span className="panel-description__title">
        <IconDescription /> Descripción
      </span>
      <ReactQuill
        theme="snow"
        value={task.description}
        modules={module}
        onChange={(e) => {
          updateDescription(e);
        }}
      />
    </div>
  );
}

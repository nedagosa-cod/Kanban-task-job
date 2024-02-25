import { useState } from "react";
import IconTrash from "../icons/iconTrash";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, deleteTask, updateTask }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } =
    useSortable({
      id: task.id,
      data: {
        type: "Task",
        task,
      },
      disabled: editMode,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };


  if (isDragging) {
      return (
        <div
          ref={setNodeRef}
          style={style}
          className="task is-dragging"
        />
      );
    }


  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task"
      >
        <textarea
          className="textarea"
          value={task.content}
          autoFocus
          placeholder="Escribe el contenido aqui"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
      onClick={toggleEditMode}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >





      <p>{task.content}</p>






      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="task__btn-del"
        >
          <IconTrash />
        </button>
      )}
    </div>
  );
}

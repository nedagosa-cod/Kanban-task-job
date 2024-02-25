import { useState } from "react";
import IconTrash from "../icons/iconTrash";
import IconMenu from "../icons/IconMenu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TaskCard({ task, deleteTask, updateTask, openPanelTask, color }) {
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
    background: color
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
          placeholder="Titulo de tarea"
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
      onClick={(e)=>{openPanelTask(e, task)}}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >





      <p onClick={toggleEditMode}>{task.content}</p>






      {mouseIsOver && (
        <div className="task__menu">
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
            className="task__btn"
          >
            <IconTrash style={{stroke: color}} />
          </button>
          <button
            onClick={() => {
              alert('Sin menu');
            }}
            className="task__btn"
          >
            <IconMenu style={{stroke: color}}/>
          </button>
        </div>
      )}
    </div>
  );
}

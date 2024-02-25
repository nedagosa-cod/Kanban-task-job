import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconTrash from "../icons/iconTrash";
import TaskCard from "./TaskCard";
import IconPlus from "../icons/IconPlus";
import { useMemo, useState } from "react";


export default function ColumnContainer({
  column,
  tasks,
  updateColumn,
  createTask,
  deleteTask,
  updateTask,
  deleteColumn
}) {

  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => {
      return tasks.map((task) => task.id);
    }, [tasks]);
  const { attributes, listeners, transform, transition, setNodeRef, isDragging } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
      disabled: editMode,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
      return (
        <div
          ref={setNodeRef}
          style={style}
          className="column-container is-dragging"
        ></div>
      );
    }

  return (
    <div ref={setNodeRef} style={style} className="column-container">
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="column-container__box-title"
        onClick={() => {
          setEditMode(true);
        }}
      >
        <div className="column-container__box-title--title">
          <div className="number">0</div>

          {!editMode && column.title}
          {editMode && (
            <input
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
              className="title"
              onChange={(e) => updateColumn(column.id, e.target.value)}
              value={column.title}
            />
          )}
        </div>
        <button className="column-container__box-title--btn-trash"           onClick={() => {
            deleteColumn(column.id);
          }}>
          <IconTrash className="trash" />
        </button>
      </div>

      {/* Column task container */}
      <div className="column-container__bx-task">
        <SortableContext items= {tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* Column footer */}
      <button
        className="column-container__btn-addtask"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <IconPlus /> Agregar Tarea
      </button>
    </div>
  );
}

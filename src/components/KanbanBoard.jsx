import { useMemo, useState } from "react";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import {
  useSensors,
  useSensor,
  PointerSensor,
  DragOverlay,
  DndContext,
} from "@dnd-kit/core";
import ColumnContainer from "./ColumnContainer";
import "./styles.scss";
import TaskCard from "./TaskCard";
import { createPortal } from "react-dom";
import IconPlus from "../icons/IconPlus";
import PanelTask from "./PanelTask";

export default function KanbanBoard() {
  const [columns, setColumns] = useState([
    {
      id: "a",
      title: "Columna A",
      color: "azul",
    },
    {
      id: "b",
      title: "Columna B",
      color: "azul",
    },
    {
      id: "c",
      title: "Columna C",
      color: "azul",
    },
  ]);
  const [tasks, setTasks] = useState([
    {
      id: "1",
      columnId: "a",
      content: "Tarea 1 de columna A",
    },
    {
      id: "2",
      columnId: "a",
      content: "Tarea 2 de columna A",
    },
    {
      id: "3",
      columnId: "b",
      content: "Tarea 2 de columna B",
    },
  ]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const [activePanel, setActivePanel] = useState(false);
  const [dataPanel, setDataPanel] = useState(false);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const onDragStart = (event) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };
  const onDragOver = (event) => {
    console.log("over");
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    console.log(isActiveATask);
    console.log(isOverAColumn);
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };
  const onDragEnd = (event) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };
  const createTask = (columnId, task) => {
    if (task) {
      let newTask = {
        id: Math.floor(Math.random() * 10001),
        columnId,
        content: task.content,
      };
      setTasks([...tasks, newTask]);
    } else {
      let newTask = {
        id: Math.floor(Math.random() * 10001),
        columnId,
        content: `Task ${tasks.length + 1}`,
      };
      setTasks([...tasks, newTask]);
    }


  };
  const updateTask = (id, content) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  };
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  const deleteColumn = (id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  };
  const updateColumn = (id, title, color) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title, color };
    });
    setColumns(newColumns);
  };
  const createNewColumn = () => {
    const columnToAdd = {
      id: Math.floor(Math.random() * 10001),
      title: `Column ${columns.length + 1}`,
      color: "gris",
    };

    setColumns([...columns, columnToAdd]);
  };
  const openPanelTask = (event, task) => {
    if (event == "DIV" || event.target.nodeName == "DIV") {
      setActivePanel(true);
      setDataPanel(task);
    }
  };
  const closePanelTask = () => {
    setActivePanel(false);
  };
  const changeColorColumn = () => {};

  return (
    <div className="kanban-container">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="kanban-container__sortable">
          <div className="kanban-container__sortable--box">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((task) => task.columnId === column.id)}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  deleteColumn={deleteColumn}
                  openPanelTask={openPanelTask}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="kanban-container__sortable--button"
          >
            <IconPlus />
            Add Column
          </button>
        </div>

        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              updateColumn={updateColumn}
              tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
            />
          )}

          {activeTask && (
            <div className="second-task">
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>
      {activePanel &&
        createPortal(
          <PanelTask task={dataPanel} closePanelTask={closePanelTask} />,
          document.body
        )}
    </div>
  );
}

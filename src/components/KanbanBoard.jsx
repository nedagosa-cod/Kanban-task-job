import { useContext, useMemo, useState } from 'react'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import {
  useSensors,
  useSensor,
  PointerSensor,
  DragOverlay,
  DndContext,
} from '@dnd-kit/core'
import ColumnContainer from './ColumnContainer'
import './styles.scss'
import TaskCard from './TaskCard'
import { createPortal } from 'react-dom'
import IconPlus from '../icons/IconPlus'
import PanelTask from './PanelTask/PanelTask'
import KanbanContext from '../context/KanbanContext'

export default function KanbanBoard() {
  const { tasks, setTasks, columns, setColumns, setColorUser, colorUser } =
    useContext(KanbanContext)

  const [activeColumn, setActiveColumn] = useState(null)
  const [activeTask, setActiveTask] = useState()

  const [activePanel, setActivePanel] = useState(false)
  const [dataPanel, setDataPanel] = useState({})

  const columnsId = useMemo(() => columns.map(col => col.id), [columns])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )
  const onDragStart = event => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column)
      return
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task)
      return
    }
  }
  const onDragOver = event => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'Task'
    const isOverATask = over.data.current?.type === 'Task'

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)
        const overIndex = tasks.findIndex(t => t.id === overId)

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId
          return arrayMove(tasks, activeIndex, overIndex - 1)
        }

        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    const isOverAColumn = over.data.current?.type === 'Column'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId)

        tasks[activeIndex].columnId = overId
        console.log('DROPPING TASK OVER COLUMN', { activeIndex })
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }
  const onDragEnd = event => {
    setActiveColumn(null)
    setActiveTask(null)
    const { active, over } = event
    if (!over) return
    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return

    const isActiveAColumn = active.data.current?.type === 'Column'
    if (!isActiveAColumn) return

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeId)
      const overColumnIndex = columns.findIndex(col => col.id === overId)
      return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }
  const deleteColumn = id => {
    const filteredColumns = columns.filter(col => col.id !== id)
    setColumns(filteredColumns)

    const newTasks = tasks.filter(t => t.columnId !== id)
    setTasks(newTasks)
  }
  const updateColumn = (id, title, color) => {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col
      return { ...col, title, color }
    })
    setColorUser(color)
    setColumns(newColumns)
  }
  const updateTask = (idCol, color) => {
    const newTasks = tasks.map(taskk => {
      if (taskk.columnId !== idCol) return taskk
      return { ...taskk, content: taskk.content, color }
    })

    console.log(newTasks)
    setTasks(newTasks)
  }
  const createNewColumn = () => {
    const columnToAdd = {
      id: Math.floor(Math.random() * 10001),
      title: `Column ${columns.length + 1}`,
      color: 'gris',
    }

    setColumns([...columns, columnToAdd])
  }
  const openPanelTask = (event, task) => {
    if (event == 'DIV' || event.target.nodeName == 'DIV') {
      setActivePanel(true)
      setDataPanel(task)
    }
  }
  const closePanelTask = leftClickAllow => {
    if (leftClickAllow === 'panel-bx-task') {
      setActivePanel(false)
    }
  }

  const columColors = {
    blanco: '#f8f9fa',
    gris: '#cfcfcf',
    rojo: '#ffcdcd',
    naranja: '#ffead2',
    amarillo: '#fff9ca',
    verde: '#ccffd7',
    azul: '#cfe6ff',
    morado: '#efd2ff',
    fuccia: '#ffd1f3',
    negro: '#afafaf',
    heavy: {
      blanco: '#f8f9fa',
      gris: '#ababab',
      rojo: '#f93f3f',
      naranja: '#ffa339',
      amarillo: '#ffea46',
      verde: '#56ff7a',
      azul: '#3f9bff',
      morado: '#be47ff',
      fuccia: '#ff4dd1',
      negro: '#373737',
    },
  }

  return (
    <div className="kanban-container">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>
        <div className="kanban-container__sortable">
          <div className="kanban-container__sortable--box">
            <SortableContext items={columnsId}>
              {console.log(tasks)}
              {columns.map(column => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  tasks={tasks.filter(task => task.columnId === column.id)}
                  updateColumn={updateColumn}
                  updateTask={updateTask}
                  deleteColumn={deleteColumn}
                  openPanelTask={openPanelTask}
                  columColors={columColors}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn()
            }}
            className="kanban-container__sortable--button">
            <IconPlus />
            Add Column
          </button>
        </div>

        <DragOverlay>
          {activeColumn && (
            <ColumnContainer
              column={activeColumn}
              tasks={tasks.filter(task => task.columnId === activeColumn.id)}
            />
          )}
          {activeTask && console.log(activeTask)}
          {activeTask && (
            <TaskCard
              task={activeTask}
              color="#e9ecef"
              styles={{
                boxShadow: '0px 5px 5px -4px rgba(0, 0, 0, 0.1)',
                padding: '0.4rem 1rem',
                minHeight: '4rem',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                textAlign: 'left',
                fontSize: '1.4rem',
                justifyContent: 'space-between',
                border: '2px solid #343a40',
                borderRadius: '0.8rem',
                opacity: '0.5',
                textWrap: 'pretty',
              }}
            />
          )}
        </DragOverlay>
      </DndContext>
      {activePanel &&
        createPortal(
          <PanelTask task={dataPanel} closePanelTask={closePanelTask} />,
          document.body
        )}
    </div>
  )
}

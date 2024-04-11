import { useContext, useEffect, useMemo, useState } from 'react'
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
//bug
export default function KanbanBoard() {
  const { tasks, setTasks, columns, setColumns, setColorUser, db_Kanban } =
    useContext(KanbanContext)
  const [alphabet, setAlphabet] = useState('bcdefghijklmnopqrstuvwxyz')
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
    const deletedLetter = id
    const filteredColumns = columns.filter(col => col.id !== id)
    setColumns(filteredColumns)
    db_Kanban.collection('columns').doc({ id: id }).delete()

    const newTasks = tasks.filter(t => t.columnId !== id)
    setTasks(newTasks)
    tasks.forEach(task => {
      if (task.columnId == id) {
        db_Kanban.collection('tasks').doc({ columnId: id }).delete()
      }
    })
    const updatedAlphabet = alphabet
      .split('')
      .concat(deletedLetter)
      .sort()
      .join('')

    setAlphabet(updatedAlphabet)
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
    const nextLetter = alphabet[0]

    // Crear la nueva columna con la letra disponible
    const columnToAdd = {
      id: nextLetter,
      title: `Column ${nextLetter}`,
      color: 'blanco',
    }

    // Agregar la nueva columna a la base de datos y actualizar el estado
    db_Kanban.collection('columns').add(columnToAdd)
    setColumns([...columns, columnToAdd])

    // Actualizar el estado de las letras disponibles
    setAlphabet(alphabet.substring(1))
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

  useEffect(() => {
    db_Kanban
      .collection('columns')
      .get()
      .then(columns => {
        setColumns(columns)
      })
    db_Kanban
      .collection('tasks')
      .get()
      .then(tasks => {
        setTasks(tasks)
      })
  }, [])

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
      <div
        onClick={() => {
          console.log(tasks)
        }}>
        TEST
      </div>
    </div>
  )
}

import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { DragOverlay } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import IconTrash from '../icons/iconTrash'
import TaskCard from './TaskCard'
import IconPlus from '../icons/IconPlus'
import IconMenu from '../icons/IconMenu'
import { useContext, useMemo, useState } from 'react'
import { Dropdown } from 'antd'
import { DeleteOutlined, WalletFilled } from '@ant-design/icons'
import KanbanContext from '../context/KanbanContext'

export default function ColumnContainer({
  column,
  tasks,
  updateColumn,
  updateTask,
  deleteColumn,
  openPanelTask,
}) {
  const { createTask } = useContext(KanbanContext)
  const [editMode, setEditMode] = useState(false)
  const tasksIds = useMemo(() => {
    return tasks.map(task => task.id)
  }, [tasks])
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  })
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
  const items = [
    {
      key: 1,
      icon: <DeleteOutlined />,
      danger: true,
      label: <button rel="noopener noreferrer">Eliminar Columna</button>,
    },
    {
      type: 'divider',
    },
    {
      key: 2,
      icon: <WalletFilled style={{ color: columColors.heavy.gris }} />,
      label: (
        <button
          className="button-color"
          style={{ color: columColors.heavy.gris }}>
          {/* {console.log(columColors.heavy.gris)} */}
          Gris
        </button>
      ),
      disabled: false,
    },
    {
      key: 3,
      icon: <WalletFilled style={{ color: columColors.heavy.rojo }} />,
      label: (
        <button
          className="button-color"
          style={{ color: columColors.heavy.rojo }}>
          Rojo
        </button>
      ),
      disabled: false,
    },
    {
      key: 4,
      icon: <WalletFilled style={{ color: columColors.heavy.naranja }} />,
      label: (
        <button
          className="button-color"
          style={{ color: columColors.heavy.naranja }}>
          Naranja
        </button>
      ),
      disabled: false,
    },
    {
      key: 5,
      icon: <WalletFilled style={{ color: columColors.heavy.amarillo }} />,
      label: (
        <button
          className="button-color"
          style={{ color: columColors.heavy.amarillo }}>
          Amarillo
        </button>
      ),
      disabled: false,
    },
    {
      key: 6,
      icon: <WalletFilled style={{ color: columColors.heavy.verde }} />,
      label: (
        <button
          className="button-color"
          style={{ color: columColors.heavy.verde }}>
          Verde
        </button>
      ),
      disabled: false,
    },
    {
      key: 7,
      icon: <WalletFilled style={{ color: columColors.heavy.azul }} />,
      label: (
        <button
          className="button-color"
          style={{ color: columColors.heavy.azul }}>
          Azul
        </button>
      ),
      disabled: false,
    },
    {
      key: 8,
      icon: <WalletFilled style={{ color: columColors.heavy.morado }} />,
      label: (
        <button
          className="button-color"
          style={{ color: columColors.heavy.morado }}>
          Morado
        </button>
      ),
      disabled: false,
    },
    {
      key: 9,
      icon: <WalletFilled style={{ color: columColors.heavy.fuccia }} />,
      label: (
        <button
          className="button-color"
          style={{ color: columColors.heavy.fuccia }}>
          Fuccia
        </button>
      ),
      disabled: false,
    },
  ]

  const clickMenuColor = ({ key }) => {
    const keysArray = Object.keys(columColors)
    if (key > 1) {
      updateColumn(column.id, column.title, keysArray[key - 1])
      tasks.forEach(tarea => {
        updateTask(tarea.id, tarea.content, keysArray[key - 1])
      })
    } else {
      deleteColumn(column.id)
    }
  }
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '4px solid ' + columColors.heavy[column.color],
  }

  if (isDragging) {
    // parte de atras cuando cuando se alza el elemento
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="column-container is-dragging"></div>
    )
  }

  return (
    <div ref={setNodeRef} style={style} className="column-container">
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className="column-container__box-title">
        <div
          style={{ background: columColors[column.color] }}
          className="column-container__box-title--title"
          onClick={() => {
            setEditMode(true)
          }}>
          <div className="number">0</div>

          {!editMode && column.title}
          {editMode && (
            <input
              autoFocus
              onBlur={() => {
                setEditMode(false)
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                setEditMode(false)
              }}
              className="title"
              onChange={e =>
                updateColumn(column.id, e.target.value, column.color)
              }
              value={column.title}
            />
          )}
        </div>

        <div className="column-container__box-title--btn-trash">
          <button
            onClick={() => {
              deleteColumn(column.id)
            }}
            className="button">
            <IconTrash style={{ stroke: columColors[column.color] }} />
          </button>

          <Dropdown
            menu={{
              items,
              onClick: clickMenuColor,
            }}
            trigger={['click']}
            overlayClassName="dropdown-content"
            placement="bottom">
            <button className="button">
              <IconMenu style={{ stroke: columColors[column.color] }} />
            </button>
          </Dropdown>
        </div>
      </div>

      {/* Column task container */}
      <div className="column-container__bx-task">
        <SortableContext items={tasksIds}>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              openPanelTask={openPanelTask}
              color={columColors[column.color]}
            />
          ))}
        </SortableContext>
      </div>

      {/* Column footer */}
      <button
        className="column-container__btn-addtask"
        onClick={() => {
          createTask(column.id)
        }}>
        <IconPlus /> Agregar Tarea
      </button>
    </div>
  )
}

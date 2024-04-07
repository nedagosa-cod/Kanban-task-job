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
    gris: '#7C7C7C',
    rojo: '#E41B1B',
    naranja: '#E4861B',
    amarillo: '#E4CC1B',
    verde: '#008a20',
    azul: '#1B7CE4',
    morado: '#9E1BE4',
    fuccia: '#E41BB0',
    negro: '#212529',
  }
  const items = [
    {
      key: '1',
      icon: <DeleteOutlined />,
      danger: true,
      label: <button rel="noopener noreferrer">Eliminar Columna</button>,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      icon: <WalletFilled style={{ color: columColors.gris }} />,
      label: (
        <button className="button-color" style={{ color: columColors.negro }}>
          Gris
        </button>
      ),
      disabled: false,
    },
    {
      key: '3',
      icon: <WalletFilled style={{ color: columColors.rojo }} />,
      label: (
        <button className="button-color" style={{ color: columColors.negro }}>
          Rojo
        </button>
      ),
      disabled: false,
    },
    {
      key: '4',
      icon: <WalletFilled style={{ color: columColors.naranja }} />,
      label: (
        <button className="button-color" style={{ color: columColors.negro }}>
          Naranja
        </button>
      ),
      disabled: false,
    },
    {
      key: '5',
      icon: <WalletFilled style={{ color: columColors.amarillo }} />,
      label: (
        <button className="button-color" style={{ color: columColors.negro }}>
          Amarillo
        </button>
      ),
      disabled: false,
    },
    {
      key: '6',
      icon: <WalletFilled style={{ color: columColors.verde }} />,
      label: (
        <button className="button-color" style={{ color: columColors.negro }}>
          Verde
        </button>
      ),
      disabled: false,
    },
    {
      key: '7',
      icon: <WalletFilled style={{ color: columColors.azul }} />,
      label: (
        <button className="button-color" style={{ color: columColors.negro }}>
          Azul
        </button>
      ),
      disabled: false,
    },
    {
      key: '8',
      icon: <WalletFilled style={{ color: columColors.morado }} />,
      label: (
        <button className="button-color" style={{ color: columColors.negro }}>
          Morado
        </button>
      ),
      disabled: false,
    },
    {
      key: '9',
      icon: <WalletFilled style={{ color: columColors.fuccia }} />,
      label: (
        <button className="button-color" style={{ color: columColors.negro }}>
          Fuccia
        </button>
      ),
      disabled: false,
    },
  ]

  const handleMenuItemClick = ({ key }) => {
    const keysArray = Object.keys(columColors)
    if (key > 1) {
      updateColumn(column.id, column.title, keysArray[key - 2])
    } else {
      deleteColumn(column.id)
    }
  }
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // background: columColors[column.color] + '21',
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
              onClick: handleMenuItemClick,
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
      {/* <DragOverlay>
        <div className="second-task">
          <TaskCard />
        </div>
      </DragOverlay> */}
    </div>
  )
}

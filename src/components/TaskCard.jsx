import { useContext, useState } from 'react'
import IconTrash from '../icons/iconTrash'
import IconMenu from '../icons/IconMenu'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Dropdown } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import KanbanContext from '../context/KanbanContext'

export default function TaskCard({ task, openPanelTask, color, styles }) {
  const { updateTask, deleteTask, createTask } = useContext(KanbanContext)
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  })
  const items = [
    {
      key: '1',
      icon: <DeleteOutlined />,
      danger: true,
      label: <button>Eliminar Tarea</button>,
    },
    {
      key: '2',
      icon: <CopyOutlined />,
      label: <button>Duplicar</button>,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      icon: <EditOutlined />,
      label: (
        <button className="button-color" style={{ color: '#fff' }}>
          Editar
        </button>
      ),
      disabled: false,
    },
    {
      key: '4',
      icon: <FullscreenOutlined />,
      label: (
        <button className="button-color" style={{ color: '#fff' }}>
          Abrir en una ventana
        </button>
      ),
      disabled: false,
    },
  ]
  const style = {
    ...styles,
    transform: CSS.Transform.toString(transform),
    transition,
    background: color,
  }
  const toggleEditMode = () => {
    setEditMode(prev => !prev)
    setMouseIsOver(false)
  }
  const handleMenuItemClick = ({ key }) => {
    switch (key) {
      case '1':
        deleteTask(task.id)
        break
      case '2':
        createTask(task.columnId, task)
        break
      case '3':
        setEditMode(true)
        break
      case '4':
        openPanelTask('DIV', task)
        break
    }
  }
  if (isDragging) {
    return <div ref={setNodeRef} style={style} className="task is-dragging" />
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task">
        <textarea
          className="textarea"
          value={task.content}
          autoFocus
          placeholder="Titulo de tarea"
          onBlur={toggleEditMode}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode()
            }
          }}
          onChange={e => updateTask(task.id, e.target.value)}
        />
        <div className="task__menu">
          <button
            onClick={() => {
              deleteTask(task.id)
            }}
            className="task__btn">
            <IconTrash style={{ stroke: color }} />
          </button>

          <Dropdown
            menu={{
              items,
              onClick: handleMenuItemClick,
            }}
            trigger={['click']}
            overlayClassName="dropdown-content"
            placement="bottom">
            <button className="task__btn">
              <IconMenu style={{ stroke: color }} />
            </button>
          </Dropdown>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
      onClick={e => {
        openPanelTask(e, task)
      }}
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}>
      <p onClick={toggleEditMode}>{task.content}</p>

      <div className="task__menu">
        <button
          onClick={() => {
            deleteTask(task.id)
          }}
          className="task__btn">
          <IconTrash style={{ stroke: color }} />
        </button>

        <Dropdown
          menu={{
            items,
            onClick: handleMenuItemClick,
          }}
          trigger={['click']}
          overlayClassName="dropdown-content"
          placement="bottom">
          <button className="task__btn">
            <IconMenu style={{ stroke: color }} />
          </button>
        </Dropdown>
      </div>
    </div>
  )
}

import { useContext, useEffect, useState } from 'react'
import IconTrash from '../../icons/iconTrash'
import IconMenu from '../../icons/IconMenu'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Dropdown } from 'antd'
import {
  ConsoleSqlOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FullscreenOutlined,
} from '@ant-design/icons'
import KanbanContext from '../../context/KanbanContext'
import { createPortal } from 'react-dom'
import PanelTask from '../PanelTask/PanelTask'

export default function TaskCard({ task, color, styles }) {
  const { updateTask, deleteTask, createTask } = useContext(KanbanContext)
  const [editMode, setEditMode] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const onClose = e => {
    if (e.target.className === 'panel-bx-task') {
      setIsOpen(false)
    }
  }
  const toggleEditMode = () => {
    setEditMode(prev => !prev)
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
        openPanelTask(true)
        break
    }
  }

  // #region DnD
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
        <button className="button-color" style={{ color: '#212529' }}>
          Editar
        </button>
      ),
      disabled: false,
    },
    {
      key: '4',
      icon: <FullscreenOutlined />,
      label: (
        <button className="button-color" style={{ color: '#212529' }}>
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
  if (isDragging) {
    // parte de atras de drag
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
  // #endregion

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task"
        onClick={() => {
          setIsOpen(true)
        }}
        onKeyDown={e => {
          if (e.key !== 'Escape') return
          setIsOpen(false)
        }}>
        <p
          onClick={() => {
            toggleEditMode()
          }}>
          {task.content}
        </p>
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
      <PanelTask task={task} open={isOpen} onClose={onClose} />
    </div>
  )
}

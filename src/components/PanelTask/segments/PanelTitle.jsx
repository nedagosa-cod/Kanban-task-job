import { useContext, useState } from 'react'
import IconTask from '../../../icons/IconTask'
import KanbanContext from '../../../context/KanbanContext'

export default function PanelTitle({ task }) {
  const { updateDb } = useContext(KanbanContext)
  const [editMode, setEditMode] = useState(false)
  const [valueTitle, setValueTitle] = useState(task.content)

  const updateTitleTask = data => {
    let newTask = { id: task.id, name: data.name, value: data.value }
    updateDb(newTask)
  }

  return (
    <div
      className="panel__title"
      onClick={() => {
        setEditMode(true)
      }}>
      <IconTask />

      <textarea
        className={editMode ? 'textarea edit' : 'textarea'}
        value={valueTitle}
        placeholder="Titulo de tarea"
        name="content"
        onBlur={e => {
          updateTitleTask(e.target)
        }}
        onKeyDown={e => {
          if (e.key !== 'Enter') return
          e.preventDefault()
          e.target.blur()
        }}
        onChange={e => {
          setValueTitle(e.target.value)
        }}
      />
    </div>
  )
}

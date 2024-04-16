import { useContext, useState } from 'react'
import IconTask from '../../../icons/IconTask'
import KanbanContext from '../../../context/KanbanContext'

export default function PanelTitle({ dataTask }) {
  const { updateTaskDDBB } = useContext(KanbanContext)
  const [editMode, setEditMode] = useState(false)
  const [valueTitle, setValueTitle] = useState(dataTask.content)

  const updateTitleTask = value => {
    let newTask = { ...dataTask, content: value }
    setEditMode(false)
    updateTaskDDBB(newTask)
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
          updateTitleTask(e.target.value)
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

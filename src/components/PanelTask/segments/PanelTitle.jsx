import { useState } from 'react'
import IconTask from '../../../icons/IconTask'

export default function PanelTitle({ updateTaskPanel, dataTask }) {
  const [editMode, setEditMode] = useState(false)

  return (
    <div
      className="panel__title"
      onClick={() => {
        setEditMode(true)
      }}>
      <IconTask />

      <textarea
        className={editMode ? 'textarea edit' : 'textarea'}
        value={dataTask.content}
        placeholder="Titulo de tarea"
        name="content"
        onBlur={() => {
          setEditMode(false)
        }}
        onChange={e => {
          updateTaskPanel(e)
        }}
      />
    </div>
  )
}

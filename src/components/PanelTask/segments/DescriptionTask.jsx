import IconDescription from '../../../icons/IconDescription'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import KanbanContext from '../../../context/KanbanContext'
import { useContext, useState } from 'react'
import QuillEditor from '../../QuillEditor/QuillEditor'

export default function DescriptionTask({ task }) {
  const { updateDb } = useContext(KanbanContext)
  const [description, setDescription] = useState(task.description)
  const module = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'formula'],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      [{ direction: 'rtl' }], // text direction

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formattin
    ],
  }

  const updateDescription = () => {
    let newTask = { id: task.id, name: 'description', value: description }
    updateDb(newTask)
  }

  return (
    <div className="panel-description">
      <span className="panel-description__title">
        <IconDescription /> Descripción
      </span>
      <ReactQuill
        theme="snow"
        value={description}
        modules={module}
        onBlur={e => {
          updateDescription()
        }}
        onKeyDown={e => {
          if (e.key !== 'Enter') return
          e.preventDefault()
          e.target.blur()
        }}
        onChange={value => {
          setDescription(value)
        }}
      />
      {/* <QuillEditor
        passText={setDescription}
        value={description}
        updateDescription={updateDescription}
      /> */}
    </div>
  )
}

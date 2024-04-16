import { useState } from 'react'
import IconComment from '../../../icons/IconComment'
import ReactQuill from 'react-quill'
import IconSend from '../../../icons/IconSend'
import parse from 'html-react-parser'
import { useContext } from 'react'
import KanbanContext from '../../../context/KanbanContext'

const CommentsSide = ({ task }) => {
  const { updateDb } = useContext(KanbanContext)
  const [creatingComment, setCreatingComment] = useState(false)
  const [activeComments, setActiveComments] = useState(task.comments)
  const [quillValue, setQuillValue] = useState('')
  const module = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ color: [] }], // dropdown with defaults from theme
    ],
  }

  const createComment = () => {
    if (!creatingComment) {
      setCreatingComment(true)
    } else {
      let getComments = [
        ...activeComments,
        {
          id: activeComments.length + 1,
          date: '01/01/1999',
          content: quillValue,
        },
      ]
      console.log(getComments)
      setActiveComments(getComments)
      setCreatingComment(false)
      setQuillValue('')
      let newComments = { id: task.id, name: 'comments', value: getComments }
      updateDb(newComments)
    }
  }

  return (
    <>
      <button className="bookmarkBtn" onClick={createComment}>
        <span className="IconContainer">
          {!creatingComment && <IconComment />}
          {creatingComment && <IconSend />}
        </span>
        {!creatingComment && <p className="text">Crear Comentario</p>}
        {creatingComment && <p className="text">Enviar Comentario</p>}
      </button>
      {creatingComment && (
        <div className="box-quill">
          <ReactQuill
            theme="snow"
            value={quillValue}
            modules={module}
            onChange={value => {
              setQuillValue(value)
            }}
          />
        </div>
      )}
      <div className="comments">
        {activeComments.map((comment, i) => {
          return (
            <section className="box-comment" key={i}>
              <article className="box-comment__content">
                {parse(comment.content)}
              </article>
              <div className="box-comment__buttons">
                <div className="box-comment__buttons--box">
                  <button>Eliminar</button>
                  <button>Editar</button>
                </div>
                <div>
                  <span>{comment.date}</span>
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}

export default CommentsSide

import { useState } from 'react'
import IconComment from '../../../icons/IconComment'
import ReactQuill from 'react-quill'
import IconSend from '../../../icons/IconSend'
import parse from 'html-react-parser'

const CommentsSide = ({ task }) => {
  const [creatingComment, setCreatingComment] = useState(false)
  const [activeDescription, setActiveDescription] = useState(
    task.comments.lenght > 0 ? task.comments[0].content : []
  )
  const module = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ color: [] }], // dropdown with defaults from theme
    ],
  }

  const updateCommet = () => {
    if (creatingComment) {
    }
  }

  return (
    <>
      <button
        className="bookmarkBtn"
        onClick={() => {
          setCreatingComment(true)
        }}>
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
            value={activeDescription}
            modules={module}
            onChange={e => {
              console.log(e)
              setActiveDescription(e)
            }}
          />
        </div>
      )}
      <div className="comments">
        {task.comments.map((comment, i) => {
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

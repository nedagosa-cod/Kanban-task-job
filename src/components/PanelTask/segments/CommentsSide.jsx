import { useState } from 'react'
import IconComment from '../../../icons/IconComment'
import ReactQuill from 'react-quill'
import IconSend from '../../../icons/IconSend'
import parse from 'html-react-parser'

const CommentsSide = ({ task }) => {
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
    console.log(activeComments)
    if (!creatingComment) {
      setCreatingComment(true)
    } else {
      let newComment = [
        ...activeComments,
        {
          id: activeComments.length + 1,
          date: '01/01/1999',
          content: quillValue,
        },
      ]
      setActiveComments(newComment)
      setCreatingComment(false)
      setQuillValue('')
    }
  }
  const updateComment = value => {
    setQuillValue(value)
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
              updateComment(value)
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

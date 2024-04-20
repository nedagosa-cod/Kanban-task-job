import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'

const QuillEditor = ({ value, onChange, onBlur }) => {
  const [quillValue, setQuillValue] = useState(value)
  const editorRef = useRef(null)

  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
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

          ['clean'], // remove formatting
        ],
      },
    })
    let quillDelta
    quill.setContents(quillValue)

    quill.root.addEventListener('blur', () => {
      setQuillValue(quillValue)
      onBlur(quillValue)
    })

    quill.on('text-change', e => {
      quillDelta = quill.getContents()
    })
  }, [onChange])

  // Rendering the QuillEditor component with a reference to the DOM element
  return <div ref={editorRef} />
}

export default QuillEditor

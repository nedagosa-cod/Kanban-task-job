import { useContext, useEffect } from 'react'
import './loadig.scss'
import KanbanContext from '../../context/KanbanContext'
import { useNavigate } from 'react-router-dom'
export const Loading = () => {
  const { db_Kanban, setColumns, setTasks, updateAlphabet } =
    useContext(KanbanContext)
  const navigate = useNavigate()
  const defaultColumns = [
    {
      id: 'a',
      title: 'Back Log',
      color: 'blanco',
    },
    {
      id: 'b',
      title: 'Alert',
      color: 'rojo',
    },
    {
      id: 'c',
      title: 'Doing',
      color: 'azul',
    },
    {
      id: 'd',
      title: 'Done',
      color: 'verde',
    },
  ]
  const defaultTasks = [
    {
      id: 1,
      columnId: 'a',
      content: 'Tarea 1 de columna A',
      color: 'blanco',
      properties: [
        {
          id: '1',
          type: 'text',
          title: 'Titulo Texto',
          value: 'Valor del texto',
        },
        {
          id: '2',
          type: 'date',
          title: 'Fecha',
          value: '',
        },
      ],
      description: {
        ops: [
          {
            insert: 'Hola mundo seee\n',
          },
        ],
      },
      comments: [
        {
          id: 1,
          date: '2023/06/24',
          content:
            '<p><u>Este es un </u><strong><u>comentario</u> </strong><em>que va</em> a tener <strong style="color: rgb(230, 0, 0);">ciertas </strong>ediciones</p>',
        },
        {
          id: 2,
          date: '2023/06/24',
          content:
            '<p><u>Este es un </u><strong><u>comentario</u> </strong><em>que va</em> a tener <strong style="color: rgb(230, 0, 0);">ciertas </strong>ediciones</p>',
        },
      ],
    },
    {
      id: 2,
      columnId: 'a',
      content: 'Tarea 2 de columna A',
      color: 'blanco',
      properties: [
        {
          id: '1',
          type: 'text',
          title: 'Titulo Texto',
          value: 'Valor del texto',
        },
        {
          id: '2',
          type: 'date',
          title: 'Fecha',
          value: '',
        },
      ],
      description: '',
      comments: [
        {
          id: 1,
          date: '2023/06/24',
          content:
            '<p><u>Este es un </u><strong><u>comentario</u> </strong><em>que va</em> a tener <strong style="color: rgb(230, 0, 0);">ciertas </strong>ediciones</p>',
        },
        {
          id: 2,
          date: '2023/06/24',
          content:
            '<p><u>Este es un </u><strong><u>comentario</u> </strong><em>que va</em> a tener <strong style="color: rgb(230, 0, 0);">ciertas </strong>ediciones</p>',
        },
      ],
    },
  ]
  useEffect(() => {
    db_Kanban
      .collection('columns')
      .get()
      .then(column => {
        if (column.length == 0) {
          // CREA LAS COLUMNAS POR DEFECTO SI NO EXISTEN UNAS GUARDADAS
          defaultColumns.forEach(column => {
            updateAlphabet('delete', column.id)
            db_Kanban.collection('columns').add({
              id: column.id,
              title: column.title,
              color: column.color,
            })
          })
          // CREA LAS TAREAS POR DEFECTO SI NO EXISTEN UNAS GUARDADAS
          defaultTasks.forEach(task => {
            db_Kanban.collection('tasks').add({
              id: task.id,
              columnId: task.columnId,
              content: task.content,
              color: task.color,
              properties: task.properties,
              description: task.description,
              comments: task.comments,
            })
          })
        }
      })
      .then(() => {
        // SE ASIGNAN LOS RESULTADOS DE LOCAL BASE A VARIABLES COLUMNS Y TASKS
        db_Kanban
          .collection('columns')
          .get()
          .then(columns => {
            setColumns(columns)
          })
        db_Kanban
          .collection('tasks')
          .get()
          .then(tasks => {
            setTasks(tasks)
          })
      })
      .then(() => {
        setTimeout(() => {
          navigate('/kanban')
        }, 3000)
      })
  }, [])
  return <div className="loading-container">Loading...</div>
}

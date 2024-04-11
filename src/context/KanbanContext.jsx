import { createContext, useState } from 'react'
import Localbase from 'localbase'

const KanbanContext = createContext()

const KanbanProvider = ({ children }) => {
  let db_Kanban = new Localbase('Kanban')
  const [colorUser, setColorUser] = useState('#e9ecef')
  const [columns, setColumns] = useState([
    // {
    //   id: 'a',
    //   title: 'Back Log',
    //   color: 'blanco',
    // },
    // {
    //   id: 'b',
    //   title: 'Paused',
    //   color: 'blanco',
    // },
    // {
    //   id: 'c',
    //   title: 'Doing',
    //   color: 'blanco',
    // },
    // {
    //   id: 'd',
    //   title: 'Done',
    //   color: 'blanco',
    // },
  ])
  const [tasks, setTasks] = useState([
    // {
    //   id: '1',
    //   columnId: 'a',
    //   content: 'Tarea 1 de columna A',
    //   color: 'blanco',
    //   properties: [
    //     {
    //       id: '1',
    //       type: 'text',
    //       title: 'Coordinadores',
    //       value: 'Dato de coordinador',
    //     },
    //     {
    //       id: '2',
    //       type: 'text',
    //       title: 'Formador',
    //       value: '',
    //     },
    //     {
    //       id: '3',
    //       type: 'list',
    //       title: 'Paises',
    //       value: '',
    //       list: ['Colombia', 'Guatemala', 'Argentina', 'Venezuela'],
    //     },
    //   ],
    //   description: '',
    //   comments: [
    //     {
    //       id: '1',
    //       date: '2023/06/24',
    //       content:
    //         '<p><u>Este es un </u><strong><u>comentario</u> </strong><em>que va</em> a tener <strong style="color: rgb(230, 0, 0);">ciertas </strong>ediciones</p>',
    //     },
    //     {
    //       id: '2',
    //       date: '2023/06/24',
    //       content:
    //         '<p><u>Este es un </u><strong><u>comentario</u> </strong><em>que va</em> a tener <strong style="color: rgb(230, 0, 0);">ciertas </strong>ediciones</p>',
    //     },
    //   ],
    // },
    // {
    //   id: '2',
    //   columnId: 'a',
    //   content: 'Tarea 2 de columna A',
    //   color: 'blanco',
    //   properties: [
    //     {
    //       id: '1',
    //       type: 'text',
    //       title: 'Coordinadores',
    //       value: 'Dato de coordinador',
    //     },
    //     {
    //       id: '2',
    //       type: 'text',
    //       title: 'Formador',
    //       value: '',
    //     },
    //     {
    //       id: '3',
    //       type: 'text',
    //       title: 'Correo',
    //       value: '',
    //     },
    //   ],
    //   description: '',
    //   comments: [],
    // },
    // {
    //   id: '4',
    //   columnId: 'c',
    //   content: 'Tarea 1 de columna C',
    //   color: 'blanco',
    //   properties: [
    //     {
    //       id: '1',
    //       type: 'text',
    //       title: 'Coordinadores',
    //       value: 'Dato de coordinador',
    //     },
    //     {
    //       id: '2',
    //       type: 'text',
    //       title: 'Formador',
    //       value: '',
    //     },
    //     {
    //       id: '3',
    //       type: 'text',
    //       title: 'Correo',
    //       value: '',
    //     },
    //   ],
    //   description: '',
    //   comments: [],
    // },
    // {
    //   id: '3',
    //   columnId: 'b',
    //   content: 'Tarea 1 de columna B',
    //   color: 'blanco',
    //   properties: [
    //     {
    //       id: '1',
    //       type: 'text',
    //       title: 'Coordinadores',
    //       value: 'Dato de coordinador',
    //     },
    //     {
    //       id: '2',
    //       type: 'text',
    //       title: 'Formador',
    //       value: '',
    //     },
    //     {
    //       id: '3',
    //       type: 'text',
    //       title: 'Correo',
    //       value: '',
    //     },
    //   ],
    //   description: '',
    //   comments: [],
    // },
  ])
  const createTask = (columnId, task) => {
    if (task) {
      // funcion para duplicado
      let newTask = {
        id: Math.floor(Math.random() * 10001),
        color: task.color,
        comments: [],
        columnId,
        content: task.content,
        properties: task.properties,
        description: task.description,
      }
      db_Kanban.collection('tasks').add(newTask)
      setTasks([...tasks, newTask])
    } else {
      let newTask = {
        id: Math.floor(Math.random() * 10001),
        color: 'blanco',
        comments: [],
        columnId,
        content: `Tarea ${tasks.length + 1}`,
        properties: [
          {
            id: 1,
            type: 'text',
            title: 'Titulo',
            value: 'Text',
          },
          {
            id: 2,
            type: 'date',
            title: 'Fecha',
            value: '',
          },
        ],
        description: '',
      }
      db_Kanban.collection('tasks').add(newTask)
      setTasks([...tasks, newTask])
    }
  }
  const deleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id)
    db_Kanban.collection('tasks').doc({ id: id }).delete()
    setTasks(newTasks)
  }
  const updateTask = (id, content) => {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task
      return { ...task, content }
    })

    setTasks(newTasks)
  }
  const updateTaskDDBB = dataBase => {
    const newTasks = tasks.map(task => {
      if (task.id !== dataBase.id) return task
      return dataBase
    })

    setTasks(newTasks)
  }

  const data = {
    tasks,
    setTasks,
    columns,
    setColumns,
    updateTaskDDBB,
    updateTask,
    deleteTask,
    createTask,
    setColorUser,
    colorUser,
    db_Kanban,
  }

  return (
    <KanbanContext.Provider value={data}>{children}</KanbanContext.Provider>
  )
}

export { KanbanProvider }
export default KanbanContext

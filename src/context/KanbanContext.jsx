import { createContext, useState } from 'react'
import Localbase from 'localbase'

const KanbanContext = createContext()
const db_Kanban = new Localbase('Kanban')

const KanbanProvider = ({ children }) => {
  const [colorUser, setColorUser] = useState('#e9ecef')
  const [alphabet, setAlphabet] = useState([
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ])
  const [columns, setColumns] = useState([
    // {
    //   id: 'a',
    //   title: 'Back Log',
    //   color: 'blanco',
    // },
  ])
  const [tasks, setTasks] = useState([
    // {
    //   id: '1',
    //   columnId: 'a',
    //   content: 'Tarea 1 de columna A',
    //   color: 'blanco',
    //   description: '',
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
      db_Kanban
        .collection('tasks')
        .doc({ id: id })
        .update({ ...task, content })
      return { ...task, content }
    })
    setTasks(newTasks)
  }
  const updateTaskDDBB = dataBase => {
    console.log(dataBase)
    const newTasks = tasks.map(task => {
      if (task.id !== dataBase.id) return task
      db_Kanban
        .collection('tasks')
        .doc({ id: dataBase.id })
        .update({ ...dataBase })
      return dataBase
    })
    setTasks(newTasks)
  }
  const updateDb = data => {
    const { id, name, value } = data
    tasks.forEach(task => {
      if (task.id !== id) return task
      db_Kanban
        .collection('tasks')
        .doc({ id: id })
        .update({ ...task, [name]: value })
    })
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, [name]: value } : task
      )
    )
  }
  const updateAlphabet = (effect, lett) => {
    if (effect == 'delete') {
      setAlphabet(prev => prev.filter(letter => letter !== lett))
    } else {
      setAlphabet(currentLetters => {
        // Encuentra el índice donde debería insertarse la nueva letra
        const index = currentLetters.findIndex(letter => letter > lett)
        // Si no se encuentra un lugar, añade al final
        if (index === -1) {
          return [...currentLetters, lett]
        }
        // De otro modo, inserta la letra en la posición correcta
        let data = [
          ...currentLetters.slice(0, index),
          lett,
          ...currentLetters.slice(index),
        ]

        return data
      })
    }
  }
  const getDbData = () => {
    db_Kanban
      .collection('columns')
      .get()
      .then(dbColumns => {
        dbColumns.forEach(element => {
          updateAlphabet('delete', element.id)
        })

        setColumns(dbColumns)
      })

    db_Kanban
      .collection('tasks')
      .get()
      .then(dbTasks => setTasks(dbTasks))
  }
  const data = {
    tasks,
    columns,
    colorUser,
    db_Kanban,
    alphabet,
    setTasks,
    setColumns,
    updateTaskDDBB,
    updateTask,
    deleteTask,
    createTask,
    setColorUser,
    setAlphabet,
    updateDb,
    updateAlphabet,
    getDbData,
  }

  return (
    <KanbanContext.Provider value={data}>{children}</KanbanContext.Provider>
  )
}

export { KanbanProvider }
export default KanbanContext

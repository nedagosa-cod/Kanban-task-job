import { createContext, useState } from 'react'

const KanbanContext = createContext()

const KanbanProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    {
      id: 'a',
      title: 'Back Log',
      color: 'gris',
    },
    {
      id: 'b',
      title: 'Paused',
      color: 'naranja',
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
  ])
  const [tasks, setTasks] = useState([
    {
      id: '1',
      columnId: 'a',
      content: 'Tarea 1 de columna A',
      properties: [
        {
          id: '1',
          type: 'text',
          title: 'Coordinadores',
          value: 'Dato de coordinador',
        },
        {
          id: '2',
          type: 'text',
          title: 'Formador',
          value: '',
        },
        {
          id: '3',
          type: 'text',
          title: 'Correo',
          value: '',
        },
      ],
      description: '',
    },
    {
      id: '2',
      columnId: 'a',
      content: 'Tarea 2 de columna A',
      properties: [
        {
          id: '1',
          type: 'text',
          title: 'Coordinadores',
          value: 'Dato de coordinador',
        },
        {
          id: '2',
          type: 'text',
          title: 'Formador',
          value: '',
        },
        {
          id: '3',
          type: 'text',
          title: 'Correo',
          value: '',
        },
      ],
      description: '',
    },
    {
      id: '3',
      columnId: 'b',
      content: 'Tarea 2 de columna B',
      properties: [
        {
          id: '1',
          type: 'text',
          title: 'Coordinadores',
          value: 'Dato de coordinador',
        },
        {
          id: '2',
          type: 'text',
          title: 'Formador',
          value: '',
        },
        {
          id: '3',
          type: 'text',
          title: 'Correo',
          value: '',
        },
      ],
      description: '',
    },
  ])
  const data = {
    tasks,
    setTasks,
    columns,
    setColumns,
  }

  return (
    <KanbanContext.Provider value={data}>{children}</KanbanContext.Provider>
  )
}

export { KanbanProvider }
export default KanbanContext

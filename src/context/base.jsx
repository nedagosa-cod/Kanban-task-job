const [columns, setColumns] = useState([
  {
    id: 'a',
    title: 'Back Log',
    color: 'blanco',
  },
  {
    id: 'b',
    title: 'Paused',
    color: 'blanco',
  },
  {
    id: 'c',
    title: 'Doing',
    color: 'blanco',
  },
  {
    id: 'd',
    title: 'Done',
    color: 'blanco',
  },
])
const [tasks, setTasks] = useState([
  {
    id: '1',
    columnId: 'a',
    content: 'Tarea 1 de columna A',
    color: 'blanco',
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
        type: 'list',
        title: 'Paises',
        value: '',
        list: ['Colombia', 'Guatemala', 'Argentina', 'Venezuela'],
      },
    ],
    description: '',
    comments: [
      {
        id: '1',
        date: '2023/06/24',
        content:
          '<p><u>Este es un </u><strong><u>comentario</u> </strong><em>que va</em> a tener <strong style="color: rgb(230, 0, 0);">ciertas </strong>ediciones</p>',
      },
      {
        id: '2',
        date: '2023/06/24',
        content:
          '<p><u>Este es un </u><strong><u>comentario</u> </strong><em>que va</em> a tener <strong style="color: rgb(230, 0, 0);">ciertas </strong>ediciones</p>',
      },
    ],
  },
  {
    id: '2',
    columnId: 'a',
    content: 'Tarea 2 de columna A',
    color: 'blanco',
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
    comments: [],
  },
  {
    id: '4',
    columnId: 'c',
    content: 'Tarea 1 de columna C',
    color: 'blanco',
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
    comments: [],
  },
  {
    id: '3',
    columnId: 'b',
    content: 'Tarea 1 de columna B',
    color: 'blanco',
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
    comments: [],
  },
])

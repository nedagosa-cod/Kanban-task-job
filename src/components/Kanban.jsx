import { useContext, useEffect } from 'react'
import KanbanBoard from './KanbanBoard'
import KanbanContext from '../context/KanbanContext'

const Kanban = () => {
  const { columns, tasks, getDbData } = useContext(KanbanContext)

  useEffect(getDbData, [])
  return (
    <>
      {columns && tasks && <KanbanBoard columns={columns} tasks={tasks} />}
      {!columns && <h1>Loading...</h1>}
    </>
  )
}

export default Kanban

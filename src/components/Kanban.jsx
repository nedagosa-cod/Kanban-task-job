import { useContext, useEffect, useState } from 'react'
import KanbanBoard from './KanbanBoard'
import KanbanContext from '../context/KanbanContext'

const Kanban = () => {
  const { db_Kanban, columns, setColumns, tasks, setTasks, updateAlphabet } =
    useContext(KanbanContext)

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

  useEffect(() => {
    getDbData()
  }, [])
  return (
    <>
      {columns && tasks && <KanbanBoard columns={columns} tasks={tasks} />}
      {!columns && <h1>Loading...</h1>}
    </>
  )
}

export default Kanban

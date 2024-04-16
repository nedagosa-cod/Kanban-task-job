import { useContext, useMemo, useState } from 'react'
import PanelTitle from './segments/PanelTitle'
import PanelProperty from './segments/PanelProperty'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useSensors, useSensor, PointerSensor, DndContext } from '@dnd-kit/core'
import DescriptionTask from './segments/DescriptionTask'
import { ButtonCreateProp } from './segments/elements/ButtonCreateProp'
import KanbanContext from '../../context/KanbanContext'
import CommentsSide from './segments/CommentsSide'
import { createPortal } from 'react-dom'

export default function PanelTask({ task, open, onClose }) {
  if (!open) return null
  const { updateTaskDDBB } = useContext(KanbanContext)

  const [dataTask, setDataTask] = useState({
    id: task.id,
    color: task.color,
    columnId: task.columnId,
    content: task.content,
    properties: task.properties,
    description: task.description,
    comments: task.comments,
  })

  const updateDescription = dataDescription => {
    setDataTask(prevState => ({
      ...prevState,
      description: dataDescription,
    }))
    updateTaskDDBB(dataTask)
  }

  const updateTask = prop => {
    setDataTask(prevState => ({
      ...prevState,
      properties: prop,
    }))
    updateTaskDDBB(dataTask)
  }
  const sendProps = props => {
    setProperties(props)
    setDataTask(prevState => ({
      ...prevState,
      properties: properties,
    }))
    updateTaskDDBB(dataTask)
  }

  // #region inmutables
  const onDragEnd = event => {
    const { active, over } = event
    if (!over) return
    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return
    setProperties(props => {
      const oldIndex = props.findIndex(prop => prop.id === activeId)
      const newIndex = props.findIndex(prop => prop.id === overId)
      return arrayMove(props, oldIndex, newIndex)
    })
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )
  const propsIds = useMemo(() => {
    return task.properties.map(prop => prop.id)
  }, [task.properties])
  // #endregion

  return createPortal(
    <div className="panel-bx-task" onClick={onClose}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="panel">
          <div className="left">
            {/* {Titulo} */}
            <PanelTitle dataTask={dataTask} />

            {/* {Propiedades} */}
            <div className="left__box-props">
              <SortableContext items={propsIds}>
                {task.properties.map(property => (
                  <PanelProperty
                    key={property.id}
                    panelProperty={property}
                    task={task}
                  />
                ))}
              </SortableContext>

              <ButtonCreateProp
                dataProps={task.properties}
                sendProps={sendProps}
              />
            </div>
            <DescriptionTask
              task={dataTask}
              updateDescription={updateDescription}
            />
          </div>
          <div className="right">
            <CommentsSide task={dataTask} />
          </div>
        </div>
      </DndContext>
    </div>,
    document.getElementById('portal')
  )
}

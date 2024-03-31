import { useContext, useMemo, useState } from 'react'
import PanelTitle from './segments/PanelTitle'
import PanelProperty from './segments/PanelProperty'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useSensors, useSensor, PointerSensor, DndContext } from '@dnd-kit/core'
import DescriptionTask from './segments/DescriptionTask'
import { ButtonCreateProp } from './segments/elements/ButtonCreateProp'
import KanbanContext from '../../context/KanbanContext'
import CommentsSide from './segments/CommentsSide'

export default function PanelTask({ task, closePanelTask }) {
  const { updateTaskDDBB } = useContext(KanbanContext)

  const [properties, setProperties] = useState(task.properties)

  const [dataTask, setDataTask] = useState({
    id: task.id,
    columnId: task.columnId,
    content: task.content,
    properties: task.properties,
    description: task.description,
    comments: task.comments,
  })
  console.log(dataTask)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )
  const propsIds = useMemo(() => {
    return properties.map(prop => prop.id)
  }, [properties])

  const updateTaskPanel = event => {
    const { name, value } = event.target
    setDataTask(prevState => ({
      ...prevState,
      [name]: value,
    }))
    updateTaskDDBB(dataTask)
  }
  const updateDescription = dataDescription => {
    setDataTask(prevState => ({
      ...prevState,
      description: dataDescription,
    }))
    updateTaskDDBB(dataTask)
  }

  const updateProperty = (event, prop) => {
    setProperties(prevState => {
      return prevState.map(mapProperty => {
        if (mapProperty.id == prop.id) {
          if (event) {
            switch (event.target.name) {
              case 'title':
                return {
                  ...mapProperty,
                  title: event.target.value,
                }
              default:
                return {
                  ...mapProperty,
                  value: event.target.value,
                }
            }
          } else {
            return {
              ...mapProperty,
              value: prop.value,
            }
          }
        }
        return mapProperty
      })
    })
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
  const eventClickPanel = funcion => {
    funcion
  }
  return (
    <div
      className="panel-bx-task"
      onClick={e => {
        updateTask(properties)
        closePanelTask(e.target.className)
      }}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div
          className="panel"
          onClick={() => {
            eventClickPanel()
          }}>
          <div className="left">
            {/* {Titulo} */}
            <PanelTitle dataTask={dataTask} updateTaskPanel={updateTaskPanel} />

            {/* {Propiedades} */}
            <div>
              <SortableContext items={propsIds}>
                {properties.map(property => (
                  <PanelProperty
                    key={property.id}
                    property={property}
                    properties={properties}
                    updateProperty={updateProperty}
                    sendProps={sendProps}
                    eventClickPanel={eventClickPanel}
                  />
                ))}
              </SortableContext>

              <ButtonCreateProp dataProps={properties} sendProps={sendProps} />
            </div>
            <DescriptionTask
              task={dataTask}
              updateDescription={updateDescription}
            />

            <button
              onClick={() => {
                console.log(dataTask.properties)
                console.log(properties)
                console.log(dataTask)
              }}>
              Test
            </button>
          </div>
          <div className="right">
            <CommentsSide task={dataTask} />
          </div>
        </div>
      </DndContext>
    </div>
  )
}

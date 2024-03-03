import { useMemo, useState } from 'react'
import PanelTitle from './segments/PanelTitle'
import PanelProperty from './segments/PanelProperty'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { useSensors, useSensor, PointerSensor, DndContext } from '@dnd-kit/core'
import DescriptionTask from './segments/DescriptionTask'
import { ButtonCreateProp } from './segments/elements/ButtonCreateProp'

export default function PanelTask({ task, closePanelTask, updateTaskDDBB }) {
  const [properties, setProperties] = useState(task.properties)

  const [dataTask, setDataTask] = useState({
    id: task.id,
    columnId: task.columnId,
    content: task.content,
    properties: task.properties,
    description: task.description,
  })

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

  const updatePorperties = event => {
    const { name, value, id } = event.target
    setProperties(prevProperties =>
      prevProperties.map(property => {
        if (property.id === id) {
          return {
            ...property,
            [name]: value,
          }
        }
        return property
      })
    )

    setDataTask(prevState => ({
      ...prevState,
      properties: properties,
    }))

    updateTaskDDBB(dataTask)
  }

  const sendProps = props => {
    console
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
  return (
    <div
      className="panel-bx-task"
      onClick={e => {
        closePanelTask(e.target.className)
      }}>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="panel">
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
                  type={property.type}
                  updatePorperties={updatePorperties}
                  sendProps={sendProps}
                />
              ))}
            </SortableContext>

            <ButtonCreateProp dataProps={properties} sendProps={sendProps} />
          </div>

          {/* {Comentarios} */}
          <div className="panel__comments"></div>

          {/* {Descripcion} */}
          <DescriptionTask
            task={dataTask}
            updateDescription={updateDescription}
          />

          <button
            onClick={() => {
              console.log(dataTask.description)
              console.log(properties)
              console.log(dataTask)
            }}>
            Test
          </button>
        </div>
      </DndContext>
    </div>
  )
}

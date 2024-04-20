import {
  CalendarOutlined,
  CheckSquareOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import { useContext, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SelectDinamic } from './elements/SelectDinamic'
import PropDrag from './elements/PropDrag'
import KanbanContext from '../../../context/KanbanContext'

export default function PanelProperty({ panelProperty, task }) {
  const { updateTaskDDBB, updateDb } = useContext(KanbanContext)
  const [editModeValue, setEditModeValue] = useState(false)
  const [editModeTitle, setEditModeTitle] = useState(false)
  const [property, setProperty] = useState(panelProperty)
  const [titleProp, setTitleProp] = useState(property.title)
  const [valueProp, setValuePrp] = useState(property.value)

  const updateProperty = element => {
    let newProps
    newProps = task.properties.map(prop => {
      if (prop.id != property.id) return prop
      let result = {
        ...prop,
        [element.name]: element.value,
      }
      setProperty(result)
      return result
    })
    let sendProps = {
      id: task.id,
      name: 'properties',
      value: newProps,
    }
    updateDb(sendProps)
  }

  // #region Componente de Encabezado
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: property.id,
      data: {
        type: 'prop',
        property,
      },
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  // #endregion

  switch (property.type) {
    case 'text':
      return (
        <div ref={setNodeRef} style={style} className="panel-property">
          <PropDrag property={property} />

          <button
            className="panel-property__title"
            onClick={() => {
              setEditModeTitle(true)
            }}>
            <MenuUnfoldOutlined />
            {!editModeTitle && <span>{titleProp}</span>}
            {editModeTitle && (
              <input
                autoFocus
                name="title"
                value={titleProp}
                className="panel-property__title--edit"
                onBlur={e => {
                  updateProperty(e.target)
                }}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  e.target.blur()
                }}
                onChange={e => setTitleProp(e.target.value)}
              />
            )}
          </button>

          <label
            onClick={() => {
              setEditModeValue(true)
            }}
            className="panel-property__input">
            <input
              className={editModeValue ? 'prop-input edit' : 'prop-input'}
              name="value"
              value={valueProp}
              placeholder="Valor de la propiedad"
              onBlur={e => {
                updateProperty(e.target)
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                e.target.blur()
              }}
              onChange={e => setValuePrp(e.target.value)}
            />
          </label>
        </div>
      )
    case 'date':
      return (
        <div ref={setNodeRef} style={style} className="panel-property">
          <PropDrag property={property} />
          {/* {Titulo propiedad} */}
          <button
            className="panel-property__title"
            onClick={() => {
              setEditModeTitle(true)
            }}>
            <CalendarOutlined />
            {!editModeTitle && <span>{titleProp}</span>}
            {editModeTitle && (
              <input
                autoFocus
                name="title"
                className="panel-property__title--edit"
                value={titleProp}
                onBlur={e => {
                  updateProperty(e.target)
                }}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  e.target.blur()
                }}
                onChange={e => setTitleProp(e.target.value)}
              />
            )}
          </button>
          {/* { END Titulo propiedad} */}

          <label
            onClick={() => {
              setEditModeValue(true)
            }}
            className="panel-property__input">
            <input
              className={
                editModeValue ? 'prop-input edit date' : 'prop-input date'
              }
              name="value"
              type="date"
              value={valueProp}
              placeholder="Valor de la propiedad"
              onBlur={e => {
                updateProperty(e.target)
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                e.target.blur()
              }}
              onChange={e => setValuePrp(e.target.value)}
            />
          </label>
        </div>
      )
    case 'list':
      return (
        <div ref={setNodeRef} style={style} className="panel-property">
          <PropDrag property={property} />
          {/* {left element} */}
          <button
            className="panel-property__title"
            onClick={() => {
              setEditModeTitle(true)
            }}>
            <CheckSquareOutlined />
            {!editModeTitle && <span>{titleProp}</span>}
            {editModeTitle && (
              <input
                autoFocus
                name="title"
                value={titleProp}
                id={property.id}
                className="panel-property__title--edit"
                onBlur={e => {
                  updateProperty(e.target)
                }}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  e.target.blur()
                }}
                onChange={e => setTitleProp(e.target.value)}
              />
            )}
          </button>

          <SelectDinamic
            updateProperty={updateProperty}
            property={property}
            properties={task.properties}
          />
        </div>
      )
    default:
      return (
        <div ref={setNodeRef} style={style} className="panel-property">
          <PropDrag property={property} />
          <button
            className="panel-property__title"
            onClick={() => {
              setEditModeTitle(true)
            }}>
            <MenuUnfoldOutlined />
            {!editModeTitle && <span>{titleProp}</span>}
            {editModeTitle && (
              <input
                autoFocus
                name="title"
                value={property.title}
                id={property.id}
                onBlur={() => {
                  setEditModeTitle(false)
                }}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  setEditModeTitle(false)
                }}
                className="panel-property__title--edit"
                onChange={e => updateProperty(e, property)}
              />
            )}
          </button>

          <input
            className={editModeValue ? 'prop-input edit' : 'prop-input'}
            name="value"
            value={property.value}
            id={property.id}
            placeholder="Valor de la propiedad"
            onBlur={() => {
              setEditModeValue(false)
            }}
            onChange={e => updateProperty(e, property)}
          />
        </div>
      )
  }
}

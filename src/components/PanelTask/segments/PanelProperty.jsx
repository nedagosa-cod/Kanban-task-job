import {
  CalendarOutlined,
  CheckSquareOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import IconPropMenu from '../../../icons/IconPropMenu'
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SelectDinamic } from './elements/SelectDinamic'
import PropDrag from './elements/PropDrag'

export default function PanelProperty({
  property,
  properties,
  updateProperty,
  eventClickPanel,
}) {
  const [editModeValue, setEditModeValue] = useState(false)
  const [editModeTitle, setEditModeTitle] = useState(false)
  const [mouseIsOver, setMouseIsOver] = useState(false)

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

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
        <div
          ref={setNodeRef}
          style={style}
          className="panel-property"
          onMouseEnter={() => {
            setMouseIsOver(true)
          }}
          onMouseLeave={() => {
            setMouseIsOver(false)
          }}>
          <PropDrag property={property} />

          <button
            className="panel-property__title"
            onClick={() => {
              setEditModeTitle(true)
            }}>
            <MenuUnfoldOutlined />
            {!editModeTitle && <span>{property.title}</span>}
            {editModeTitle && (
              <input
                autoFocus
                name="title"
                value={property.title}
                onBlur={() => {
                  setEditModeTitle(false)
                }}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  updateProperty(e, property)
                  setEditModeTitle(false)
                }}
                className="panel-property__title--edit"
                onChange={e => updateProperty(e, property)}
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
              value={property.value}
              placeholder="Valor de la propiedad"
              onBlur={() => {
                setEditModeValue(false)
              }}
              onChange={e => updateProperty(e, property)}
            />
          </label>
        </div>
      )
    case 'date':
      return (
        <div
          ref={setNodeRef}
          style={style}
          className="panel-property"
          onMouseEnter={() => {
            setMouseIsOver(true)
          }}
          onMouseLeave={() => {
            setMouseIsOver(false)
          }}>
          <PropDrag property={property} />
          {/* {campo diferente} */}
          <button
            className="panel-property__title"
            onClick={() => {
              setEditModeTitle(true)
            }}>
            <CalendarOutlined />
            {!editModeTitle && <span>{property.title}</span>}
            {editModeTitle && (
              <input
                autoFocus
                name="title"
                value={property.title}
                onBlur={() => {
                  setEditModeTitle(false)
                }}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  updateProperty(e, property)
                  setEditModeTitle(false)
                }}
                className="panel-property__title--edit"
                onChange={e => updateProperty(e, property)}
              />
            )}
          </button>
          {/* { END campo diferente} */}

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
              value={property.value}
              placeholder="Valor de la propiedad"
              onBlur={() => {
                setEditModeValue(false)
              }}
              onChange={e => updateProperty(e, property)}
            />
          </label>
        </div>
      )
    case 'list':
      return (
        <div
          ref={setNodeRef}
          style={style}
          className="panel-property"
          onMouseEnter={() => {
            setMouseIsOver(true)
          }}
          onMouseLeave={() => {
            setMouseIsOver(false)
          }}>
          <PropDrag property={property} />
          {/* {left element} */}
          <button
            className="panel-property__title"
            onClick={() => {
              setEditModeTitle(true)
            }}>
            <CheckSquareOutlined />
            {!editModeTitle && <span>{property.title}</span>}
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
          {/* { END left element} */}
          {/* {right element} */}
          {/* <Select options={options} /> */}
          <SelectDinamic
            updateProperty={updateProperty}
            property={property}
            properties={properties}
            eventClickPanel={eventClickPanel}
          />
          {/* {END right element} */}
        </div>
      )
    default:
      return (
        <div
          ref={setNodeRef}
          style={style}
          className="panel-property"
          onMouseEnter={() => {
            setMouseIsOver(true)
          }}
          onMouseLeave={() => {
            setMouseIsOver(false)
          }}>
          <PropDrag property={property} />

          <button
            className="panel-property__title"
            onClick={() => {
              setEditModeTitle(true)
            }}>
            <MenuUnfoldOutlined />
            {!editModeTitle && <span>{property.title}</span>}
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

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

export default function PanelProperty({
  type,
  property,
  properties,
  updatePorperties,
  sendProps,
}) {
  const [editModeValue, setEditModeValue] = useState(false)
  const [editModeTitle, setEditModeTitle] = useState(false)
  const [mouseIsOver, setMouseIsOver] = useState(false)

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

  switch (type) {
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
          <div className="panel-property__drag" {...attributes} {...listeners}>
            {mouseIsOver && <IconPropMenu style={{ stroke: '#fff' }} />}
          </div>

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
                onChange={e => updatePorperties(e)}
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
              data-type={type}
              id={property.id}
              placeholder="Valor de la propiedad"
              onBlur={() => {
                setEditModeValue(false)
              }}
              onChange={e => updatePorperties(e)}
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
          <div className="panel-property__drag" {...attributes} {...listeners}>
            {mouseIsOver && <IconPropMenu style={{ stroke: '#fff' }} />}
          </div>
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
                id={property.id}
                onBlur={() => {
                  setEditModeTitle(false)
                }}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  setEditModeTitle(false)
                }}
                className="panel-property__title--edit"
                onChange={e => updatePorperties(e)}
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
              data-type={type}
              id={property.id}
              placeholder="Valor de la propiedad"
              onBlur={() => {
                setEditModeValue(false)
              }}
              onChange={e => updatePorperties(e)}
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
          <div className="panel-property__drag" {...attributes} {...listeners}>
            {mouseIsOver && <IconPropMenu style={{ stroke: '#fff' }} />}
          </div>
          {/* {campo diferente} */}
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
                onChange={e => updatePorperties(e)}
              />
            )}
          </button>
          {/* { END campo diferente} */}

          <SelectDinamic
            sendProps={sendProps}
            property={property}
            properties={properties}
          />
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
          <div className="panel-property__drag" {...attributes} {...listeners}>
            {mouseIsOver && <IconPropMenu style={{ stroke: '#fff' }} />}
          </div>

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
                onChange={e => updatePorperties(e)}
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
            onChange={e => updatePorperties(e)}
          />
        </div>
      )
  }
}

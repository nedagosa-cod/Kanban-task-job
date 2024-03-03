import { CloseCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const SelectDinamic = ({ sendProps, property, properties }) => {
  const [options, setOption] = useState([])
  const [optionsSelected, setOptionsSelected] = useState()
  const [selectActive, setSelectActive] = useState(false)
  const [placeholder, setPlaceholder] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [nameOption, setNameOption] = useState('')

  const deleteOption = wordDelete => {
    const newArray = options.filter(element => !element.includes(wordDelete))
    setOption(newArray)
  }
  const newOptionSelected = newValueOption => {
    setOptionsSelected(newValueOption)
    let newProperty = [...properties]
    newProperty.push({
      id: property.id,
      type: property.type,
      title: property.title,
      value: optionsSelected,
    })
    sendProps(newProperty)
  }

  return (
    <div className={'SelectDinamic ' + selectActive}>
      <label
        className={'SelectDinamic__label ' + selectActive}
        onClick={() => {
          setSelectActive(true)
        }}>
        <div className="SelectDinamic__option-content">
          {!selectActive && placeholder && (
            <p className="SelectDinamic__option-content--placeholder">
              Lista deplegable
            </p>
          )}

          {optionsSelected && (
            <div className="SelectDinamic__option-content--option content-option">
              <p>{optionsSelected}</p>
              <span
                className="option-delete"
                onClick={() => {
                  newOptionSelected(optionsSelected)
                }}>
                <CloseCircleOutlined />
              </span>
            </div>
          )}
        </div>

        <div className={'SelectDinamic__hide-content ' + selectActive}>
          <div className="SelectDinamic__options-content">
            {options.map((option, i) => (
              <label
                htmlFor="createList"
                className="SelectDinamic__options-content--option content-option"
                key={i}
                onClick={() => {
                  newOptionSelected(option)
                  setPlaceholder(false)
                }}>
                <p>{option}</p>
                <span
                  className="option-delete"
                  onClick={() => {
                    deleteOption(option)
                  }}>
                  <CloseCircleOutlined />
                </span>
              </label>
            ))}
          </div>

          {!editMode && (
            <button onClick={setEditMode(true)}>Crear Opción</button>
          )}
          {editMode && (
            <input
              autoFocus
              id="createList"
              type="text"
              placeholder="Nombre de la opción"
              value={nameOption}
              onBlur={e => {
                setEditMode(false)
                setTimeout(() => {
                  setSelectActive(false)
                }, 100)
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                setOption(prevOpt => {
                  return [...prevOpt, e.target.value]
                })
                setNameOption('')
              }}
              onChange={e => {
                setNameOption(e.target.value)
              }}
            />
          )}
        </div>
      </label>
    </div>
  )
}

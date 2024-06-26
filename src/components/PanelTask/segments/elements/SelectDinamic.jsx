import { CloseCircleOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'

export const SelectDinamic = ({ updateProperty, property, properties }) => {
  const [options, setOption] = useState(property.list)
  const [optionsSelected, setOptionsSelected] = useState(property.value)
  const [nameOption, setNameOption] = useState('')
  const [selectActive, setSelectActive] = useState(false)
  const [placeholder, setPlaceholder] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const $selectDianamic = useRef(null)

  const deleteOption = (title, listDelete) => {
    if (title) {
      setOptionsSelected('')
      setPlaceholder(true)

      console.log(options)
      updateProperty({
        id: property.id,
        type: property.type,
        title: property.title,
        value: '',
        name: 'value',
      })
    } else {
      const newArray = options.filter(element => !element.includes(listDelete))
      setOption(newArray)
    }
  }
  const newOptionSelected = newValueOption => {
    setOptionsSelected(newValueOption)
    updateProperty({
      value: newValueOption,
      name: 'value',
    })
  }
  const updateOptions = e => {
    setOption(prevOpt => {
      if (prevOpt) return [...prevOpt, e.target.value]
      return [e.target.value]
    })

    updateProperty({
      id: property.id,
      type: property.type,
      title: property.title,
      value: options ? [...options, nameOption] : [nameOption],
      name: property.type,
    })
    setNameOption('')
  }
  useEffect(() => {
    console.log(property.list)
    //cierra el select dinamico
    document.addEventListener('click', e => {
      !$selectDianamic.current?.contains(e.target) && setSelectActive(false)
    })
  }, [])
  return (
    <div className={'SelectDinamic ' + selectActive} ref={$selectDianamic}>
      <label
        className={'SelectDinamic__label ' + selectActive}
        onClick={() => {
          setSelectActive(true)
        }}>
        <div className="SelectDinamic__option-content ">
          {!selectActive && placeholder && !optionsSelected && (
            <p className="SelectDinamic__option-content--placeholder ">
              Lista deplegable
            </p>
          )}

          {optionsSelected && (
            <div className="SelectDinamic__option-content--option content-option">
              <p>{optionsSelected}</p>
              <span
                className="option-delete"
                onClick={() => {
                  deleteOption(true, optionsSelected)
                }}>
                <CloseCircleOutlined />
              </span>
            </div>
          )}
        </div>

        <div className={'SelectDinamic__hide-content ' + selectActive}>
          <div className="SelectDinamic__options-content">
            {console.log(options)}
            {options &&
              options.map((option, i) => (
                <label
                  htmlFor="createList"
                  className="SelectDinamic__options-content--option content-option"
                  key={i}
                  onClick={() => {
                    newOptionSelected(option)
                    setSelectActive(false)
                  }}>
                  <p>{option}</p>
                  <span
                    className="option-delete"
                    onClick={() => {
                      deleteOption(false, option)
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
              onBlur={() => {
                // setEditMode(false)
                // setTimeout(() => {
                //   setSelectActive(false)
                // }, 100)
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                updateOptions(e)
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

import {
  CalendarOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Dropdown, List } from 'antd'
import React, { useEffect, useState } from 'react'
import IconPlus from '../../../../icons/IconPlus'

export const ButtonCreateProp = ({ dataProps, sendProps }) => {
  const [properties, setProperties] = useState(dataProps)
  const items = [
    {
      key: '1',
      icon: <MenuUnfoldOutlined style={{ color: '#212529' }} />,
      danger: false,
      label: (
        <button rel="noopener noreferrer" style={{ color: '#212529' }}>
          Texto
        </button>
      ),
    },
    //     {
    //       type: "divider",
    //     },
    {
      key: '2',
      icon: <CalendarOutlined style={{ color: '#212529' }} />,
      label: (
        <button className="button-color" style={{ color: '#212529' }}>
          Fecha
        </button>
      ),
      disabled: false,
    },
    {
      key: '3',
      icon: <OrderedListOutlined style={{ color: '#212529' }} />,
      label: (
        <button className="button-color" style={{ color: '#212529' }}>
          Lista desplegable
        </button>
      ),
      disabled: false,
    },
    // {
    //   key: '4',
    //   icon: <UnorderedListOutlined style={{ color: '#212529' }} />,
    //   label: (
    //     <button className="button-color" style={{ color: '#212529' }}>
    //       Lista Multiseleccion
    //     </button>
    //   ),
    //   disabled: false,
    // },
  ]

  const createProperty = option => {
    const newPropertys = [...properties]

    const create = type => {
      newPropertys.push({
        id: properties.length + 1,
        type: type,
        title: 'Titulo',
        value: '',
        List: [],
      })
    }

    switch (option) {
      case '1':
        create('text')
        break
      case '2':
        create('date')
        break
      case '3':
        create('list')
        break
      case '4':
        create('multilist')
        break
    }

    setProperties(newPropertys)
    sendProps(newPropertys)
  }

  useEffect(() => {
    setProperties(dataProps)
  }, [dataProps])

  return (
    <Dropdown
      menu={{
        items,
        onClick: e => {
          createProperty(e.key)
        },
      }}
      trigger={['click']}
      overlayClassName="dropdown-content"
      placement="bottom">
      <button className="panel__create-prop">
        <IconPlus /> Agregar Propiedad
      </button>
    </Dropdown>
  )
}

import IconPropMenu from '../../../../icons/IconPropMenu'
import { useSortable } from '@dnd-kit/sortable'
import { Dropdown } from 'antd'
import { MenuUnfoldOutlined, DeleteOutlined } from '@ant-design/icons'

const PropDrag = ({ property }) => {
  const { attributes, listeners } = useSortable({
    id: property.id,
    data: {
      type: 'prop',
      property,
    },
  })
  const items = [
    {
      key: 1,
      icon: <DeleteOutlined style={{ color: '#212529' }} />,
      danger: true,
      label: (
        <button rel="noopener noreferrer" style={{ color: '#212529' }}>
          Eliminar
        </button>
      ),
    },
  ]
  return (
    <Dropdown
      menu={{
        items,
        onClick: e => {
          console.log(e.key)
        },
      }}>
      <div className="panel-property__drag" {...attributes} {...listeners}>
        <IconPropMenu style={{ stroke: '#fff' }} />
      </div>
    </Dropdown>
  )
}

export default PropDrag

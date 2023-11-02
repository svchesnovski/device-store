import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => {
    const { device } = useContext(Context)

    const handleSelectType = (type) => {
        if (type === 'Все') {
            device.setSelectedType(null)
        } else {
            device.setSelectedType(type)
        }
    }

    return (
        <ul className="list-group">
            <ListGroup.Item
                style={{ cursor: 'pointer' }}
                active={device.selectedType === null ? 'false' : undefined}
                onClick={() => handleSelectType('Все')}
            >
                Все категории
            </ListGroup.Item>
            {device.types.map((type) => (
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={
                        type.id ===
                        (device.selectedType ? device.selectedType.id : null)
                    }
                    onClick={() => handleSelectType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
        </ul>
    )
})

export default TypeBar

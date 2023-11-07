import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../index'
import DeviceItem from '../components/DeviceItem'
import { Row } from 'react-bootstrap'

const DeviceList = observer(() => {
    const { device } = useContext(Context)
    return (
        <Row className="d-flex mb-3">
            {device.devices.map((device) => (
                <DeviceItem key={device.id} device={device} />
            ))}
        </Row>
    )
})

export default DeviceList

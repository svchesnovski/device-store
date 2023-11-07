import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import Pages from '../components/Pages'

const Shop = observer(() => {
    const { device } = useContext(Context)
    const [limit, setLimit] = useState(5)

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data))
        fetchBrands().then((data) => device.setBrands(data))
        fetchDevices(null, null, 1, limit).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [limit])

    useEffect(() => {
        if (device.selectedType === null && device.selectedBrand === null) {
            fetchDevices(null, null, device.page, limit).then((data) => {
                device.setDevices(data.rows)
                device.setTotalCount(data.count)
            })
        } else if (device.selectedType || device.selectedBrand) {
            const selectedType = device.selectedType
                ? device.selectedType.id
                : null
            const selectedBrand = device.selectedBrand
                ? device.selectedBrand.id
                : null

            fetchDevices(selectedType, selectedBrand, device.page, limit).then(
                (data) => {
                    device.setDevices(data.rows)
                    device.setTotalCount(data.count)
                }
            )
        }
    }, [device.page, device.selectedType, device.selectedBrand, limit])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                    <BrandBar />
                </Col>
                <Col md={9}>
                    <DeviceList />
                    <Pages setLimit={setLimit} />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop

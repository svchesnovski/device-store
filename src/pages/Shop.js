import React, { useContext, useEffect } from 'react'
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

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data))
        fetchBrands().then((data) => device.setBrands(data))
        fetchDevices(null, null, 1, 4).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        // Проверка на "Все категории" и "Все бренды"
        if (device.selectedType === null && device.selectedBrand === null) {
            fetchDevices(null, null, device.page, 4).then((data) => {
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

            fetchDevices(selectedType, selectedBrand, device.page, 4).then(
                (data) => {
                    device.setDevices(data.rows)
                    device.setTotalCount(data.count)
                }
            )
        }
    }, [device.page, device.selectedType, device.selectedBrand])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    )
})

export default Shop

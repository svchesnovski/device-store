import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Dropdown, Form, Row, Col } from 'react-bootstrap'
import { Context } from '../../index'
import {
    createDevice,
    //fetchDevices,
    fetchBrands,
    fetchTypes,
} from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite'

const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [errors, setErrors] = useState({}) // Добавляем состояние для ошибок

    useEffect(() => {
        fetchTypes().then((data) => device.setTypes(data))
        fetchBrands().then((data) => device.setBrands(data))
        //fetchDevices().then((data) => device.setDevices(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }

    const removeInfo = (number) => {
        setInfo(info.filter((i) => i.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(
            info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
        )
    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    const validateForm = () => {
        const errors = {}

        if (!name) {
            errors.name = 'Поле "Название устройства" обязательно'
        }

        if (!price || price <= 0) {
            errors.price = 'Поле "Стоимость устройства" должно быть больше нуля'
        }

        if (!device.selectedBrand) {
            errors.brandId = 'Выберите бренд'
        }

        if (!device.selectedType) {
            errors.typeId = 'Выберите тип устройства'
        }

        setErrors(errors)

        // Возвращаем true, если нет ошибок, иначе false
        return Object.keys(errors).length === 0
    }

    const addDevice = () => {
        if (!validateForm()) {
            return // Если есть ошибки валидации, не отправляем данные
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))

        createDevice(formData)
            .then(() => onHide())
            .catch((error) => {
                console.error('Ошибка при добавлении устройства:', error)
            })
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {device.selectedType.name || 'Выберите тип'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map((type) => (
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {device.selectedBrand.name || 'Выберите тип'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map((brand) => (
                                <Dropdown.Item
                                    onClick={() =>
                                        device.setSelectedBrand(brand)
                                    }
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button variant={'outline-dark'} onClick={addInfo}>
                        Добавить новое свойство
                    </Button>
                    {info.map((i) => (
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) =>
                                        changeInfo(
                                            'title',
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) =>
                                        changeInfo(
                                            'description',
                                            e.target.value,
                                            i.number
                                        )
                                    }
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={'outline-danger'}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    ))}
                    {errors.name && (
                        <p className="text-danger">{errors.name}</p>
                    )}
                    {errors.price && (
                        <p className="text-danger">{errors.price}</p>
                    )}
                    {errors.brandId && (
                        <p className="text-danger">{errors.brandId}</p>
                    )}
                    {errors.typeId && (
                        <p className="text-danger">{errors.typeId}</p>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addDevice}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateDevice

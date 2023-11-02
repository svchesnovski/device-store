import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'
import { createType } from '../../http/deviceAPI'

const CreateType = ({ show, onHide }) => {
    const [value, setValue] = useState('')
    const addType = () => {
        createType({ name: value }).then((data) => setValue(''))
        onHide()
    }
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={'Введите название типа'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addType}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

CreateType.propTypes = {
    show: PropTypes.bool.isRequired, // Ожидаем, что show будет булевым значением
    onHide: PropTypes.func.isRequired, // Ожидаем, что onHide будет функцией
}

export default CreateType

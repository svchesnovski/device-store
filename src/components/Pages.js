import { observer } from 'mobx-react-lite'
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../index'
import { Pagination, Dropdown } from 'react-bootstrap'
import { fetchDevices } from '../http/deviceAPI'

const Pages = observer(({ setLimit }) => {
    const { device } = useContext(Context)
    const [pages, setPages] = useState([])

    const handlePageChange = (page) => {
        device.setPage(page)
        fetchDevices(
            device.selectedType?.id || null,
            device.selectedBrand?.id || null,
            page,
            device.limit
        ).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }

    useEffect(() => {
        const pageCount = Math.ceil(device.totalCount / device.limit)
        const pagesArray = []

        for (let i = 0; i < pageCount; i++) {
            pagesArray.push(i + 1)
        }

        setPages(pagesArray)
    }, [device.totalCount, device.limit])

    return (
        <div className="d-flex justify-content-between mb-2">
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="limit-dropdown">
                    Показывать по: {device.limit}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {[5, 10, 20, 30, 40, 50].map((item) => (
                        <Dropdown.Item
                            key={item}
                            onClick={() => {
                                setLimit(item)
                                device.setLimit(item) // Устанавливаем лимит в глобальном хранилище
                            }}
                        >
                            {item}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Pagination>
                {pages.map((page) => (
                    <Pagination.Item
                        key={page}
                        active={device.page === page}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
})

export default Pages

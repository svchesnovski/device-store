import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Card } from 'react-bootstrap'

const BrandBar = observer(() => {
    const { device } = useContext(Context)

    const handleSelectBrand = (brand) => {
        if (brand === 'Все') {
            device.setSelectedBrand(null)
        } else {
            device.setSelectedBrand(brand)
        }
    }

    return (
        <div className="d-flex flex-wrap">
            <Card
                style={{ cursor: 'pointer' }}
                className="p-3"
                active={device.selectedBrand === null ? 'false' : undefined}
                onClick={() => handleSelectBrand('Все')}
                border={device.selectedBrand === null ? 'danger' : 'light'}
            >
                Все бренды
            </Card>
            {device.brands.map((brand) => (
                <Card
                    style={{ cursor: 'pointer' }}
                    key={brand.id}
                    className="p-3"
                    onClick={() => handleSelectBrand(brand)}
                    border={
                        brand.id ===
                        (device.selectedBrand ? device.selectedBrand.id : null)
                            ? 'danger'
                            : 'light'
                    }
                >
                    {brand.name}
                </Card>
            ))}
        </div>
    )
})

export default BrandBar

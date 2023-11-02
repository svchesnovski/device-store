import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../pages/Admin'
import Basket from '../pages/Basket'
import Shop from '../pages/Shop'
import Auth from '../pages/Auth'
import DevicePage from '../pages/DevicePage'
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    SHOP_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    DEVICE_ROUTE,
} from '../utils/consts'

const AppRouter = () => {
    return (
        <Routes>
            <Route path={ADMIN_ROUTE} element={<Admin />} />
            <Route path={BASKET_ROUTE} element={<Basket />} />
            <Route path={SHOP_ROUTE} element={<Shop />} />
            <Route path={LOGIN_ROUTE} element={<Auth />} />
            <Route path={REGISTRATION_ROUTE} element={<Auth />} />
            <Route path={DEVICE_ROUTE + '/:id'} element={<DevicePage />} />
        </Routes>
    )
}

export default AppRouter

import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { useNavigate } from 'react-router-dom'

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            console.log('Data:', data)
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{
                height: window.innerHeight - 5,
            }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <div className="d-flex justify-content-between mt-3">
                        <div className="d-flex align-items-center">
                            <div style={{ marginRight: '5px' }}>
                                {isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}
                            </div>
                            <div className="mr-2">
                                {isLogin ? (
                                    <NavLink to={REGISTRATION_ROUTE}>
                                        Зарегистрируйся!
                                    </NavLink>
                                ) : (
                                    <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                                )}
                            </div>
                        </div>
                        <Button variant={'outline-success'} onClick={click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth

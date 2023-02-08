import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useSigninMutation } from '../../app/services/api'

const SigninPage: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [signin] = useSigninMutation()

    const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        signin({ email, password })
        setEmail('')
        setPassword('')
    }

    return <>
        <Container className="py-5">
            <h1>Вход</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Адрес электронной почты</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Введите свой адрес электронной почты"
                                  onChange={handleEmailChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Введите свой пароль"
                                  onChange={handlePasswordChange}/>
                </Form.Group>
                <Button type="submit" variant="primary">Войти</Button>
            </Form>
        </Container>
    </>
}

export default SigninPage

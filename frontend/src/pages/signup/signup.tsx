import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useSigninMutation, useSignupMutation } from '../../app/services/api'

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [signup] = useSignupMutation()
    const [signin] = useSigninMutation()

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signup({ email, password }).then(() => signin({ email, password }))
        setEmail('')
        setPassword('')
    }

    return <>
        <Container className="py-5">
            <h1>Регистрация</h1>
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

export default SignupPage

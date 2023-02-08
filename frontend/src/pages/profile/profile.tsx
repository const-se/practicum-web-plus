import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useAppSelector } from '../../app/hooks'
import { useUpdateMutation } from '../../app/services/api'

const ProfilePage: React.FC = () => {
    const user = useAppSelector((state) => state.auth.user)
    const [password, setPassword] = useState<string>('')
    const [update] = useUpdateMutation()

    const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        update({ password })
        setPassword('')
    }

    return <>
        <Container className="py-5">
            <h1>Профиль</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Адрес электронной почты</Form.Label>
                    <Form.Control type="email" value={user?.email} readOnly/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Новый пароль</Form.Label>
                    <Form.Control type="password" value={password} placeholder="Введите новый пароль"
                                  onChange={handlePasswordChange}/>
                </Form.Group>
                <Button type="submit" variant="primary">Обновить</Button>
            </Form>
        </Container>
    </>
}

export default ProfilePage

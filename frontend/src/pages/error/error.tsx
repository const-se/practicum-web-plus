import React from 'react'
import { Container } from 'react-bootstrap'
import { isRouteErrorResponse, NavLink, useRouteError } from 'react-router-dom'

const ErrorPage: React.FC = () => {
    const error = useRouteError()

    const errorText = (error: unknown) => {
        if (isRouteErrorResponse(error)) {
            return `${error.status} ${error.statusText}`
        }

        if (error instanceof Error) {
            return error.message
        }

        return 'Unknown error'
    }

    return <>
        <Container className="py-5">
            <h1>Упс!</h1>
            <p>Произошла досадная ошибка</p>
            <p>
                <i>{errorText(error)}</i>
            </p>
            <p>
                <NavLink to="/">На главную</NavLink>
            </p>
        </Container>
    </>
}

export default ErrorPage

import React, { MouseEventHandler } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { signout } from '../../app/features/auth'
import { useAppDispatch, useAppSelector } from '../../app/hooks'

const Header: React.FC = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user)

    const handleSignout: MouseEventHandler<HTMLLinkElement> = (event) => {
        event.preventDefault()
        dispatch(signout())
    }

    return <Navbar bg="dark" variant="dark">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand>Demo</Navbar.Brand>
            </LinkContainer>
            <Nav className="mb-auto">
                {user && <>
                    <Nav.Item>
                        <LinkContainer to="/profile">
                            <Nav.Link>{user.email}</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                            <Nav.Link onClick={handleSignout}>Выйти</Nav.Link>
                    </Nav.Item>
                </>}
                {!user && <>
                    <Nav.Item>
                        <LinkContainer to="/signin">
                            <Nav.Link>Войти</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to="/signup">
                            <Nav.Link>Зарегистрироваться</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </>}
            </Nav>
        </Container>
    </Navbar>
}

export default Header

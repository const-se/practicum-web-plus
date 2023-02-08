import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import Preloader from '../preloader/preloader'

interface Props {
    anonymous: boolean
    children: string | JSX.Element | JSX.Element[]
}

const Secured: React.FC<Props> = ({ anonymous, children }) => {
    const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked)
    const user = useAppSelector((state) => state.auth.user)

    if (!isAuthChecked) {
        return <Preloader/>
    }

    if (anonymous && user) {
        return <Navigate to="/"/>
    }

    if (!anonymous && !user) {
        return <Navigate to="/"/>
    }

    return <>{children}</>
}

export default Secured

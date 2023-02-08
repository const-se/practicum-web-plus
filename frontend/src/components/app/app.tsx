import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { useProfileQuery } from '../../app/services/api'
import Header from '../header/header'
import './app.scss'

const App: React.FC = () => {
    const isAuthChecked = useAppSelector((state) => state.auth.isAuthChecked)

    useProfileQuery(null, { skip: isAuthChecked })

    return <>
        <Header/>
        <Outlet/>
    </>
}

export default App

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './app/store'
import App from './components/app/app'
import Secured from './components/secured/secured'
import './index.css'
import ErrorPage from './pages/error/error'
import IndexPage from './pages/index'
import ProfilePage from './pages/profile/profile'
import SigninPage from './pages/signin/signin'
import SignupPage from './pages/signup/signup'
import reportWebVitals from './reportWebVitals'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <IndexPage/>,
            },
            {
                path: '/signin',
                element: <Secured anonymous={true}>
                    <SigninPage/>
                </Secured>,
            },
            {
                path: '/signup',
                element: <Secured anonymous={true}>
                    <SignupPage/>
                </Secured>,
            },
            {
                path: '/profile',
                element: <Secured anonymous={false}>
                    <ProfilePage/>
                </Secured>,
            },
        ],
    },
])
const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

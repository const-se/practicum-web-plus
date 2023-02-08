import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types/user'
import api from '../services/api'

interface State {
    isAuthChecked: boolean
    user: User | null
    token: string | null
}

const initialState: State = {
    isAuthChecked: false,
    user: null,
    token: null,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signout: () => {
            localStorage.removeItem('token')

            return { ...initialState, isAuthChecked: true }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(api.endpoints.signin.matchFulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.accessToken)

                return {
                    isAuthChecked: true,
                    user: action.payload.user,
                    token: action.payload.accessToken,
                }
            })
            .addMatcher(api.endpoints.profile.matchFulfilled, (state, action) => ({
                ...state,
                isAuthChecked: true,
                user: action.payload,
            }))
            .addMatcher(api.endpoints.profile.matchRejected, () => ({ ...initialState, isAuthChecked: true }))
    },
})

export default slice.reducer
export const { signout } = slice.actions

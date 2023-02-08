import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { User } from '../../types/user'
import { RootState } from '../store'

const { REACT_APP_API_URL: API_URL } = process.env
const BASE_QUERY = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token || localStorage.getItem('token')

        if (token != null) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    },
})

const api = createApi({
    reducerPath: 'api',
    baseQuery: BASE_QUERY,
    tagTypes: ['User'],
    endpoints: (build) => ({
        signin: build.mutation<{ accessToken: string, user: User }, { email: string, password: string }>({
            query: (body: { email: string, password: string }) => ({ url: 'signin', method: 'POST', body }),
            extraOptions: { backoff: () => retry.fail({ fake: 'error' }) },
            invalidatesTags: ['User'],
        }),
        signup: build.mutation<User, { email: string, password: string }>({
            query: (body: { email: string, password: string }) => ({ url: 'signup', method: 'POST', body }),
            invalidatesTags: ['User'],
        }),
        profile: build.query<User, null>({ query: () => 'user/', providesTags: ['User'] }),
        update: build.mutation<User, { password: string }>({
            query: (body: { password: string }) => ({ url: 'user/', method: 'PATCH', body }),
            invalidatesTags: ['User'],
        }),
    }),
})

export default api
export const { useSigninMutation, useSignupMutation, useProfileQuery, useUpdateMutation } = api

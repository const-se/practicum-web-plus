import { Action, configureStore, ConfigureStoreOptions, ThunkAction } from '@reduxjs/toolkit'
import auth from './features/auth'
import api from './services/api'

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) => configureStore({
    reducer: { [api.reducerPath]: api.reducer, auth },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    ...options,
})
export const store = createStore()
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

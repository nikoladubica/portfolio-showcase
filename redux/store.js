import { configureStore } from '@reduxjs/toolkit'
import backReducer from './features/back-slice'

export const store = configureStore({
    reducer: {
        backReducer
    }
})
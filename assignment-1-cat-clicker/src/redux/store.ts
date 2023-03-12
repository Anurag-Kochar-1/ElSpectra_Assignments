import { configureStore } from "@reduxjs/toolkit"
import catReducer from "./slices/catSlice"

const store = configureStore({
    reducer: {
        cat: catReducer
    }
})

export { store }

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
import { createSlice } from "@reduxjs/toolkit"
import { ICat } from "../../interfaces/ICatInterface"

interface IInitialState {
    allCats: ICat[]
}

const initialState: IInitialState = {
    allCats: []
}

const catSlice = createSlice({
    name: "cat",
    initialState,
    reducers: {
        setAllCats: (state, action) => {
            state.allCats = action.payload
        }
    }
})

export const {
    setAllCats
} = catSlice.actions

export default catSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { ICat } from "../../interfaces/ICatInterface"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"

interface IInitialState {
    allCats: ICat[] | []
    status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED"
    error: null | unknown
}

const initialState: IInitialState = {
    allCats: [],
    status: 'IDLE',
    error: null,
}

export const fetchAllCats = createAsyncThunk("cats/fetchAllCats", async () => {
    const catsCollectionRef = collection(db, "cats")
    const res = await getDocs(catsCollectionRef)
    const data = res?.docs?.map((doc) => doc?.data())
    return data
})

const catSlice = createSlice({
    name: "cat",
    initialState,
    reducers: {
        setAllCats: (state, action) => {
            state.allCats = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllCats.pending, state => {
                state.status = 'LOADING'
            })
            .addCase(fetchAllCats.fulfilled, (state, action) => {
                state.status = 'SUCCESS'
                state.allCats = action.payload as ICat[]
            })
            .addCase(fetchAllCats.rejected, (state, action) => {
                state.status = 'FAILED'
                    state.error = action?.payload || null
            })
    }
})

export const {
    setAllCats
} = catSlice.actions

export default catSlice.reducer
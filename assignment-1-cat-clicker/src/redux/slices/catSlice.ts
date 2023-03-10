import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { ICat } from "../../interfaces/ICatInterface"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../../config/firebaseConfig"

interface IInitialState {
    allCats: ICat[] | [],
    cat: ICat | any
    status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED"
    error: null | unknown
}

const initialState: IInitialState = {
    allCats: [],
    cat: {},
    status: 'IDLE',
    error: null,
}

export const fetchAllCats = createAsyncThunk("cats/fetchAllCats", async () => {
    const catsCollectionRef = collection(db, "cats")
    const res = await getDocs(catsCollectionRef)
    const data = res?.docs?.map((doc) => doc?.data())
    return data
})

export const fetchCat = createAsyncThunk("cats/fetchCat", async (id: string) => {
    const catDocRef = doc(db, 'cats', id)
    const res = await getDoc(catDocRef)
    return res?.data()

})


const catSlice = createSlice({
    name: "cat",
    initialState,
    reducers: {
        setAllCats: (state, action) => {
            state.allCats = action.payload
        },
        setCat: (state, action) => {
            state.cat = action.payload
        },

        increaseCatClicks: (state, action) => {
            // state.allCats.map((cat) => {
            //     if (cat.id === action.payload) {
            //         return {
            //             ...cat,
            //             clickTimes: cat?.clickTimes + 1
            //         }
            //     } else {
            //         return cat
            //     }
            // })

            // state.allCats = state.allCats.filter((cat) => cat?.id !== action.payload)
            state.allCats = state.allCats.map((cat) => {
                if (cat.id === action.payload) {
                    return {
                        ...cat,
                        clickTimes: cat?.clickTimes + 1
                    }
                } else {
                    return cat
                }
            })
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

            .addCase(fetchCat.pending, state => {
                state.status = 'LOADING'
            })
            .addCase(fetchCat.fulfilled, (state, action) => {
                state.status = 'SUCCESS'
                state.cat = action.payload as ICat
            })
            .addCase(fetchCat.rejected, (state, action) => {
                state.status = 'FAILED'
                state.error = action?.payload || null
            })


    }
})

export const {
    setAllCats,
    setCat,
    increaseCatClicks
} = catSlice.actions

export default catSlice.reducer
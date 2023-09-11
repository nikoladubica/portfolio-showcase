import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isBack: false
    }
}

export const back = createSlice({
    name: 'back',
    initialState: initialState,
    reducers: {
        clearBack: () => {
            return initialState
        },
        setBack: () => {
            return {
                value: {
                    isBack: true
                }
            }
        }
    }
})

export const { clearBack, setBack } = back.actions
export default back.reducer
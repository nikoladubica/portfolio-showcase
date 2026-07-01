import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        mobileNoticeDismissed: false
    }
}

export const ui = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        dismissMobileNotice: () => {
            return {
                value: {
                    mobileNoticeDismissed: true
                }
            }
        }
    }
})

export const { dismissMobileNotice } = ui.actions
export default ui.reducer

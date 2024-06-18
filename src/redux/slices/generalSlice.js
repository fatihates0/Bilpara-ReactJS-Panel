import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
}

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = generalSlice.actions

export default generalSlice.reducer
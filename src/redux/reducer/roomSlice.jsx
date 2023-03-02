import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchRooms = createAsyncThunk("fetchRooms", async () => {
    const response = await fetch("http://localhost:3000/api/v1/rooms");
    const rooms = await response.json();
    return rooms;
    });

const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        rooms: [],
        loading: false,
        error: null,
    },
    reducers: {        
    },
    extraReducers: {
        [fetchRooms.pending]: (state) => {
            state.loading = true;
        },
        [fetchRooms.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.rooms = payload;
        },
        [fetchRooms.rejected]: (state, { error }) => {
            state.loading = false;
            state.error = error.message;
        }
    }
});

export default roomsSlice.reducer;
export { fetchRooms };

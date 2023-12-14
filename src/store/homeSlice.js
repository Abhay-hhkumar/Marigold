import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'home',
  initialState:{
    url: {},
    // genres means category
    genres: {}
  },
  
  reducers: {
    getApiConfigration: (state, action)=>{

        state.url = action.payload;
    },
    getGenres: (state, action)=>{
        state.genres = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { getApiConfigration, getGenres } = homeSlice.actions

export default homeSlice.reducer
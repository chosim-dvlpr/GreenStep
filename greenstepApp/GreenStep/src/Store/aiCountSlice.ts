// features/aiCount/aiCountSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AiCountState {
  value: number;
}

const initialState: AiCountState = {
  value: 0,
};

export const aiCountSlice = createSlice({
  name: 'aiCount',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    reset: state => {
      state.value = 0;
    },
  },
});

export const {increment, reset} = aiCountSlice.actions;

export default aiCountSlice.reducer;

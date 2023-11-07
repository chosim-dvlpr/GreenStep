// features/plogging/ploggingSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface PloggingState {
  counts: {
    병: number;
    캔: number;
    페트병: number;
    플라스틱: number;
    일반쓰레기: number;
  };
}

const initialState: PloggingState = {
  counts: {
    병: 0,
    캔: 0,
    페트병: 0,
    플라스틱: 0,
    일반쓰레기: 0,
  },
};

const ploggingSlice = createSlice({
  name: 'plogging',
  initialState,
  reducers: {
    incrementCount: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      if (type in state.counts) {
        state.counts[type as keyof PloggingState['counts']] += 1;
      }
    },
  },
});

export const {incrementCount} = ploggingSlice.actions;
export default ploggingSlice.reducer;

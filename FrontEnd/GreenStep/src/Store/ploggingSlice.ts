import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface IncrementCountPayload {
  name: string;
  trashItem: TrashItem;
}
interface PloggingState {
  counts: Record<string, number>;
  trashList: TrashItem[];
}
export interface TrashItem {
  longitude: number;
  latitude: number;
  trash_picture?: string | null;
  trash_type: number;
}

const initialState: PloggingState = {
  counts: {
    병: 0,
    캔: 0,
    페트병: 0,
    플라스틱: 0,
    일반쓰레기: 0,
    쓰레기: 0,
  },
  trashList: [],
};

const ploggingSlice = createSlice({
  name: 'plogging',
  initialState,
  reducers: {
    incrementCount: (state, action: PayloadAction<IncrementCountPayload>) => {
      const {name, trashItem} = action.payload;

      if (name in state.counts) {
        state.counts[name] += 1;
        state.trashList.push(trashItem);
        state.counts['쓰레기'] = state.trashList.length;
      }
    },
    resetCounts: state => {
      state.counts = initialState.counts;
      state.trashList = initialState.trashList;
    },
  },
});

export const {incrementCount, resetCounts} = ploggingSlice.actions;
export default ploggingSlice.reducer;

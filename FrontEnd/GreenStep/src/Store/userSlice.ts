import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  accessToken: String,
  refreshToken: String
}
const initialState: UserState = {
  accessToken: "",
  refreshToken: ""
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserToken: (state, action: PayloadAction<UserState>) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    getUserToken: (state) => {
      return {
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      };
    }
  },
});

export const { updateUserToken, getUserToken } = UserSlice.actions;
export default UserSlice.reducer;

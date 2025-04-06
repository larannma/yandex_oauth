import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  accessToken: string | null;
  email: string | null;
  avatarId: string | null;
  name: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  accessToken: null,
  email: null,
  avatarId: null,
  name: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ accessToken: string; email: string; name: string; avatarId: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatarId = action.payload.avatarId;
      state.isLoggedIn = true;
    },
    
    logout: (state) => {
      state.accessToken = null;
      state.email = null;
      state.name = null;
      state.isLoggedIn = false;
      state.avatarId = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

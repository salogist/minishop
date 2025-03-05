import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../../types/api';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearUser } = authSlice.actions;
export default authSlice.reducer; 
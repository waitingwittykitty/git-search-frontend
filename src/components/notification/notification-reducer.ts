import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface NotificationState {
  title: string;
  description: string;
  opened: boolean;
  duration: number;
}

const initialState: NotificationState = {
  title: '',
  description: '',
  opened: false,
  duration: 3000,
};

export const NotificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    notify(state, action) {
      state.description = action.payload.description;
      state.title = action.payload.title;
      state.duration = action.payload.duration ?? state.duration;
      state.opened = true;
    },
    dismiss(state) {
      state.opened = false;
    },
  },
});

export const { notify, dismiss } = NotificationSlice.actions;

export const selectNotificationTitle = (state: RootState) => state.notification.title;
export const selectNotificationDescription = (state: RootState) =>
  state.notification.description;
export const selectNotificationOpened = (state: RootState) => state.notification.opened;
export const selectNotificationDuration = (state: RootState) =>
  state.notification.duration;

export default NotificationSlice.reducer;

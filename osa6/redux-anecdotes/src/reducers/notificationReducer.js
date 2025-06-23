import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'welcome testing testing',
  reducers: {
    showNotification(state, action) {
      state.push(action.payload)
    }
  }
})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer
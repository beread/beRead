import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    readDailyArticle: false,
    timeFinishedReading: null,
    timeSpentReading: 0,
    dailyStreak: 0,
    displayName: localStorage.getItem(userData.username),
    email: 'email',
    dailyReactions: []
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setAuthorizedUserFeedItem: (state, action) => {
      state.readDailyArticle = action.payload.readDailyArticle;
      state.timeFinishedReading = action.payload.timeFinishedReading;
      state.timeSpentReading = action.payload.timeSpentReading;
      state.dailyStreak = action.payload.dailyStreak;
      state.dailyReactions = action.payload.dailyReactions;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthorizedUserFeedItem } = feedSlice.actions

export default feedSlice.reducer
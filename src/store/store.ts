import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import journalReducer from "./journal/journalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

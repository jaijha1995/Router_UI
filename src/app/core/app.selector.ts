import { createSelector } from "@ngrx/store";

export const selectAppState = (state :any) => state.app;
export const selectUser = createSelector(
    selectAppState,
    (state) => state.user
  );
  
  export const selectToken = createSelector(
    selectAppState,
    (state) => state.token
  );
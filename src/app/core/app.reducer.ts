import { createReducer, on } from '@ngrx/store';
import { setToken, setUser } from './app.action';

export interface AppState {
    user: any;
    token: string | null;
}

export const initialState: AppState = {
    user: JSON.parse(localStorage.getItem('dabsah_user') || 'null'),
    token: localStorage.getItem('dabsah_token'),
};

export const appReducer = createReducer(
    initialState,
    on(setUser, (state, { user }) => {
        localStorage.setItem('dabsah_user', JSON.stringify(user));
        return { ...state, user };
    }),
    on(setToken, (state, { token }) => {
        if (token) {
            localStorage.setItem('dabsah_token', token);
        } else {
            localStorage.removeItem('dabsah_token');
        }
        return { ...state, token };
    })
)
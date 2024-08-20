import { AuthActions, SET_UNAUTHENTICATED, SET_AUTHENTICATED } from "./auth.actions";


export interface State {
    isAuthenticated: boolean
};

const initalState: State = {
    isAuthenticated: false
}

export function authReducer(state = initalState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED: 
            return {
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED: 
            return {
                isAuthenticated: false
            };
        default: {
            return state
        };
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;

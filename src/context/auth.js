import React, { createContext, useReducer } from 'react';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const AuthContext = createContext({
    user: null,
    // eslint-disable-next-line no-unused-vars
    login: userData => {},
    logout: () => {},
});

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = props => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    const login = userData => {
        dispatch({
            type: LOGIN,
            payload: userData,
        });
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
    };

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
};

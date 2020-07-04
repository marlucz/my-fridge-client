import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

// type declarations
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initState = {
    user: null,
};

// check if there is token in the localStorage and it's not expired
if (localStorage.getItem('token')) {
    const token = jwtDecode(localStorage.getItem('token'));

    if (token.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
    } else {
        initState.user = token;
    }
}

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
    const [state, dispatch] = useReducer(authReducer, initState);

    const login = userData => {
        localStorage.setItem('token', userData.token);
        dispatch({
            type: LOGIN,
            payload: userData,
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT });
    };

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
};

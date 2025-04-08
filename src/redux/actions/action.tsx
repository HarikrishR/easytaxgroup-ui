
import { SIGN_IN, SIGN_UP } from './actionTypes';

export const signUp = (value: Object) => {
        return {
            type: SIGN_UP,
            payload: value,
        };
};

export const signIn = (value: Object) => {
    return {
        type: SIGN_IN,
        payload: value,
    };
};

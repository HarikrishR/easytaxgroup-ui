
import { SIGN_IN, SIGN_UP, USER_DATA } from './actionTypes';

export const userData = (value: any) => {
    return {
        type: USER_DATA,
        payload: value,
    };
};

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

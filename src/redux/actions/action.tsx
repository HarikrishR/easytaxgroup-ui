
import { CLIENT_SECURITY_SETTINGS, GET_LOADER, SIGN_IN, SIGN_UP, STRIPE_PROMISE, USER_DATA } from './actionTypes';

export const get_loader = (value: Object) => {
    return {
        type: GET_LOADER,
        payload: value,
    };
};


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

export const getClientSecretSettings = (value: Object) => {
    return {
        type: CLIENT_SECURITY_SETTINGS,
        payload: value,
    };
};

export const getStripePromise = (value: any) => {
    return {
        type: STRIPE_PROMISE,
        payload: value,
    };
};

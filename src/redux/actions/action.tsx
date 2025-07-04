
import { ADMIN_ORDER_FORM, CLIENT_SECURITY_SETTINGS, FORM_DATA, GENERATE_PDF, GET_LOADER, SELECTED_FROM, SIGN_IN, SIGN_UP, STRIPE_PROMISE, USER_DATA, UPDATE_ORDER, ORDER_DATA_BY_ID } from './actionTypes';

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

export const getSelectedForm = (value: any) => {
    return {
        type: SELECTED_FROM,
        payload: value,
    };
};

export const getGeneratePDF = (value: any) => {
    return {
        type: GENERATE_PDF,
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

export const getFormData = (value: any) => {
    return {
        type: FORM_DATA,
        payload: value,
    };
};

export const getAdminOrderFormData = (value: any) => {
    return {
        type: ADMIN_ORDER_FORM,
        payload: value,
    };
};

export const getUpdateOrder = (value: any) => {
    return {
        type: UPDATE_ORDER,
        payload: value,
    };
};

export const getOrderDataById = (value: any) => {
    return {
        type: ORDER_DATA_BY_ID,
        payload: value,
    };
};
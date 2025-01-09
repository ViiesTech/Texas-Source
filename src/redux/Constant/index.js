// export const BASE_URL = 'https://khvw9wf1-3028.inc1.devtunnels.ms/api/user/'; //forwarding port
export const BASE_URL = 'https://appsdemo.pro/Texas_Server/api/user/';
export const PUBLISHABLE_KEY = 'pk_test_51JeezZLPp9miWmIeYcfiFClHyySHpw0Q6f9yp8FJnaeJ9WBXmGIx7H6I8Wj5fq5sA2zYRZwb26kq71vBiM9oGCU3003rlY77Xz'
// export const BASE_URL = 'http://localhost:3028/api/user/' //for my local machine
// export const BASE_URL = 'http://10.0.2.2:3028/api/user/';  //for emulator

export const endpoints = {
    REGISTER: 'register',
    LOGIN: 'login',
    FORGET_PASSWORD: 'forget-password',
    OTP_VERIFY: (code, id) => `forget-password-code-verify/${code}/${id}`,
    RESET_PASSWORD: 'change-forget-password',
    CHANGE_PASSWORD: 'change-password',
    EDIT_PROFILE: 'edit-profile',
    ADD_PRODUCT: 'add-product',
    GET_ALL_PRODUCTS: 'GetAllProducts',
    GET_MY_PRODUCTS: 'get-my-products',
    GET_ALL_COMPANIES: 'getAllCompanies',
    SEARCH_PRODUCTS: 'searchProducts',
    GET_PRODUCT_CATEGORIES: 'GetAllCatagores',
    PRODUCT_FILTER_BY_CATEGORIES: 'FilterProductByCategory',
    DELETE_PRODUCT: 'deleteProduct',
    EDIT_PRODUCT: 'editProduct',
    CREATE_CUSTOMER: 'createCustomer',
    SETUP_INTENT: 'createSetupIntent',
    PAYMENT: 'createPaymentIntent',
    ATTACH_PAYMENT: 'attachPaymentMethod',
    GET_ALL_CARDS: 'listSavedCards',
    GET_USER_ORDERS: 'getAllUserOrder',
    GET_OWNER_ORDERS: 'getAllOwnerOrder',
    ADD_REVIEW: 'RateAProduct',
    DELETE_ACCOUNT: 'Delete'
}
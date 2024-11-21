// export const BASE_URL = 'https://khvw9wf1-3028.inc1.devtunnels.ms/api/user/' //forwarding port
export const BASE_URL = 'https://appsdemo.pro/Texas_Server/api/user/'
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
    EDIT_PRODUCT: 'editProduct'
}
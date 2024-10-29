// export const BASE_URL = 'https://f0m1q1gt-3028.inc1.devtunnels.ms/api/user/' //forwarding port
// export const BASE_URL = 'http://localhost:3028/api/user/' //for my local machine
export const BASE_URL = 'http://10.0.2.2:3028/api/user/';  //for emulator

export const endpoints = {
    REGISTER: 'register',
    LOGIN: 'login',
    FORGET_PASSWORD: 'forget-password',
    OTP_VERIFY: (code, id) => `forget-password-code-verify/${code}/${id}`,
    RESET_PASSWORD: 'change-forget-password',
    ADD_PRODUCT: 'add-product'
}
export const BASE_URL = 'https://f0m1q1gt-3028.inc1.devtunnels.ms/api/user/'

export const endpoints = {
    REGISTER: 'register',
    LOGIN: 'login',
    FORGET_PASSWORD: 'forget-password',
    OTP_VERIFY: (code, id) => `forget-password-code-verify/${code}/${id}`,
    RESET_PASSWORD: 'change-forget-password'
}
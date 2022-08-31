export const API_URL = 'https://stage-api.crossborderpickup.com';
// export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const GoogleClientId = process.env.GOOGLE_CLIENT_ID;

export const registration = {
  SIGNIN: '/identity/Registration/SignIn',
  SIGNUP: '/identity/Registration/SignUp',
  SIGNOUT: '/identity/Registration/SignOut',
  REFREASH_TOKEN: '/identity/Registration/RefreshToken',
  CHANGE_PWD: '/identity/Registration/ResetMyPassword',
  ACTIVATE: '/identity/Registration/activate',
  GET_RESET_PWD_TOKEN: '/identity/Registration/GetResetPasswordToken',
  RESET_PWD: '/identity/Registration/ResetPassword',
  RESET_ACTIVATION: '/identity/Registration/ReSendActivateToken',
  GET_SIGNUP_CONTACT: '/identity/Registration/GetSignUpContracts',
  GOOGLE: '/identity/Registration/google',
};

export const user = {
  ME: '/identity/User/ME',
  PUT_ME: '/identity/User/Update',
};

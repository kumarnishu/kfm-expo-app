import { apiClient } from "./utils/AxiosInterceptor";

export const Login = async (
  body: {
    username: string,
    password: string,
    multi_login_token?: string
  }
) => {
  return await apiClient.post("login", body);
};

export const Register = async (body: FormData) => {
  console.log("nishu", body)
  return await apiClient.post("mobile/register", body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

export const GetAllEngineers = async () => {
  return await apiClient.get(`engineers`)
}
export const GetAllEngineersForDropDown = async () => {
  return await apiClient.get(`dropdown/engineers`)
}

export const GetAllUsers = async ({ hidden, customer }: { hidden: boolean, customer?: string }) => {
  if (customer)
    return await apiClient.get(`users/?hidden=${hidden}&customer=${customer}`)
  return await apiClient.get(`users/?hidden=${hidden}`)
}
export const GetAllUsersForDropDown = async ({ hidden }: { hidden: boolean }) => {
  return await apiClient.get(`dropdown/users/?hidden=${hidden}`)
}

export const Logout = async () => {
  return await apiClient.post("logout");
};


export const GetProfile = async () => {
  return await apiClient.get("profile");
};


export const UpdateProfile = async (body: FormData) => {
  return await apiClient.put("edit/profile", body);
};

export const UpdatePassword = async (body: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
  return await apiClient.patch("password/update", body)
};


// //update password
export const ResetPassword = async ({ token, body }:
  {
    token: string,
    body: { newPassword: string, confirmPassword: string }
  }) => {
  return await apiClient.patch(`password/reset/${token}`, body)
};

export const SendMailForResetPasswordLink = async ({ email }:
  {
    email: string
  }) => {
  return await apiClient.post(`send/email/password-reset-link`, { email: email })
};

// verify email
export const VerifyEmail = async (token: string) => {
  return await apiClient.patch(`email/verify/${token}`)
};

// send verification main
export const SendEmailVerificationLink = async ({ email }:
  {
    email: string
  }) => {
  return await apiClient.post(`send/email/verifcation-link`, { email: email })
};



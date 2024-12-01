export type GetUserForEditDto = {
    _id?: string,
    username: string,
    email: string,
    password: string,
    customer: string,
    mobile: string,
}


export type CreateUserFromExcelDto = {
    username: string,
    email: string,
    password: string,
    customer: string,
    mobile: string,
    status?: string
}


export type GetUserDto = {
    _id: string,
    username: string,
    email: string,
    mobile: string,
    customer: string,
    dp: string,
    orginal_password: string,
    is_admin: boolean,
    email_verified: boolean,
    mobile_verified: boolean,
    is_active: boolean,
    last_login: string,
    is_multi_login: boolean,
    is_engineer: boolean,
    created_at: string,
    updated_at: string,
    created_by: string,
    updated_by: string
}



export type LoginDto = {
    username: string,
    password: string,
    multi_login_token: string
}


export type UpdateProfileDto = {
    email: string,
    mobile: string
}
export type UpdatePasswordDto = {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
export type ResetPasswordDto = {
    newPassword: string,
    confirmPassword: string
}
export type SendOrVerifyEmailDto = {
    email: string
}

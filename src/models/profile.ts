export type UserRequestType = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export type UserAvatarType = {
    avatar: File;
}

export type ChangePasswordRequestType = {
    oldPassword: string;
    newPassword: string;
}

export type UserFullType = UserRequestType &  UserAvatarType & ChangePasswordRequestType & { repeatNewPassword: string };
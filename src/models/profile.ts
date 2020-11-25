export type UserRequestType = {
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    email: string;
    phone: string;
}

export type UserAvatarType = {
    avatar: string | null;
}

export type ChangePasswordRequestType = {
    oldPassword: string;
    newPassword: string;
}

export type UserResponseType = UserRequestType & UserAvatarType & { id: number ;}

export type ChatUserResponseType = UserResponseType & { role: 'admin' | 'regular' };

export type UserFullType = UserRequestType & UserAvatarType & ChangePasswordRequestType & { repeatNewPassword: string };

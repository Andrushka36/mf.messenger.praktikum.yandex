export type UserRequestType = {
    first_name: string;
    second_name: string;
    display_name: string | null;
    login: string;
    email: string;
    phone: string;
}

export type UserCommonType = {
    firstName: string,
    secondName: string;
    displayName: string | null;
    login: string;
    email: string;
    phone: string
};

export type UserAvatarType = {
    avatar: string | null;
}

export type ChangePasswordRequestType = {
    oldPassword: string;
    newPassword: string;
}

enum UserRole {
    ADMIN = 'admin',
    REGULAR = 'regular',
}

export type UserType = UserCommonType & UserAvatarType & { id: number };

export type ChatUserType = UserType & { role: UserRole }

export type UserFullType = UserCommonType & UserAvatarType & ChangePasswordRequestType & { repeatNewPassword: string };

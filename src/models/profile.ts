// потом к этим типам и типам из соседних файлов добавятся методы для получения/отправки данных через апи

type UserRequestType = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

type UserAvatarType = {
    avatar: File;
}

type ChangePasswordRequestType = {
    oldPassword: string;
    newPassword: string;
}

export type UserFullType = UserRequestType &  UserAvatarType & ChangePasswordRequestType & { repeatNewPassword: string };
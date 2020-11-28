export type SignUpRequestType = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export type SignUpType = {
    firstName: string;
    secondName: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export type SignUpFullType = SignUpType & { repeat_password: string };

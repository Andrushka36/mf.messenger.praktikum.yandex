export type SignUpType = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export type SignUpFullType = SignUpType & { repeat_password: string };

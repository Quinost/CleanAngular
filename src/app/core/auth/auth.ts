export type LoginRequest = {
    username: string;
    password: string;
}

export type TokenResult = {
    accessToken: string;
    //expirationDate: Date;
}
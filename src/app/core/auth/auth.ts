export type LoginRequest = {
    username: string;
    password: string;
}

export type TokenResult = {
    accessToken: string;
    expirationDateUTC: Date;
}
export type UserModel = {
    id: string;
    username: string;
    isActive: boolean;
}

export type UserList = {
} & UserModel
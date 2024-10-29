export type UserModel = {
    id: string;
    username: string;
    isActive: boolean;
    roleId: string;
    roleName: string;
}

export type UserList = {
} & UserModel

export type NewUser = {
    username: string;
    password: string;
    roleId: string;
}
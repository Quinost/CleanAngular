export type RoleModel = {
    id: string;
    name: string;
}

export type RoleList = {
} & RoleModel

export type NewRole = {
    name: string;
}
export enum RoleEnum {
    USER,
    ADMIN
}

export interface User {
    id: number,
    login: string,
    password: string,
    email: string,
    role: RoleEnum
}

export interface Exercise {
    id: number,
    name: string,
    complexity: number,
    availableTime: number,
    availableErrors: number,
    text: string,
    length: number,
    creationDate: string,
}

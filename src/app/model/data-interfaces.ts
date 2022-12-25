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

export interface Solution {
    id: number,
    userId: number,
    exerciseId: number,
    time: number,
    errors: number,
    averageSpeed: number,
    isSuccess: boolean,

}

export interface Complexity {
    id: number,
    minTime: number,
    maxTime: number,
    minLength: number,
    maxLength: number,
    maxErrors: number,
    zones: {
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
    }
}

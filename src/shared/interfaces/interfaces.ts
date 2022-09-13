import React from 'react';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: string[];
    isValidated: boolean;
}
export interface IState {
    isAuthenticated: boolean;
    user: IUser | null;
    token: string | null;
}

export interface IPayload {
    user: IUser;
    access_token: string;
}

export interface IAction {
    type: string;
    payload: IPayload;
}
export interface ContextType {
    state: IState;
    dispatch: React.Dispatch<IAction>;
}

import React from 'react';

export interface IClass {
  _id: string;
  nameClass: string;
  open: boolean;
}

export interface IAssessment {
  _id: string;
  assessmentValue: number;
}

export interface IUser {
  _id: string;
  name: string;
  image: string;
  email: string;
  roles: string[];
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

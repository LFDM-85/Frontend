import React from 'react';

export interface IClass {
  _id: string;
  nameClass: string;
  open: boolean;
  lecture: ILectures[];
}

export interface ILectures {
  _id: string;
  summary: string;
  description: string;
  finished: boolean;
  assessment: IAssessment;
  work: IWorks[];
  attendance: IAttendance;
}

export interface IAttendance {
  _id: string;
  attendance: boolean;
  validation: boolean;
  filename: string;
  filepath: string;
  owner: string;
}

export interface IWorks {
  _id: string;
  filename: string;
  filepath: string;
  owner: string;
}

export interface IAssessment {
  _id: string;
  assessmentValue: number;
  userEmail: string;
  lectureId: string;
}

export interface IUser {
  _id: string;
  name: string;
  image: string;
  email: string;
  roles: string[];
  isValidated: boolean;
  classes: IClass[];
  assessment: IAssessment[];
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

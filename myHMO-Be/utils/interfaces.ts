import { Document } from "mongoose";

export interface iMedical {
  doctorName: string;
  hospitalName: string;
  cost: string;
  diagnosis: string;
  avatar: string;
  members: {};
}

export interface iMember {
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  avatar: string;
  avatarId: string;
  statue: string;
  users: {};
  medicalHistory: Array<{}>;
}

export interface iUser {
  phoneNumber: string;
  location: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  avatar: string;
  avatarId: string;
  token: string;
  verify: boolean;
  statue: string;
  members: Array<{}>;
  medicalHistory: Array<{}>;
}

export interface iMemberData extends iMember, Document {}
export interface iMedicalData extends iMedical, Document {}
export interface iUserData extends iUser, Document {}

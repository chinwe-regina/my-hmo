import {Schema, Types, model } from "mongoose";
import { iUserData } from "../utils/interfaces";



const userModel =new Schema<iUserData>({
    phoneNumber:{
        type:String
    },
    location:{
        type:String
    },
    firstName:{
        type:String
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String
    },
    email: {
        type: String,
        unique: true,
      },
    avatar:{
        type:String
    },
    avatarId:{
        type:String
    },
    token:{
        type:String,
        default: ""
    },
    verify:{
        type: Boolean,
        default: false
    },
    members:[{
        type:Types.ObjectId,
        ref: "member"
    }],
    medicalHistory:[{
        type:Types.ObjectId,
        ref: "medicalHistory"
    }]
    
},
{ timestamps: true}
)

export default model<iUserData>("user", userModel)
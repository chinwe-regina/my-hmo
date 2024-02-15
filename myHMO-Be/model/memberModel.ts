import { Schema, Types, model } from "mongoose";

import { iMember, iMemberData } from "../utils/interfaces";

const memberModel =new Schema<iMemberData>({
    firstName:{
        types:String
    },
    lastName:{
        types:String
    },
    relationship:{
        types:String
    },
    email: {
        type: String,
      },
    avatar:{
        types:String
    },
    avatarId:{
        types:String
    },
  
    users:[{
        type:Types.ObjectId,
        ref: "user"
    }],
    medicalHistory:[{
        type:Types.ObjectId,
        ref: "medicalHistory"
    }]
    
},
{ timestamps: true}
)

export default model<iMemberData>("members", memberModel)
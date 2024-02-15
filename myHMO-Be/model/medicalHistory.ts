import { Schema, Types, model } from "mongoose";
import { iMedical } from "../utils/interfaces";



const medicalHistoryModel =new Schema<iMedical>({
    doctorName:{
        types:String
    },
    hospitalName:{
        types:String
    },
    cost:{
        types:String
    },
    diagnosis:{
        types:String
    },
  
    members:{
        type:Types.ObjectId,
        ref: "members"
    },
   
    
},
{ timestamps: true}
)

export default model<iMedical>("medicalhistory", medicalHistoryModel)
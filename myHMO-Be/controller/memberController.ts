import {Request, Response } from "express";
import memberModel from "../model/memberModel";
import userModel from "../model/userModel";
import { Types } from "mongoose";


export const createMember = async (req: Request, res: Response) => {
    try {
      const {userID} = req.params
      const getUser =await userModel.findById(userID)
      const {firstName, relationship} = req.body;

      if(getUser){

        const user = await memberModel.create({
            firstName,
            status: "member", 
            relationship
         }) 

         getUser.members.push(new Types.ObjectId(user._id));
         getUser.save()

         return res.status(200).json({
          message: "a member has been  for a user",
          data: user
        });
      }else{

        return res.status(404).json({
         message: "error creating member",
       });
      }


    } catch (error) {
      return res.status(404).json({
        message: "Error of creating",
      });
    }
  };


  export const verifyMember = async (req: Request, res: Response) => {
    try {
      const { userID } = req.params;
      const getUser =await userModel.findById(userID).populate({path: "members"})

      return res.status(200).json({
        message: "reading user",
        data: getUser
      })
  
    } catch (error) {
      return res.status(404).json({
        message: "Error of creating",
        data: error
      });
    }
  };

  export const loginMember = async (req: Request, res: Response) => {
    try {
      const { userID } = req.params;
      const { firstName, token}= req.body;
      const getUser:any =await userModel.findById(userID).populate({path: "members"})

      let getMember =getUser?.members.some((el:any)=>el.firstName=== firstName)

    if (getMember && getUser.token === token){
      
      return res.status(200).json({
        message: "welcome member in",
        data: getUser
      })
    }else{

      return res.status(404).json({
        message: "error reading user"
      })
    }
    
  
    } catch (error) {
      return res.status(404).json({
        message: "Error of creating",
        data: error
      });
    }
  };

  export const updateMemberNames = async (req: Request, res: Response) => {
    try {
      const { memberID } = req.params;
      const { firstName, middleName, lastName } = req.body;
      const user = await memberModel.findById(memberID);
      console.log(user);
  
      if (user) {
        const updateUser = await memberModel.findByIdAndUpdate(
          memberID,
          {
            firstName,
            middleName,
            lastName,
          },
          {
            new: true,
          }
        );
  
        return res.status(200).json({
          message: " user names updated",
          data: updateUser,
        });
      } else {
        return res.status(404).json({
          message: "something went wrong updating names",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "Error of creating",
      });
    }
  };
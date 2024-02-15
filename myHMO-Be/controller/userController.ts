import { Request, Response } from "express";
import session from "express-session";
import crypto from "crypto";
import userModel from "../model/userModel";
import jwt, { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../utils/cloudinary";
dotenv.config();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(3).toString("hex");

    console.log(token);

    const user = await userModel.create({
      email,
      token: token,
      status: "main",
    });

    return res.status(200).json({
      message: "creating user",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      message: "Error of creating",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    if (user) {
      const updateUser = await userModel.findByIdAndUpdate(
        userID,
        {
          verify: true,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        message: " creating user",
        data: updateUser,
      });
    } else {
      return res.status(404).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error of creating",
    });
  }
};

export const signUser = async (req: any, res: Response) => {
  try {
    const { email, token } = req.body;
    const getUser = await userModel.findOne({ email });

    if (getUser) {
      if (getUser.token === token) {
        if (getUser.verify) {
          const encrypt = jwt.sign(
            { id: getUser._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
          );

          // const user = await userModel.create({
          //     email, token, status: "main"
          // })
          req.session.isAuth = true;
          req.session.userID = getUser._id;
          return res.status(200).json({
            message: "welcome",
            data: encrypt,
          });
        } else {
          return res.status(404).json({
            message: "Account has not yet been verified",
          });
        }
      } else {
        return res.status(404).json({
          message: "Error of reading token",
        });
      }
    } else {
      return res.status(404).json({
        message: "error reading user",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error of creating",
    });
  }
};

export const viewAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({
      message: " viewing all user",
      data: users,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error in getting all users",
    });
  }
};

export const viewAllVerifiedUsers = async (req: Request, res: Response) => {
  try {
    const verifiedUsers = await userModel.find();

    const answer = verifiedUsers.filter((users: any) => {
      return users.verify;
    });

    return res.status(200).json({
      message: " viewing all verified user",
      data: answer,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error in getting all verified users",
    });
  }
};

export const logOutUser = async (req: any, res: Response) => {
  try {
    req.session.destroy();
    return res.status(200).json({
      message: "usernhas been logged out ",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error of creating",
    });
  }
};

// profiles Update
export const updateUserNames = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, middleName, lastName } = req.body;
    const user = await userModel.findById(userID);
    console.log(user);

    if (user) {
      const updateUser = await userModel.findByIdAndUpdate(
        user._id,
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

export const updateUserLocation = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { location } = req.body;
    const user = await userModel.findById(userID);

    if (user) {
      const updateUser = await userModel.findByIdAndUpdate(
        userID,
        {
          location,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        message: "user Location updated",
        data: updateUser,
      });
    } else {
      return res.status(404).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error of Updating location",
    });
  }
};

export const updateUserPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { phoneNumber } = req.body;
    const user = await userModel.findById(userID);

    if (user) {
      const updateUser = await userModel.findByIdAndUpdate(
        user._id,
        {
          phoneNumber,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        message: "user phoneNumber updated",
        data: updateUser,
      });
    } else {
      return res.status(404).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error of Updating phone Number",
    });
  }
};

// profile avatar
// express can't handle media-string, the middle-ware that handle media string and convert the media string into its original binaries then allow it enter our database is called MULTER

export const updateUserAvatar = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    
    
    if (user) {
      const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path)
      console.clear()
      // console.log(image);
      

      const updateUser = await userModel.findByIdAndUpdate(
        userID,
        {
          avatar: secure_url,
          avatarId: public_id,
        },
        {
          new: true,
        }
      );
        // console.log("imgae uploaded successfully");
        
      return res.status(200).json({
        message: "user Avatar updated",
        data: updateUser,
      });
    } else {
      return res.status(404).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error of avatar",
    });
  }
};

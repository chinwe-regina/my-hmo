import { connect } from "mongoose";

const URL: string = "mongodb://127.0.0.1:27017/myHmoDB";

export const dbConfig = async () => {
  try {
    return await connect(URL)
      .then(() => {
        console.log("database connection activated");
      })
      .catch((error: any) => console.log(error.message));
  } catch (error) {
    return error;
  }
};

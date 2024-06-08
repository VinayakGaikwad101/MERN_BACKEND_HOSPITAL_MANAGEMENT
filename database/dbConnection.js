import mongoose from "mongoose";

export const dbConnection = () => {
  // provide mongouri for connection, and then dbName in obj
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_MERN_STACK",
    })
    .then(() => {
      // if connection success then executes then block
      console.log(`Successfully connected to MongoDB`);
    })
    .catch((err) => {
      // if connection failed then executes catch block
      console.log(`Failed to connect to database. Error: ${err}`);
    });
};

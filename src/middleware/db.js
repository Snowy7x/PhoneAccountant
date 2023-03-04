import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  mongoose.set("strictQuery", false);

  // Use new db connection
  await mongoose
    .connect(process.env.mongodburl, {
      autoIndex: true,
    })
    .then((re) => console.log("DB CONNECTED"));
  return handler(req, res);
};

export default connectDB;

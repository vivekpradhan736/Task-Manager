import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
      dbName: "task_manager",
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

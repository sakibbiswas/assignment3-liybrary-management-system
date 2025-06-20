import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sazzadur:sakib9988@cluster0.uxaxmsb.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0");
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Failed to connect to database', error);
    process.exit(1);
  }
};

export default connectDB;
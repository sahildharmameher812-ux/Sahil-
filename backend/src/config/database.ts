import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    // Skip MongoDB connection if no URI is provided (for demo)
    if (!mongoURI || mongoURI === 'skip') {
      console.log('⚠️ MongoDB URI not provided - Running in demo mode without database');
      console.log('📝 Note: Data will not persist. Add MONGODB_URI for full functionality.');
      return;
    }
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    console.log('⚠️ Running without database connection');
    // Don't exit, allow app to run without database
  }
};

export default connectDB;

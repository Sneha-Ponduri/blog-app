import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    const connectionUrl = "mongodb+srv://snehaponduri:sneha12345@cluster0.tmyac.mongodb.net/";

    // Await the mongoose connection
    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Blog database connection is successful');
  } catch (error) {
    console.log('Error connecting to the database:', error);
    throw error;  // It's a good practice to rethrow the error if needed
  }
}

export default connectToDB;

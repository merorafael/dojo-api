import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb://database:27017/dojo_api", { useNewUrlParser: true });
    } catch (error) {
        console.log("MongoDB connection failed: "+error);
    }
};

export default dbConnection;

import UserInterface from '../interfaces/User';
import * as mongoose from 'mongoose';

// Seup the schema for the user
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    id: String
})

const UserModel = mongoose.model<UserInterface & mongoose.Document>('User', userSchema);

export default UserModel;
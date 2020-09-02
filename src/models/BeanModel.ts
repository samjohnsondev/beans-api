import Bean from '../interfaces/Bean';
import mongoose from 'mongoose';

// Create the database schema
const beanSchema = new mongoose.Schema({
    name: String,
    colour: String,
    odor: String,
    imagePath: String,
    displayDate: Date,
    price: Number,
    author: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
});

// Setup the document
const BeanModel = mongoose.model<Bean & mongoose.Document>('Bean', beanSchema);

export default BeanModel;

// models/pictureModel.js
import mongoose from 'mongoose';

const pictureSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const Picture = mongoose.model('Picture', pictureSchema);
export default Picture;

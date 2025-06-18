import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: [String], 
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    additives: {
        type: [String], 
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertiser',
        required: true
    }
});

export default mongoose.model('Apartment', apartmentSchema);

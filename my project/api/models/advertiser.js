import mongoose from "mongoose";

const advertiserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    addPhone: {
        type: String,
        required: false
    },
    apartments: [{  
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
});

export default mongoose.model('Advertiser', advertiserSchema);

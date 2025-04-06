import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    driver_name: {
        type: String,
        required: true,
    },
    driver_phno: {
        type: String,
        required: true,
    },
    driver_licno: {
        type: String,
        required: true,
    },
    driver_address: {
        type: String,
        required: true,
    },
    driver_licesp: {
        type: Date,
        required: true,
    },
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    paswd: {
        type: String,
        required: true,
    },
    driver_photo: {
        type: String,
        required: true,
    },
    driving_hrs: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Driver = mongoose.model("Driver", driverSchema);

export default Driver; 
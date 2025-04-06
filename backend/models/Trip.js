import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    trip_date: {
        type: Date,
        required: true,
    },
    trip_arrivalcity: {
        type: String,
        required: true,
    },
    trip_destinationcity: {
        type: String,
        required: true,
    },
    trip_starttime: {
        type: String,
        required: true,
    },
    trip_endtime: {
        type: String,
    },
    assigned_driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);

export default Trip; 
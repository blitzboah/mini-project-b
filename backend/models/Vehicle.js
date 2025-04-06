import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    v_vin: {
        type: String,
        required: true,
        unique: true,
    },
    v_perexp: {
        type: Date,
        required: true,
    },
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle; 
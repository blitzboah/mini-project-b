import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        unique: true,
    },
    company_address: {
        type: String,
        required: true,
    },
    company_email: {
        type: String,
        required: true,
        unique: true,
    },
    company_phno: {
        type: String,
        required: true,
    },
    paswd: {
        type: String,
        required: true,
    },
    verification_token: {
        type: String,
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

export default Company; 
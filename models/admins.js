import {Schema, model} from "mongoose";
import admins from "./admins";

const adminsSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isVerified: {type: Boolean, default: false},
    loginAttempts: {type: Number},
    timeOut: {type: Date},

}, {
    timestamps: true,
    strict: false,
},
);

export default model("Admin", adminsSchema);

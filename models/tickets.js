import { text } from "body-parser";
import { Timestamp } from "bson";
import mongoose, {Schema, model} from "mongoose";
import strict from "node:assert/strict";

const ticketsSchema = new Schema (
    {customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Customers"
    
    },
    quantity: { Type: Number},
    
    purchaseDate: {Type: Date},
    
    total: {
        type: Number
    },
    PaymentStatus: { type: String},
    TransactionId : {Type: mongoose.Types.ObjectId,
        ref: ""
    },
    
    Timestamps: true, 
        strict: false,
    }

);

export default model ("Tickets", ticketsSchema)
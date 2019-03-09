import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../../types";
import { App } from "../../types/index";

// Declare model interface
interface ICustomerDoc extends App.Customer, Document {}

const customerSchemaDef: SchemaDef<App.Customer> = {
    active: {
        required: true,
        type: Boolean,
    },
    address: {
        required: true,
        type: String,
    },
    address2: {
        type: String,
    },
    card_exp: {
        type: String,
    },
    card_number: {
        type: String,
    },
    card_type: {
        type: String,
    },
    city: {
        required: true,
        type: String,
    },
    country: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    name: {
        required: true,
        type: String,
        unique: true,
    },
    package: {
        required: true,
        type: String,
    },
    postal: {
        required: true,
        type: String,
    },
    state: {
        required: true,
        type: String,
    },
};

// Define model schema
const customerSchema = new Schema(customerSchemaDef, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

export default model<ICustomerDoc>("Customer", customerSchema);

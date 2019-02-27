import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../../types";

// Declare model interface
interface CustomerDoc extends App.Customer, Document {}

const customerSchemaDef: SchemaDef<App.Customer> = {
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    package: {
        type: String,
        required: true
    }
};

// Define model schema
const customerSchema = new Schema(customerSchemaDef);

export default model<CustomerDoc>("Customer", customerSchema);

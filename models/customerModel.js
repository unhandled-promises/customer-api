import { model, Schema } from "mongoose";

const customerSchemaDef = {
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
        type: boolean,
        required: true
    },
    package: {
        type: String,
        required: true
    }
};

// Define model schema
const customerSchema = new Schema(customerSchemaDef);

export default model("Customer", customerSchema);
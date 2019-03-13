import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import * as stripe from "stripe";
import Token from "../util/auth";
import Customer from "./customers.model";

// Put dotenv in use before importing controllers
dotenv.config();

const router = express.Router();

router.route("/").post(bodyParser.json(), async (request, response) => {
    try {
        const customer = new Customer(request.body);
        await customer.save();
        return response.status(201).json(customer);
    } catch (error) {
        return response.status(400).json(error.toString());
    }
});

router.route("/:id/exist").get(async (request, response) => {
    try {
        const customerId = request.params.id;
        const customer = await Customer.findOne({ _id: customerId });

        if (customer !== null) {
            return response.status(200).json(true);
        } else {
            throw new Error("Not Found");
        }
    } catch (error) {
        return response.status(404).json(false);
    }
});

router.route("/:id").get(Token.authenticate, async (request, response) => {
    try {
        if (await Token.authorize(["employee"], request)) {
            const customerId = request.params.id;
            const customer = await Customer.find({ _id: customerId });
            return response.status(200).json(customer);
        } else {
            throw Error("No Access");
        }
    } catch (error) {
        return response.status(404).json(error.toString());
    }
});

router.route("/:id").delete(Token.authenticate, async (request, response) => {
    try {
        if (Token.authorize(["owner"], request)) {
            const customerId = request.params.id;
            await Customer.findOneAndRemove({ _id: customerId });
            return response.status(202).json("Customer deleted!");
        } else {
            throw Error("No Access");
        }
    } catch (error) {
        return response.status(404).json(error.toString());
    }
});

router.route("/:id").put(Token.authenticate, bodyParser.json(), async (request, response) => {
    try {
        if (Token.authorize(["customer"], request)) {
            const customerId = request.params.id;
            const customerUpdate = request.body;
            await Customer.update({ _id: customerId }, customerUpdate, { new: true });
            return response.status(202).json("Customer updated!");
        } else {
            throw Error("No Access");
        }
    } catch (error) {
        return response.status(404).json(error.toString());
    }
});

router.route("/:id/charge").post(bodyParser.text(), async (request, response) => {
    try {
        console.log(request.body);

        const stripeKey = process.env.STRIPE_SECRET_KEY;
        const stripePayment = new stripe(stripeKey);
        const customerId = request.params.id;

        const { status } = await stripePayment.charges.create({
            amount: 2000,
            currency: "usd",
            description: "Fit2Work Dev",
            source: request.body,
        });

        const ccUpdate = { cc_token: request.body};

        await Customer.update({ _id: customerId }, ccUpdate, { new: true });

        return response.status(200).json({ status });
    } catch (error) {
        return response.status(500).json(error.toString());
    }
});

export default router;

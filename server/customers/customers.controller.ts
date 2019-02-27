import * as bodyParser from "body-parser";
import * as express from "express";
import Customer from "./customers.model";

const router = express.Router();

router.route("/").get(async (request, response) => {
    try {
        const customers = await Customer.find();
        return response.status(200).json(customers);
    } catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }
});

router.route("/").post(bodyParser.json(), async (request, response) => {
    try {
        const customer = new Customer(request.body);
        await customer.save();
        return response.status(201).json("Customer saved!");
    } catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }
});

router.route("/:id").get(async (request, response) => {
    try {
        const customerId = request.params.id;
        const customers = await Customer.find({ _id: customerId });
        return response.status(200).json(customers);
    } catch (error) {
        console.log(error);
        return response.status(404).send(error);
    }
});

router.route("/:id").delete(async (request, response) => {
    try {
        const customerId = request.params.id;
        await Customer.findOneAndRemove({ _id: customerId });
        return response.status(202).json("Customer deleted!");
    } catch (error) {
        console.log(error);
        return response.status(404).send(error);
    }
});

router.route("/:id").put(bodyParser.json(), async (request, response) => {
    try {
        const customerId = request.params.id;
        const customerUpdate = request.body;
        await Customer.update({ _id: customerId }, customerUpdate, {new: true});
        return response.status(202).json("Customer updated!");
    } catch (error) {
        console.log(error);
        return response.status(404).send(error);
    }
});

export default router;

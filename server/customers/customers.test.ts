import MongodbMemoryServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import * as request from "supertest";
import app from "../app";
import Customer from "./customers.model";

describe("/api/customers tests", () => {
    const mongod = new MongodbMemoryServer();

    beforeAll(async () => {
        const uri = await mongod.getConnectionString();
        await mongoose.connect(uri, { useNewUrlParser: true });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });

    afterEach(async () => {
        await Customer.remove({});
    });

    beforeEach(async () => {
        const customer = {
            active: true,
            address: "150 Liberty Way",
            address2: "PO Box 23",
            city: "Dover",
            country: "United States",
            email: "limu@limulkjkljlj.com",
            name: "LiMu Emu",
            package: "gold",
            postal: "03820",
            state: "NH",
        };

        const newCustomer = new Customer(customer);
        await newCustomer.save();
    });

    // Unit Test
    it("should get all customers", async () => {
        const response = await request(app)
            .get("/api/customers/");

        expect(response.status).toBe(200);
        expect(response.body).toEqual([expect.objectContaining({ name: "LiMu Emu", package: "gold" })]);
    });

    // Unit Test
    it("should get a customer", async () => {
        const customerInfo = await Customer.findOne({ name: "LiMu Emu" });

        const response = await request(app)
            .get(`/api/customers/${customerInfo._id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([expect.objectContaining({ name: "LiMu Emu", package: "gold" })]);
    });

    // Unit Test
    it("should not find a customer", async () => {

        const response = await request(app)
            .get(`/api/customers/asdfasdf`);

        expect(response.status).toBe(404);
    });

    // Unit Test
    it("should post a new customer", async () => {
        const newCustomer = {
            active: true,
            address: "150 Liberty Way",
            address2: "PO Box 23",
            city: "Dover",
            country: "United States",
            email: "limu@limuljlj.com",
            name: "LiMu Emu2",
            package: "gold",
            postal: "03820",
            state: "NH",
        };

        const response = await request(app)
            .post("/api/customers")
            .send(newCustomer);

        expect(response.status).toBe(201);
        expect(response.body).toBe("Customer saved!");
    });

    // Unit Test
    it("should toss an error trying to add a new customer", async () => {
        const newCustomer = {
            active: true,
            address: "150 Liberty Way",
            address2: "PO Box 23",
            city: "Dover",
            country: "United States",
            email: "limu@jlj.com",
            package: "gold",
            postal: "03820",
            state: "NH",
        };

        const response = await request(app)
            .post("/api/customers")
            .send(newCustomer);

        expect(response.status).toBe(400);
    });

    // Unit Test
    it("should delete a customer", async () => {
        const customerInfo = await Customer.findOne({ name: "LiMu Emu" });

        const response = await request(app)
            .delete(`/api/customers/${customerInfo._id}`);

        expect(response.status).toBe(202);
        expect(response.body).toBe("Customer deleted!");
    });

    // Unit Test
    it("should toss an error trying to delete a customer", async () => {
        const response = await request(app)
            .delete("/api/customers/43234234324234");

        expect(response.status).toBe(404);
    });

    // Unit Test
    it("should update a customer", async () => {
        const customerInfo = await Customer.findOne({ name: "LiMu Emu" });
        const packageInfo = { package: "silver" };

        const response = await request(app)
            .put(`/api/customers/${customerInfo._id}`)
            .send(packageInfo);

        expect(response.status).toBe(202);
        expect(response.body).toBe("Customer updated!");

        const customerInfoUpdate = await Customer.findOne({ name: "LiMu Emu" });
        expect(customerInfoUpdate.package).toBe("silver");
    });

    // Unit Test
    it("should not update a customer", async () => {
        const packageInfo = { package: "silver" };

        const response = await request(app)
            .put(`/api/customers/sdfasdf`)
            .send(packageInfo);

        expect(response.status).toBe(404);
    });
});

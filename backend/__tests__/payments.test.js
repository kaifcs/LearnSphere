// Only needed so requiring the controller (which constructs a Razorpay
// client) doesn't throw when no real credentials are present in this
// environment — the invalid-signature test below never makes a network call.
process.env.RAZORPAY_KEY = process.env.RAZORPAY_KEY || "rzp_test_dummy_key";
process.env.RAZORPAY_SECRET = process.env.RAZORPAY_SECRET || "dummy_secret_for_tests";

const { verifyPayment } = require("../controllers/payments");
const Payment = require("../models/payment");

function mockRes() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe("verifyPayment", () => {
    test("rejects when required fields are missing", async () => {
        const req = { body: {}, user: { id: "user123" } };
        const res = mockRes();

        await verifyPayment(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("rejects an invalid Razorpay signature without touching the database", async () => {
        // If the signature check didn't short-circuit correctly, this call
        // would reach the DB — spying (without a mock implementation) lets
        // us prove it never does, rather than just asserting the response.
        const dbSpy = jest.spyOn(Payment, "findOneAndUpdate");

        const req = {
            body: {
                razorpay_order_id: "order_fake123",
                razorpay_payment_id: "pay_fake123",
                razorpay_signature: "definitely-not-a-valid-signature",
            },
            user: { id: "user123" },
        };
        const res = mockRes();

        await verifyPayment(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(dbSpy).not.toHaveBeenCalled();

        dbSpy.mockRestore();
    });
});

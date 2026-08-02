// Set before requiring the modules under test so this file's value wins
// over anything dotenv.config() would otherwise load from a real .env.
process.env.JWT_SECRET = "test-jwt-secret-for-unit-tests";

const jwtUtil = require("../utils/jwt");
const { auth } = require("../middleware/auth");

let consoleErrorSpy;

beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    consoleErrorSpy.mockRestore();
});

function mockRes() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe("auth middleware", () => {
    test("rejects a request with no token", () => {
        const req = { body: {}, cookies: {}, header: () => undefined };
        const res = mockRes();
        const next = jest.fn();

        auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test("rejects an invalid/forged JWT", () => {
        const req = {
            body: { token: "this.is.not-a-valid-jwt" },
            cookies: {},
            header: () => undefined,
        };
        const res = mockRes();
        const next = jest.fn();

        auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    test("accepts a validly signed token and attaches req.user", () => {
        const token = jwtUtil.sign(
            { id: "user123", accountType: "Student" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const req = {
            body: { token },
            cookies: {},
            header: () => undefined,
        };

        const res = mockRes();
        const next = jest.fn();

        auth(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(req.user.id).toBe("user123");
    });
});
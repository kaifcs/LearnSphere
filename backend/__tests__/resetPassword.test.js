jest.mock("../models/user");

const User = require("../models/user");
const { resetPassword } = require("../controllers/resetPassword");

function mockRes() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

function mockReq(overrides = {}) {
    return {
        body: {
            token: "some-raw-reset-token",
            password: "newPassword123",
            confirmPassword: "newPassword123",
        },
        cookies: {},
        header: () => undefined,
        ...overrides,
    };
}

describe("resetPassword", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("returns 400 (not 500) for an invalid/unknown token instead of crashing", async () => {
        User.findOne.mockResolvedValue(null);

        const res = mockRes();
        await resetPassword(mockReq(), res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    test("returns 400 for an expired token", async () => {
        User.findOne.mockResolvedValue({
            resetPasswordTokenExpires: Date.now() - 1000, // already expired
        });

        const res = mockRes();
        await resetPassword(mockReq(), res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test("on success, clears the token so the link cannot be reused", async () => {
        User.findOne.mockResolvedValue({
            resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000, // still valid
        });
        User.findOneAndUpdate.mockResolvedValue({});

        const res = mockRes();
        await resetPassword(mockReq(), res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            expect.any(Object),
            expect.objectContaining({ token: null, resetPasswordTokenExpires: null }),
            expect.any(Object)
        );
    });
});

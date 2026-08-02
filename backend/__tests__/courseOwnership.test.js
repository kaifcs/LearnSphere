const { isCourseOwner } = require("../utils/courseOwnership");

describe("isCourseOwner", () => {
    test("returns true when the course's instructor matches the given user id", () => {
        const course = { instructor: "64b000000000000000000001" };
        expect(isCourseOwner(course, "64b000000000000000000001")).toBe(true);
    });

    test("returns false when the course belongs to a different instructor", () => {
        const course = { instructor: "64b000000000000000000001" };
        expect(isCourseOwner(course, "64b000000000000000000002")).toBe(false);
    });
});

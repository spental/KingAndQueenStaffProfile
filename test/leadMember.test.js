const Manager = require("../lib/leadMember");

test("can set office number via constructor", () => {
    const testThis = "84";
    const e = new Manager("kyle", 66, "test@test.com", testThis);
    expect(e.phoneNumber()).toBe(testThis);
});

test("getRole() should return Manager", () => {
    const testThis = "Manager";
    const e = new Manager("kyle", 66, "test@test.com", 84);
    expect(e.getRole()).toBe(testThis);
});

test("can get office number via getOfficeNumber()", () => {
    const testThis = 84;
    const e = new Manager("kyle", 66, "test@test.com", testThis);
    expect(e.getphonenumber()).toBe(testThis);
});
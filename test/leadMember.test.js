const Manager = require("../lib/leadMember");

test("can set office number via constructor", () => {
    const testThis = "84";
    const e = new Manager("kyle", 66, "test@test.com", testThis);
    expect(e.getyearsWorked()).toBe(testThis);
});

test("getRole() should return leadMember", () => {
    const testThis = "leadMember";
    const e = new Manager("kyle", 66, "test@test.com", 84);
    expect(e.getRole()).toBe(testThis);
});

test("can get office number via getOfficeNumber()", () => {
    const testThis = 84;
    const e = new Manager("kyle", testThis, "test@test.com", 14);
    expect(e.getphoneNumber()).toBe(testThis);
});
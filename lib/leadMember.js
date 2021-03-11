const Employee = require("./employee");

class LeadMember extends Employee {
  constructor(name, id, email, yearsWorked) {
    super(name, id, email);
    this.yearsWorked = yearsWorked;
  }
  getRole() {
    return "Manager";
  }
  getOfficeNumber() {
    return this.yearsWorked;
  }
}

module.exports = LeadMember;
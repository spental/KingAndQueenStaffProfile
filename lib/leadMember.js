const Employee = require("./employee");

class LeadMember extends Employee {
  constructor(name, id, email, yearsWorked) {
    super(name, id, email);
    this.yearsWorked = yearsWorked;
  }
  getRole() {
    return "leadMember";
  }
  getyearsWorked() {
    return this.yearsWorked;
  }
  getphoneNumber(){
    return this.id
  }
}

module.exports = LeadMember;
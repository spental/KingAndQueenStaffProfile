const Employee = require("./employee");

class Teacher extends Employee {
  constructor(name, phoneNumber, email, school) {
    super(name, phoneNumber, email);
    this.school = school;
  }
  getRole() {
    return "Teacher";
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Teacher;

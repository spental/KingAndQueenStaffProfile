const Employee = require("./employee");

class Administrator extends Employee {
  constructor(name, AdminPhone, email, GitHub) {
    super(name, AdminPhone, email);
    this.GitHub = GitHub;
  }
  getRole() {
    return "Administrator";
  }
  getGitHub() {
    return this.GitHub;
  }
}

module.exports = Administrator;
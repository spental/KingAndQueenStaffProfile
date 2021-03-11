// file system and path required to connect the program.

const path = require("path");
const fs = require("fs");
const Administrator = require("./administrator");

const templatesDir = path.resolve(__dirname, "../src");

//function to filter and map the different employees that have been created
const render = (employees) => {
  const html = [];

  /* filters the employee based on the manager role and than creates a new array that adds
  the new position that was created */
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "leadMember")
      .map((leadMember) => renderleadMember(leadMember))
      .join("")
  );
  // filters the employee based on the engineer role that adds that to the new array.
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Administrator")
      .map((Administrator) => renderadministrator(Administrator))
      .join("")
  );

  // filters the employee based on the intern role and adds that to the new array
  html.push(
    ...employees
      .filter((employee) => employee.getRole() === "Teacher")
      .map((Teacher) => renderteacher(Teacher))
      .join("")
  );

  return renderMain(html.join(""));
};

// function to add the newly created manager to the template placeholders in the html file
const renderleadMember = (leadMember) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "leadMember.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", leadMember.getName());
  template = replacePlaceholders(template, "role", leadMember.getRole());
  template = replacePlaceholders(template, "email", leadMember.getEmail());
  template = replacePlaceholders(template, "id", leadMember.getId());
  template = replacePlaceholders(
    template,
    "yearsWorked",
    leadMember.getyearsWorked()
  );
  return template;
};

// function to add the newly created engineer to the template placeholders in the html file

const renderadministrator = (administrator) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "administrator.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", administrator.getName());
  template = replacePlaceholders(template, "role", administrator.getRole());
  template = replacePlaceholders(template, "email", administrator.getEmail());
  template = replacePlaceholders(template, "id", administrator.getId());
  template = replacePlaceholders(template, "github", administrator.getGitHub());
  return template;
};

// function to add the newly created intern to the template placeholders in the html file

const renderteacher = (teacher) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "teacher.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", teacher.getName());
  template = replacePlaceholders(template, "role", teacher.getRole());
  template = replacePlaceholders(template, "email", teacher.getEmail());
  template = replacePlaceholders(template, "id", teacher.getId());
  template = replacePlaceholders(template, "school", teacher.getSchool());
  return template;
};

/* function to render the html page based on the responses from the user and the 
newly created array of team members and joins them to the html file along with 
the templates */

const renderMain = (html) => {
  const template = fs.readFileSync(
    path.resolve(templatesDir, "employee.html"),
    "utf8"
  );
  return replacePlaceholders(template, "output", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;

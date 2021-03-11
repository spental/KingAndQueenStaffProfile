const fs = require("fs");
const inquirer = require("inquirer");
const Administrator = require ("./lib/administrator");
const Teacher = require("./lib/teacher");
const LeadMember = require ("./lib/leadMember");
const render = require("./lib/render");
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "genOutput.html");
const teamMates = [];
const idTaken = [];

const createLeadMember = () => {
    console.log("King and Queen County Schools Team Members");
    console.log("------------------------------------------");
    inquirer 
     .prompt([
        {
          type: "input",
          message: "Enter Lead member name",
          name: "name",
          validate: (response) => {
            if (response !== "") {
              return true;
            }
            return "Please select atleast one character.";
          },
        },
        {
          type: "input",
          message: "Enter Contact Number",
          name: "phoneNumber",
          validate: (response) => {
            const pass = response.match(/^[1-9999999999]\d*$/);
            if (pass) {
              return true;
            }
            return "Enter Appropriate Number Please";
          },
        },
        {
          type: "input",
          message: "Enter Lead Member email address",
          name: "email",
          validate: (response) => {
            const pass = response.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          message: "Enter The lead Members Years Of Experience.",
          name: "yearsWorked",
          validate: (response) => {
            const pass = response.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Select a number greater than zero";
          },
        },
     ])
     .then((response) => {
        const leadMember = new LeadMember(
          response.name,
          response.phoneNumber,
          response.email,
          response.yearsWorked
        );
        teamMates.push(leadMember);
        idTaken.push(response.id);
        createEmployee();
      })
      .catch((err) => {
        throw err;
      });
  };
  const createEmployee = () => {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Select an employee to add to the team",
          name: "employees",
          choices: ["Administrator", "Teacher", "Exit"],
        },
      ])
  
      // depending on the user response that function is called to generate that employee
      .then((response) => {
        if (response.employees === "Administrator") {
          addAdministrator();
        } else if (response.employees === "Teacher") {
          addTeacher();
        } else {
          const renderHtml = render(teamMates);
          fs.writeFile(outputPath, renderHtml, function (err) {
            if (err) throw err;
            console.log("Creating your District Profile");
          });
        }
      });
   };
   
   //function to create the engineer. all prompts have validation.
   const addAdministrator = () => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the Administrators name",
          name: "name",
          validate: (response) => {
            if (response !== "") {
              return true;
            }
            return "Please select atleast one character.";
          },
        },
        {
          type: "input",
          message: "Please enter the Administrators Contact Number",
          name: "AdminPhone",
          validate: (response) => {
            const pass = response.match(/^[1-9999999999]\d*$/);
            if (pass) {
              if (idTaken.includes(response)) {
                return "Enter Appropriate Contact Number Please";
              } else {
                return true;
              }
            }
            return "Select a number greater than zero";
          },
        },
        {
          type: "input",
          message: "Enter Administrators email address",
          name: "email",
          validate: (response) => {
            const pass = response.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          message: "Enter Social Media User Name",
          name: "SocialName",
          validate: (response) => {
            if (response !== "") {
              return true;
            }
            return "Please select atleast one character.";
          },
        },
      ])
  
      // repsonses are pushed to the new engineer
      .then((response) => {
        const administrator = new Administrator(
          response.name,
          response.AdminPhone,
          response.email,
          response.socialName
        );
        teamMates.push(administrator);
        idTaken.push(response.administratorId);
        createEmployee();
      })
      .catch((err) => {
        throw err;
      });
   };
  
  // function to create the intern. all prompts have validation to prevent user error.
   const addTeacher = () => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the Teachers name",
          name: "name",
          validate: (response) => {
            if (response !== "") {
              return true;
            }
            return "Please select atleast one character.";
          },
        },
        {
          type: "input",
          message: "Please Enter Teacher Contact Number",
          name: "teacherNumber",
          validate: (response) => {
            const pass = response.match(/^[1-9999999999]\d*$/);
            if (pass) {
              if (idTaken.includes(response)) {
                return "Enter Appropriate Number Please";
              } else {
                return true;
              }
            }
            return "Select a number greater than zero";
          },
        },
        {
          type: "input",
          message: "Enter the Teachers email address",
          name: "email",
          validate: (response) => {
            if (response !== "") {
              return true;
            }
            return "Please select atleast one character.";
          },
        },
        {
          type: "input",
          message: "Enter the Teachers school",
          name: "school",
          validate: (response) => {
            if (response !== "") {
              return true;
            }
            return "Please select atleast one character.";
          },
        },
      ])
  
      //repsonses are pushed to the new intern.
      .then((response) => {
        const teacher = new Teacher(
          response.name,
          response.teacherNumber,
          response.email,
          response.school
        );
        teamMates.push(teacher);
        idTaken.push(response.teacherNumber);
        createEmployee();
      })
      .catch((err) => {
        throw err;
      });
   };
   // starts the process of creating the team.
   createLeadMember();

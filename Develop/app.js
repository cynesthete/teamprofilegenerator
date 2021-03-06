const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];

function menu(){
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What action would you like to take?",
        choices: ["Add manager", "Add engineer", "Add intern", "Build team"]
    }).then(function(answer){
        switch(answer.action){
            case "Add manager": 
            addManager();
            break;
            case "Add engineer":
            addEngineer();
            break;
            case "Add intern":
                addIntern();
                break;
            case "Build team":
                buildTeam();
                break;
        }
    })
}

// add manager
    function addManager(){
        inquirer.prompt([
            {
                type: "input",
                name: "name", 
                message: "Enter manager's first and last name",
            },
            {
                type: "input",
                name: "id", 
                message: "Enter manager's id number", 
            },
            {
                type: "input",
                name: "email", 
                message: "Enter manager's email address",
            },
            {
                type: "input",
                name: "officeNumber", 
                message: "Enter manager's office number",
            }
        ]).then (function (answer){
            let manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
            teamMembers.push(manager);
            menu();
        })
    }

// add engineer
function addEngineer(){
    inquirer.prompt([
        {
            type: "input",
            name: "name", 
            message: "Enter engineer's first and last name",
        },
        {
            type: "input",
            name: "id", 
            message: "Enter engineer's id number", 
        },
        {
            type: "input",
            name: "email", 
            message: "Enter engineer's email address",
        },
        {
            type: "input",
            name: "github", 
            message: "Enter engineer's Github handle",
        }
    ]).then (function (answer){
        let manager = new Engineer(answer.name, answer.id, answer.email, answer.github);
        teamMembers.push(engineer);
        menu();
    })
}

// add intern function
function addIntern(){
    inquirer.prompt([
        {
            type: "input",
            name: "name", 
            message: "Enter intern's first and last name",
        },
        {
            type: "input",
            name: "id", 
            message: "Enter intern's id number", 
        },
        {
            type: "input",
            name: "email", 
            message: "Enter intern's email address",
        },
        {
            type: "input",
            name: "school", 
            message: "Enter intern's school",
        }
    ]).then (function (answer){
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        teamMembers.push(intern);
        menu();
    })
}

// build team function

function buildTeam(){
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers))
}

// callback for menu (node knows this will be first thing it does)
menu();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

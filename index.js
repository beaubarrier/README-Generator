// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
// TODO: Create an array of questions for user input

const writeFileAsync = util.promisify(fs.writeFile);

const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "Please enter a title for your applications.",
            name: 'title',
        },
        {
            type: 'input',
            message: "Please enter a description of the application.",
            name: 'description',
        },
        {
            type: 'input',
            message: "Please enter installation instructions if aplicable.",
            name: 'installation',
        },
        {
            type: 'input',
            message: "Please enter a description on how the application will be used.",
            name: 'usage',
        },
        {
            type: 'input',
            message: "Please enter a description on how to contribute to the application.",
            name: 'contribution',
        },
        {
            type: 'input',
            message: "Please enter a description of how the application will be tested.",
            name: 'test',
        },
        {
            type: 'input',
            message: "Please enter your email address.",
            name: 'email',
        },
        {
            type: 'input',
            message: "Please enter your GitHub user name.",
            name: 'github',
        },
        {
            type: 'input',
            message: "Your email and GitHub user name will be added to the Questions section. Please enter any other information about how you can be contacted if there is a question.",
            name: 'questions',
        },


    ])
}


// TODO: Create a function to write README file


const writeToFile = (data) =>
    `<h1> ${data.title}</h1>
    <br>
    <h3>Description</h3>
    <p>${data.description}</p>
    <br>
    <h3>Installation Instructions</h3>
    <p>${data.installation} </p>
    <br>
    <h3>Usage</h3>
    <p>${data.usage}</p>
    <br>
    <h3>Contribution</h3>
    <p>${data.contribution}</p>
    <br>
    <h3>Testing</h3>
    <p>${data.test}</p>
    <br>
    <h3>Questions.</h3>
    <p>Email Address: <a href="mailto:${data.email}"> ${data.email} </a></p>
    <p>GitHub User Name: <a href="www.github.com/${data.github}>github.com/${data.github}</a></p>
    <br>
    ${data.questions}
    <br>
    `

// TODO: Create a function to initialize app
function init() {
    questions()
        .then((data) => writeFileAsync('readme.md', writeToFile(data)))
        .then(() => console.log('Congrats! You successfully created a readme.md file!'))
        .catch((err) => console.error(err));
};



// Function call to initialize app
init();


// fs.writeFile(fileName, data, err => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log("Congrats! Your readme.md file has been created! Don't you feel accomplished?!")
// });
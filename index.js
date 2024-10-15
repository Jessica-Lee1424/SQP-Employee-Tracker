const inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description of your project:',
    }
]).then(answers => {
    console.log(`Project Title: ${answers.projectTitle}`);
    console.log(`Description: ${answers.description}`);
});
// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    // WHEN I enter my project title
    // THEN this is displayed as the title of the README
    {
        type: 'input',
        name: 'title',
        message: "What's the title of your project?",
        default() {
            return 'Not Defined';
        },
    },
    // WHEN I enter a description, installation instructions, usage information, 
    //        contribution guidelines, and test instructions
    // THEN this information is added to the sections of the README entitled 
    //            Description, Installation, Usage, Contributing, and Tests
    {
        type: 'input',
        name: 'description',
        message: "What's the description of your project?",
        default() {
            return 'Not Defined';
        },
    },
    {
        type: 'input',
        name: 'installation',
        message: "List Installation Instructions",
        default() {
            return 'N/A';
        },
    },
    {
        type: 'input',
        name: 'usage',
        message: "List Usage Instructions",
        default() {
            return 'N/A';
        },
    },
    {
        type: 'input',
        name: 'contributors',
        message: "List Contributors",
        default() {
            return 'N/A';
        },
    },
    {
        type: 'input',
        name: 'tests',
        message: "List Tests",
        default() {
            return 'N/A';
        },
    },
]

// TODO: Create a function to write README file
function writeToFile(fileName, data) {

    console.log (data);
    // destructure the object data
    const { title, description, installation, usage, contributors, tests } = data;
    // console.log ("Title is ", title);
    // console.log ("Description is ", description);

    let titleLine = `# ${title}\n\n`;
    let desciptionLine = `## Description\n ${description}\n\n`;
    let installationLine = `## Installation\n ${installation}\n\n`;
    let usageLine = `## Usage\n ${usage}\n\n`;
    let contributorLine = `## Contributors\n ${contributors}\n\n`;

    // String to hold first section of README contents
    let firstSection = titleLine+desciptionLine+installationLine+usageLine+contributorLine;
    console.log("Lines are are ", titleLine+desciptionLine+installationLine+usageLine+contributorLine);

    fs.appendFile(fileName, (firstSection), (err) =>
        err ? console.error(err) : console.log('Success!')
    );

    // fs.appendFile(fileName, line2, (err) =>
    //     err ? console.error(err) : console.log('Success!')
    // );
}

// # <Your-Project-Title>

// ## Description

// Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

// - What was your motivation?
// - Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
// - What problem does it solve?
// - What did you learn?

// ## Table of Contents (Optional)

// If your README is long, add a table of contents to make it easy for users to find what they need.

// - [Installation](#installation)
// - [Usage](#usage)
// - [Credits](#credits)
// - [License](#license)

// ## Installation

// What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

// ## Usage

// Provide instructions and examples for use. Include screenshots as needed.

// To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

//     ```md
//     ![alt text](assets/images/screenshot.png)
//     ```

// ## Credits

// List your collaborators, if any, with links to their GitHub profiles.

// If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

// If you followed tutorials, include links to those here as well.

// ## License

// The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

// ---

// 🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

// ## Badges

// ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

// Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

// ## Features

// If your project has a lot of features, list them here.

// ## How to Contribute

// If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

// ## Tests

// Go the extra mile and write tests for

// TODO: Create a function to initialize app
function init() {
    console.log("initializing");
    // Ask user questions
    inquirer.prompt(questions).then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));

        // Create README using user input
        writeToFile("test-README.txt", answers);
    });

}

// Function call to initialize app
init();

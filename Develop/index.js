// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// array of questions to prompt the user for
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
        type: 'input', // switch back to 'editor',
        name: 'usage',
        message: "List Usage Instructions.",
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
    // WHEN I choose a license for my application from a list of options
    // THEN a badge for that license is added near the top of the README and 
    // a notice is added to the section of the README entitled License that explains which license the application is covered under
    { // License Object
        type: "list",
        message: "Select one license type below",
        name: "license",
        choices: [  // Array of license choices
            // Hrefs from https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
            {
                name: "None",
                value: {
                    licenseName: "n/a",
                    message: "n/a",
                    color: "n/a",
                    href: "n/a"
                }
            },
            {
                name: "Apache License 2.0",
                value: {
                    licenseName: "Apache License 2.0",
                    message: "Apache_2.0",
                    color: "blue",
                    href: "https://opensource.org/licenses/Apache-2.0"
                }
            },
            {
                name: "GNU General Public License V3.0",
                value: {
                    licenseName: "GNU General Public License V3.0",
                    message: "GPLv3",
                    color: "blue",
                    href: "https://opensource.org/licenses/GPL-3.0"
                }
            },
            {
                name: "MIT License",
                value: {
                    licenseName: "MIT License",
                    message: "MIT",
                    color: "yellow",
                    href: "https://opensource.org/licenses/MIT",
                }
            },
            {
                name: "BSD 2-Clause Simplified License",
                value: {
                    licenseName: "BSD 2-Clause Simplified License",
                    message: "BSD_2--Clause",
                    color: "orange",
                    href: "https://opensource.org/licenses/BSD-2-Clause"
                }
            },
            {
                name: "BSD 3-Clause New or Revised License",
                value: {
                    licenseName: "BSD 3-Clause New or Revised License",
                    message: "BSD_3--Clause",
                    color: "blue",
                    href: "https://opensource.org/licenses/BSD-3-Clause"
                }
            },
            {
                name: "Boost Software License",
                value: {
                    licenseName: "Boost Software License",
                    message: "Boost_1.0",
                    color: "lightblue",
                    href: "https://www.boost.org/LICENSE_1_0.txt"
                }
            },
            {
                name: "Creative Commons Zero v1.0 Universal",
                value: {
                    licenseName: "Creative Commons Zero v1.0 Universal",
                    message: "CC0_1.0",
                    color: "lightgrey",
                    href: "http://creativecommons.org/publicdomain/zero/1.0/"
                }
            },
            {
                name: "Eclipse Public License 2.0",
                value: {
                    licenseName: "Eclipse Public License 2.0",
                    message: "EPL_1.0",
                    color: "red",
                    href: "https://opensource.org/licenses/EPL-1.0"
                }
            },
            {
                name: "GNU Affero General Public License v3.0",
                value: {
                    licenseName: "GNU Affero General Public License v3.0",
                    message: "AGPL_v3",
                    color: "blue",
                    href: "https://www.gnu.org/licenses/agpl-3.0"
                }
            },
            {
                name: "GNU General Public License v2.0",
                value: {
                    licenseName: "GNU General Public License v2.0",
                    message: "GPL_v2",
                    color: "blue",
                    href: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html"
                }
            },
            {
                name: "GNU Lesser General Public License v2.1",
                value: {
                    licenseName: "GNU Lesser General Public License v2.1",
                    message: "LGPL_v3",
                    color: "blue",
                    href: "https://www.gnu.org/licenses/lgpl-3.0"
                }
            },
            {
                name: "Mozilla Public License 2.0",
                value: {
                    licenseName: "Mozilla Public License 2.0",
                    message: "MPL_2.0",
                    color: "brightgreen",
                    href: "https://opensource.org/licenses/MPL-2.0"
                }
            },
            {
                name: "The Unlicense",
                value: {
                    licenseName: "The Unlicense",
                    message: "Unlicense",
                    color: "blue",
                    href: "http://unlicense.org"
                }
            }
        ], // END OF Array of license choices
    }, // END OF License Object

    // WHEN I enter my GitHub username
    // THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
    {
        type: 'input',
        name: 'gitHub',
        message: "Enter your GitHub username",
        default() {
            return 'Not Defined';
        },
    },
    //WHEN I enter my email address
    // THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
    {
        type: 'input',
        name: 'email',
        message: "Enter your email address",
        default() {
            return 'Not Defined';
        },
    },
]
///////////////////////////// END OF Questions ARRAY ////////////////////////


// Write user input to the README file
function writeToFile(fileName, data) {
    
    fs.appendFile(fileName, (generateMarkdown(data)), (err) =>
        err ? console.error(err) : console.log('Success! Open the README in preview mode to see results.')
    );
}


// Go the extra mile and write tests for
// Initialize app
function init() {
    // Prompt for input 
    inquirer.prompt(questions).then((userInput) => {

        //console.log(JSON.stringify(userInput, null, '  '));
        // Create README using user input
        writeToFile("README.md", userInput);
    });
}

// Function call to initialize app
init();

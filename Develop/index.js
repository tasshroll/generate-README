// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

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
                    license_name: "n/a",
                    color: "n/a",
                    href: "n/a"
                }
            },
            {
                name: "Apache License 2.0",
                value: {
                    display: "Apache License 2.0",
                    license_name: "Apache_2.0",
                    color: "blue",
                    href: "https://opensource.org/licenses/Apache-2.0"
                }
            },
            {
                name: "GNU General Public License V3.0",
                value: {
                    display: "GNU General Public License V3.0",
                    license_name: "GPLv3",
                    color: "blue",
                    href: "https://opensource.org/licenses/GPL-3.0"
                }
            },
            {
                name: "MIT License",
                value: {
                    display: "MIT License",
                    license_name: "MIT",
                    color: "yellow",
                    href: "https://opensource.org/licenses/MIT",
                }
            },
            {
                name: "BSD 2-Clause Simplified License",
                value: {
                    display: "BSD 2-Clause Simplified License",
                    license_name: "BSD_2--Clause",
                    color: "orange",
                    href: "https://opensource.org/licenses/BSD-2-Clause"
                }
            },
            {
                name: "BSD 3-Clause New or Revised License",
                value: {
                    display: "BSD 3-Clause New or Revised License",
                    license_name: "BSD_3--Clause",
                    color: "blue",
                    href: "https://opensource.org/licenses/BSD-3-Clause"
                }
            },
            {
                name: "Boost Software License",
                value: {
                    display: "Boost Software License",
                    license_name: "Boost_1.0",
                    color: "lightblue",
                    href: "https://www.boost.org/LICENSE_1_0.txt"
                }
            },
            {
                name: "Creative Commons Zero v1.0 Universal",
                value: {
                    display: "Creative Commons Zero v1.0 Universal",
                    license_name: "CC0_1.0",
                    color: "lightgrey",
                    href: "http://creativecommons.org/publicdomain/zero/1.0/"
                }
            },
            {
                name: "Eclipse Public License 2.0",
                value: {
                    display: "Eclipse Public License 2.0",
                    license_name: "EPL_1.0",
                    color: "red",
                    href: "https://opensource.org/licenses/EPL-1.0"
                }
            },
            {
                name: "GNU Affero General Public License v3.0",
                value: {
                    display: "GNU Affero General Public License v3.0",
                    license_name: "AGPL_v3",
                    color: "blue",
                    href: "https://www.gnu.org/licenses/agpl-3.0"
                }
            },
            {
                name: "GNU General Public License v2.0",
                value: {
                    display: "GNU General Public License v2.0",
                    license_name: "GPL_v2",
                    color: "blue",
                    href: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html"
                }
            },
            {
                name: "GNU Lesser General Public License v2.1",
                value: {
                    display: "GNU Lesser General Public License v2.1",
                    license_name: "LGPL_v3",
                    color: "blue",
                    href: "https://www.gnu.org/licenses/lgpl-3.0"
                }
            },
            {
                name: "Mozilla Public License 2.0",
                value: {
                    display: "Mozilla Public License 2.0",
                    license_name: "MPL_2.0",
                    color: "brightgreen",
                    href: "https://opensource.org/licenses/MPL-2.0"
                }
            },
            {
                name: "The Unlicense",
                value: {
                    display: "The Unlicense",
                    license_name: "Unlicense",
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
/////////////////////////////////////// END OF Questions ARRAY ////////////////////////

// Create a graphic badge
function createBadge(license) {
    // Badge URL format: https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>.svg, 
    // <LABEL> is the label for the badge, 
    // <MESSAGE> is the message or text to be displayed, 
    // <COLOR> is the color of the badge.
    console.log("License is ", license);
    const { display, license_name, color, href } = license;

    console.log('display', display, 'name', license_name, '\n color', color, '\n href', href);
    return `[![License](https://img.shields.io/badge/License-${license_name}-${color}.svg)](${href})\n\n`;
} ////////////// END OF createBadge


// Write user input to the README file
function writeToFile(fileName, data) {
    // THEN a high-quality, professional README.md is generated with the title of my 
    // project and sections entitled Description, Table of Contents, Installation, Usage, 
    // License, Contributing, Tests, and Questions
    // WHEN I enter my project title

    console.log(data);
    // destructure the object data
    const { title, description, installation, usage, contributors, tests, license, gitHub, email } = data;
    const { display, license_name, color, href } = license;

    // Assign user input to sections of ReadMe
    // If user input is not entered, then omit that section from README
    var titleLine = `# ${title}\n\n`;
    var descLine = `## Description\n ${description}\n\n`;
    var tableOfCon = `## Table of Contents\n\n`;
    var installLine = (installation != "None") ? `## Installation\n ${installation}\n\n` : "";
    var usageLine = (usage != "N/A") ? `## Usage\n ${usage}\n\n` : "";
    var contLine = (contributors != "N/A") ? `## Contributors\n ${contributors}\n\n` : ""
    var testsLine = (tests != "N/A") ? `## Tests\n ${tests}\n\n` : "";

    var questionsLine = '';
    if (gitHub !== "Not Defined" || email !== "Not Defined") {
        questionsLine = '## Questions\n';
        if (gitHub !== "Not Defined") {
            questionsLine += `GitHub: https://github.com/${gitHub}\n\n`;
        }
        if (email !== "Not Defined") {
            questionsLine += `Contact me with additional questions at ${email}\n\n`;
        }
    }
    // if (display!=="None"){
    //     var badgeLine = createBadge(license);
    //     var licenseLine = `## License\n This application is licensed under the ${display} license.\n See the ${badgeLine} for more information.\n\n`;
    // }
    var badgeLine = (display !== "None") ? createBadge(license) : "";

    // If user selects a license, display a badge for it
    var licenseLine = (display !== "None") ? `## License\n This application is licensed under the ${display} license.\n See the ${badgeLine} for more information.\n\n` : "";
    // This application is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
    // };

    // Make entries under table of contents if data exists for those sections
    var toc = '';
    if (installation != "") { toc += `[Installation](#installation)\n\n` };
    if (usageLine != "") { toc += `[Usage](#usage)\n\n` };
    if (contLine != "") { toc += `[Contributors](#contributors)\n\n` };
    if (licenseLine) { toc += `[License](#license)\n\n` };
    if (questionsLine != "") { toc += `[Questions](#questions)\n\n` };
    console.log("toc is ", toc);

    // Order sections of README contents
    let firstSection = titleLine + descLine + badgeLine + tableOfCon + toc + installLine + usageLine
    let lastSection = contLine + testsLine + licenseLine + questionsLine
    //console.log("Lines are are ", titleLine+descLine+installLine+usageLine+contLine);

    fs.appendFile(fileName, (firstSection + lastSection), (err) =>
        err ? console.error(err) : console.log('Success!')
    );
}


// Go the extra mile and write tests for
// Initialize app
function init() {
    // Prompt for input 
    inquirer.prompt(questions).then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));

        // Create README using user input
        writeToFile("README.md", answers);
    });

}

// Function call to initialize app
init();

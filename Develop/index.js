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
    // THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
    ////////////////////////////
    {
        type: "list",
        message: "Select one license type below",
        name: "license",
        choices: [
            {
                name: "None"
            },
            {
                name: "Apache License 2.0"
            },
            {
                name: "GNU General Public License V3.0"
            },
            {
                name: "MIT License"
            },
            {
                name: "BSD 2-Clause Simplified License"
            },
            {
                name: "BSD 3-Clause New or Revised License"
            },
            {
                name: "Boost Software License"
            },
            {
                name: "Creative Commons Zero v1.0 Universal"
            },
            {
                name: "Eclipse Public License 2.0"
            },
            {
                name: "GNU Affero General Public License v3.0"
            },
            {
                name: "GNU General Public License v2.0"
            },
            {
                name: "GNU Lesser General Public License v2.1"
            },
            {
                name: "Mozilla Public License 2.0"
            },
            {
                name: "The Unlicense"
            },
        ],
        validate: function (answer) {
            if (answer.length < 1) {
                return "You must choose at least one license.";
            }
            return true;
            // uncoment the below code after testing licenses and badges
            // } else if (answer.length > 1) {
            //     return "You can only choose one license."
            // }
            // return true;
        }
    },

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
    // THEN a high-quality, professional README.md is generated with the title of my 
    // project and sections entitled Description, Table of Contents, Installation, Usage, 
    // License, Contributing, Tests, and Questions
    // WHEN I enter my project title
]
function createBadge(license) {
    //[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
    // The badge URL format for Shields.io is https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>.svg, 
    // <LABEL> is the label for the badge, 
    // <MESSAGE> is the message or text to be displayed, 
    // <COLOR> is the color of the badge.
    // Determine message
    console.log("License is ", license);
    var message = ""
    const url1 = `https://img.shields.io/badge/License`;
    const url2 = `https://opensource.org/licenses/`;

    //https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba

    // get badge
    // Source is from https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
    switch (license) {
        case "Apache License 2.0":
            message = "Apache%202.0"
            return `[![License: ${message}](${url1}-${message}-blue.svg)](${url2}Apache-2-0)\n\n`
            //https://img.shields.io/badge/License-Apache%202.0-blue.svg
        case "GNU General Public License V3.0":
            message = "GPLv3";
            return `[![License: ${message}](${url1}-${message}-blue.svg)](${url2}GPL-3.0)\n\n`;
        case "MIT License":
            message = "MIT"
            return `[![License: ${license}](${url1}-${message}-yellow.svg)](${url2}MIT)\n\n`
        case "BSD 2-Clause Simplified License":
            message = "";
            return `[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)\n\n`
        // name: "GNU General Public License V3.0"
        //     name: "BSD 2-Clause Simplified License"
        case "BSD 3-Clause New or Revised License":
            message = "";
            return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)\n\n`
        //     name: "BSD 3-Clause New or Revised License"
        //     name: "Boost Software License"
        case "Boost Software License":
            message = "Boost_1.0";
            return `[![License: ${license}](${url1}-${message}-yellow.svg)](https://www.boost.org/LICENSE_1_0.txt)\n\n`
        //     name: "Creative Commons Zero v1.0 Universal"
        case "Creative Commons Zero v1.0 Universal":
            message = "";
            return `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)\n\n`;
        //     name: "Eclipse Public License 2.0"
        case "Eclipse Public License 2.0":
            message = "";
            return `[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)\n\n`;
        //     name: "GNU Affero General Public License v3.0"
        case "GNU Affero General Public License v3.0":
            message = "";
            return `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)\n\n`;
        //     name: "GNU General Public License v2.0"
        case "GNU General Public License v2.0":
            message = "";
            return `[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)\n\n`;
        //     name: "GNU Lesser General Public License v2.1"
        case "GNU Lesser General Public License v2.1":
            message = "";
            return `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)\n\n`;
        //     name: "Mozilla Public License 2.0"
        case "Mozilla Public License 2.0":
            message = "";
            return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)\n\n`;
        //     name: "The Unlicense"
        case "The Unlicense":
            message = "";
            return `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)\n\n`;
        default:
            console.log("no license selected");
        // to encode URL, use %20 to replace a space and -- to replace a hyphen
        //                  name: "None"
        //message = Apache%202.0      name: "Apache License 2.0"
        //message = GPL%203.0        name: "GNU General Public License V3.0"
        //message = MIT     name: "MIT License"
        //     name: "BSD 2-Clause Simplified License"
        //     name: "BSD 3-Clause New or Revised License"
        //     name: "Boost Software License"
        //     name: "Creative Commons Zero v1.0 Universal"
        //     name: "Eclipse Public License 2.0"
        //     name: "GNU Affero General Public License v3.0"
        //     name: "GNU General Public License v2.0"
        //     name: "GNU Lesser General Public License v2.1"
        //     name: "Mozilla Public License 2.0"
        //     name: "The Unlicense"
    }
    console.log("licenseLine is ", licenseLine);
    return licenseLine;
    //     var badgeAPI = `https://img.shields.io/badge/License-${license}-green.svg`;
    //     //https://img.shields.io/badge/License-{LICENSE_TYPE}-green.svg
    //     console.log("API is ", badgeAPI);
    //     fetch(badgeAPI)
    //         .then(function (response) {
    //             if (response.ok) {
    //                 response.json().then(function (data) {
    //                     console.log("Badge is", data)
    //                 });
    //             };
    //         });
};
//<URL>&style<STYLE>https://img.shields.io/endpoint?url=<URL>&style<STYLE>

// https://img.shields.io/endpoint?url=<URL>&style<STYLE></STYLE>}
// [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]
// //(https://opensource.org/licenses/MIT)

// This application is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
// };
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data);
    // destructure the object data
    const { title, description, installation, usage, contributors, tests, license, gitHub, email } = data;

    // if (installation != "N/A") {
    //     installationLine = `## Installation\n ${installation}\n\n`;
    // }
    // Try to use new fancy if then
    var installationLine = (installation != "N/A") ? `## Installation\n ${installation}\n\n` : "";

    // Assign the sections of ReadMe to the user input
    // If user input is not entered, then omit that section from README
    var titleLine = `# ${title}\n\n`;
    var desciptionLine = `## Description\n ${description}\n\n`;
    var tableOfContents = `## Table of Contents\n\n`;
    var installationLine = (installation != "None") ? `## Installation\n ${installation}\n\n` : "";
    var usageLine = (usage != "N/A") ? `## Usage\n ${usage}\n\n` : "";
    var contributorLine = (contributors != "N/A") ? `## Contributors\n ${contributors}\n\n` : ""
    var testsLine = (tests != "N/A") ? `## Tests\n ${tests}\n\n` : "";
      var questionsLine = (gitHub != "Not Defined" | email != "Not Defined") 
    ? `## Questions\n GitHub: ${gitHub}\n Contact me with additional questions at ${email}`
    : "";
    let licenseLine = `## License\n ${license}\n\n`;
    var badgeLine = (license != "N/A") ? createBadge(license) : "";
    //[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

    var tableContents;
    // - [Installation](#installation)
    // - [Usage](#usage)
    // - [Contributors](#Contributors)
    // - [License](#license)
    // - [GitHub]
    // - [Email]
    // filter through data 
    // if a section is N/A, then exclude it from the table of contents

    // Order the sections of our README contents
    let firstSection = titleLine + desciptionLine + badgeLine + tableOfContents + installationLine + usageLine
    let lastSection = contributorLine + testsLine + licenseLine + questionsLine
    //console.log("Lines are are ", titleLine+desciptionLine+installationLine+usageLine+contributorLine);

    fs.appendFile(fileName, (firstSection + lastSection), (err) =>
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
        writeToFile("README.md", answers);
    });

}

// Function call to initialize app
init();
// var license = "MIT"
// var badge = "";
// createBadge(license, badge);

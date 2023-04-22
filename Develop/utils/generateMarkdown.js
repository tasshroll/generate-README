// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  // Badge URL format: https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>.svg, 
  // <LABEL> is the label for the badge, 
  // <MESSAGE> is the message or text to be displayed, 
  // <COLOR> is the color of the badge.
  const { display, license_name, color, href } = license;
  //console.log('display', display, 'name', license_name, '\n color', color, '\n href', href);
  return `[![License](https://img.shields.io/badge/License-${license_name}-${color}.svg)](${href})`;
} ////////////// END OF renderLicenseBadge


// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  // If user selects a license, display a badge for it
  const { display, license_name, color, href } = license;

  var result = (display !== "n/a") ? `## License\n This application is licensed under the ${display} license. \n\n See the license for more information.\n\n` : "";
  return (result);
}
// This application is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
// };

// Create a graphic license badge

function renderLicenseBadge(license) {
  // Badge URL format: https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>.svg, 
  // <LABEL> is the label for the badge, 
  // <MESSAGE> is the message or text to be displayed, 
  // <COLOR> is the color of the badge.
  const { display, license_name, color, href } = license;
  var badgeLine = (display !== "n/a") ? `[![License](https://img.shields.io/badge/License-${license_name}-${color}.svg)](${href})` : "";

  //console.log('display', display, 'name', license_name, '\n color', color, '\n href', href);
  return (badgeLine);
} ////////////// END OF renderLicenseBadge

// Create sections of the README
function generateMarkdown(data) {
  // Write user input to the README file
  // THEN a high-quality, professional README.md is generated with the title of my 
  // project and sections entitled Description, Table of Contents, Installation, Usage, 
  // License, Contributing, Tests, and Questions

  // destructure the object data received from user input
  const { title, description, installation, usage, contributors, tests, license, gitHub, email } = data;

  // Assign user input to sections of ReadMe
  var titleLine = `# ${title}\n\n`;
  var descLine = `## Description\n ${description}\n\n`;
  var tableOfCon = `## Table of Contents\n\n`;
  // If user input is missing, omit these section from README
  var installLine = (installation != "N/A") ? `## Installation\n ${installation}\n\n` : "";
  var usageLine = (usage != "N/A") ? `## Usage\n ${usage}\n\n` : "";
  var contLine = (contributors != "N/A") ? `## Contributors\n ${contributors}\n\n` : ""
  var testsLine = (tests != "N/A") ? `## Tests\n ${tests}\n\n` : "";
  //Create Questions section if gitHub or email is entered
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

  
  var badgeLine = renderLicenseBadge(license);
  // If user selects a license, display a badge for it
  var licenseLine = renderLicenseSection(license);
  //var licenseLine = (display !== "n/a") ? `## License\n This application is licensed under the ${display} license. \n\n See the ${badgeLine} for more information.\n\n` : "";
  // This application is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
  // };

  // Make entries under table of contents if data exists for those sections
  var toc = '';
  if (installLine != "") { toc += `[Installation](#installation)\n\n` };
  if (usageLine != "") { toc += `[Usage](#usage)\n\n` };
  if (contLine != "") { toc += `[Contributors](#contributors)\n\n` };
  if (testsLine != "") { toc += `[Tests](#tests)\n\n` };
  if (licenseLine) { toc += `[License](#license)\n\n` };
  if (questionsLine != "") { toc += `[Questions](#questions)\n\n` };
  console.log("toc is ", toc);

  // Order sections of README contents
  let markdown = titleLine + descLine + badgeLine + '\n\n' + tableOfCon + toc + installLine + usageLine + contLine + testsLine + licenseLine + questionsLine
  //console.log("Lines are are ", titleLine+descLine+installLine+usageLine+contLine);

  return (markdown);
  //   return `# ${data.title}

  // `;
}



module.exports = generateMarkdown;

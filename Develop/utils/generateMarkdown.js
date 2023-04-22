// Create a badge based on the license passed in
function renderLicenseBadge(license) {
  // Badge URL format: https://img.shields.io/badge/<LABEL>-<MESSAGE>-<COLOR>.svg, 
  // These details are in license object created in questions array of index.js
  // Destructure license object
  const { message, color, href } = license;
  //console.log('licenseName', licenseName, 'name', message, '\n color', color, '\n href', href);
  // If there is no license, return an empty string
  return `[![License](https://img.shields.io/badge/License-${message}-${color}.svg)](${href})\n\n`;
}


// Return license section of README
function renderLicenseSection(license) {
  // If user selects a license, display a badge for it
  //If there is no license, return an empty string
  // Destructure the license object to get licenseName
  const { licenseName } = license;
  return ((licenseName !== "n/a") ? `## License\n This application is licensed under ${licenseName}. \n\n Click license badge for more information.\n\n` : "");
}

// Create sections of the README
function generateMarkdown(data) {
  // destructure object data from user input
  const { title, description, installation, usage, contributors, tests, license, gitHub, email } = data;

  // Create sections of ReadMe
  // Include title of project, Description, Table of Contents, Installation, Usage, 
  // License, Contributors, Tests, and Questions
  var titleLine = `# ${title}\n\n`;
  var descLine = `## Description\n ${description}\n\n`;
  var tableOfCon = `## Table of Contents\n\n`;
  // Omit these section from README if user input is missing, 
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
  var licenseLine = renderLicenseSection(license);

  // Build table of contents if sections were created above
  var toc = '';
  if (installLine != "") { toc += `[Installation](#installation)\n\n` };
  if (usageLine != "") { toc += `[Usage](#usage)\n\n` };
  if (contLine != "") { toc += `[Contributors](#contributors)\n\n` };
  if (testsLine != "") { toc += `[Tests](#tests)\n\n` };
  if (licenseLine) { toc += `[License](#license)\n\n` };
  if (questionsLine != "") { toc += `[Questions](#questions)\n\n` };

  // return ordered sections of README contents
  return (titleLine + descLine + badgeLine + tableOfCon + toc + installLine + usageLine + contLine + testsLine + licenseLine + questionsLine);
}

module.exports = generateMarkdown;

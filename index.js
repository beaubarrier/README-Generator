// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// TODO: Create an array of questions for user input
const writeFileAsync = util.promisify(fs.writeFile);
const licBadges = [
    { name: 'Apache License 2.0', badge: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)` },
    { name: 'Boost Software License 1.0', badge: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)` },
    { name: 'BSD 3-Clause License', badge: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)` },
    { name: 'BSD 2-Clause License', badge: `[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)` },
    { name: 'CC0', badge: `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)` },
    { name: 'Attribution 4.0 International', badge: `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)` },
    { name: 'Attribution-ShareAlike 4.0 International', badge: `[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)` },
    { name: 'Attribution-NonCommercial 4.0 International', badge: `[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)` },
    { name: 'Attribution-NoDerivates 4.0 International', badge: `[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)` },
    { name: 'Attribution-NonCommmercial-ShareAlike 4.0 International', badge: `[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)` },
    { name: 'Eclipse Public License 1.0', badge: `[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)` },
    { name: 'GNU GPL v3', badge: `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)` },
    { name: 'GNU GPL v2', badge: `[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)` },
    { name: 'GNU AGPL v3', badge: ` [![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)` },
    { name: 'GNU LGPL v3', badge: `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)` },
    { name: 'GNU FDL v1.3', badge: ` [![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)` },
    { name: 'IBM Public License Version 1.0', badge: ` [![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)` },
    { name: 'ISC License (ISC)', badge: `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)` },
    { name: 'The MIT License', badge: `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)` },
    { name: 'Mozilla Public License 2.0', badge: `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)` },
    { name: 'Attribution License (BY)', badge: `[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)` },
    { name: 'Open Database License (ODbL)', badge: `[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)` },
    { name: 'Public Domain Dedication and License (PDDL)', badge: ` [![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)` },
    { name: 'The Perl License', badge: `[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)` },
    { name: 'The Artistic License 2.0', badge: `[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)` },
    { name: 'SIL Open Font License 1.1', badge: `[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)` },
    { name: 'The Unlicense', badge: `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)` },
    { name: 'The Do What the Fuck You Want to Public License', badge: `[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)` },
    { name: 'The zlib/libpng License', badge: `[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)` },
]

const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "Please enter a title for your application.",
            name: 'title',
        },
        {
            type: 'list',
            message: "Select a license.",
            choices: [...licBadges],
            name: 'license'
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
            message: "Please enter a description of how to contribute to the application.",
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
            message: "Please enter any additional information on how to pose questions.",
            name: 'questions',
        },
    ]);
}

// TODO: Create a function to write README file
const writeToFile = (data) =>

    `
${data.title}
=============
${licBadges.find((b) => b.name === data.license).badge}
<br>
<br>

#### Table of Contents
- [Description](#description)
- [Installation Instructions](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Testing](#testing)
- [Questions](#questions)
<br>
<br>
<br>
<br>

Description
-----------
${data.description}
<br>
<br>
<br>
<br>


Installation
------------
${data.installation}
<br>
<br>
<br>
<br>


Usage
-----
${data.usage}
<br>
<br>
<br>
<br>


Contribution
------------
${data.contribution}
<br>
<br>
<br>
<br>

Testing
-------
${data.test}
<br>
<br>
<br>
<br>

Questions
---------
Email Address: <a href="mailto:${data.email}">${data.email}</a>
GitHub User Name:<a href="https://github.com/${data.github}>${data.github}</a>
<br>
${data.questions}
<br>
`

// TODO: Create a function to initialize app
function init() {

    questions()
        .then((data) => writeFileAsync('README.md', writeToFile(data)))
        .then(() => console.log('Congrats! You have successfully created a README.md file!'))
        .catch((err) => console.error(err));
};

// Function call to initialize app
init();

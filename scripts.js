var _a, _b, _c, _d;
// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    var form = document.getElementById('resume-form');
    var formData = new FormData(form);
    var name = formData.get('name');
    var email = formData.get('email');
    var phone = formData.get('phone');
    var address = formData.get('address');
    // Get education data
    var educationItems = Array.from(document.querySelectorAll('.education-item'));
    var education = educationItems.map(function (item) {
        var institution = item.querySelector('.edu-institution').value;
        var degree = item.querySelector('.edu-degree').value;
        var years = item.querySelector('.edu-years').value;
        return { institution: institution, degree: degree, years: years };
    });
    // Get work experience data
    var experienceItems = Array.from(document.querySelectorAll('.experience-item'));
    var experience = experienceItems.map(function (item) {
        var company = item.querySelector('.exp-company').value;
        var role = item.querySelector('.exp-role').value;
        var years = item.querySelector('.exp-years').value;
        return { company: company, role: role, years: years };
    });
    // Get skills data
    var skills = Array.from(document.querySelectorAll('.skill')).map(function (skill) { return skill.value; });
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        education: education,
        experience: experience,
        skills: skills
    };
    generateResume(resumeData);
}
// Function to generate resume
function generateResume(data) {
    var resumeOutput = document.getElementById('resume-output');
    resumeOutput.innerHTML = "\n        <h2>Resume</h2>\n        <h3>".concat(data.name, "</h3>\n        <p>Email: ").concat(data.email, "</p>\n        <p>Phone: ").concat(data.phone || 'N/A', "</p>\n        <p>Address: ").concat(data.address || 'N/A', "</p>\n\n        <h3>Education</h3>\n        ").concat(data.education.map(function (edu) { return "\n            <p>".concat(edu.degree, " from ").concat(edu.institution, " (").concat(edu.years, ")</p>\n        "); }).join(''), "\n\n        <h3>Work Experience</h3>\n        ").concat(data.experience.map(function (exp) { return "\n            <p>".concat(exp.role, " at ").concat(exp.company, " (").concat(exp.years, ")</p>\n        "); }).join(''), "\n\n        <h3>Skills</h3>\n        <ul>\n            ").concat(data.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n        </ul>\n    ");
}
// Add event listeners
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleFormSubmission);
(_b = document.getElementById('add-education')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var container = document.getElementById('education-container');
    container.insertAdjacentHTML('beforeend', "\n        <div class=\"education-item\">\n            <label for=\"edu-institution\">Institution:</label>\n            <input type=\"text\" class=\"edu-institution\" required><br>\n\n            <label for=\"edu-degree\">Degree:</label>\n            <input type=\"text\" class=\"edu-degree\" required><br>\n\n            <label for=\"edu-years\">Years:</label>\n            <input type=\"text\" class=\"edu-years\" required><br>\n        </div>\n    ");
});
(_c = document.getElementById('add-experience')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var container = document.getElementById('experience-container');
    container.insertAdjacentHTML('beforeend', "\n        <div class=\"experience-item\">\n            <label for=\"exp-company\">Company:</label>\n            <input type=\"text\" class=\"exp-company\" required><br>\n\n            <label for=\"exp-role\">Role:</label>\n            <input type=\"text\" class=\"exp-role\" required><br>\n\n            <label for=\"exp-years\">Years:</label>\n            <input type=\"text\" class=\"exp-years\" required><br>\n        </div>\n    ");
});
(_d = document.getElementById('add-skill')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () {
    var container = document.getElementById('skills-container');
    container.insertAdjacentHTML('beforeend', "\n        <input type=\"text\" class=\"skill\" placeholder=\"Skill\" required><br>\n    ");
});
var phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', formatPhoneNumber);
function formatPhoneNumber(event) {
    var input = event.target;
    var value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.startsWith('92')) {
        value = '+' + value;
    }
    if (value.length > 2) {
        value = value.slice(0, 3) + ' ' + value.slice(3);
    }
    if (value.length > 8) {
        value = value.slice(0, 8) + ' ' + value.slice(8);
    }
    input.value = value;
}

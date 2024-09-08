interface Education {
    institution: string;
    degree: string;
    years: string;
}

interface WorkExperience {
    company: string;
    role: string;
    years: string;
}

interface ResumeData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    education: Education[];
    experience: WorkExperience[];
    skills: string[];
}

// Handle form submission
function handleFormSubmission(event: Event): void {
    event.preventDefault();

    const form = document.getElementById('resume-form') as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    // Get education data
    const educationItems = Array.from(document.querySelectorAll('.education-item')) as HTMLDivElement[];
    const education: Education[] = educationItems.map(item => {
        const institution = (item.querySelector('.edu-institution') as HTMLInputElement).value;
        const degree = (item.querySelector('.edu-degree') as HTMLInputElement).value;
        const years = (item.querySelector('.edu-years') as HTMLInputElement).value;
        return { institution, degree, years };
    });

    // Get work experience data
    const experienceItems = Array.from(document.querySelectorAll('.experience-item')) as HTMLDivElement[];
    const experience: WorkExperience[] = experienceItems.map(item => {
        const company = (item.querySelector('.exp-company') as HTMLInputElement).value;
        const role = (item.querySelector('.exp-role') as HTMLInputElement).value;
        const years = (item.querySelector('.exp-years') as HTMLInputElement).value;
        return { company, role, years };
    });

    // Get skills data
    const skills = Array.from(document.querySelectorAll('.skill')).map(skill => (skill as HTMLInputElement).value);

    const resumeData: ResumeData = {
        name,
        email,
        phone,
        address,
        education,
        experience,
        skills
    };

    generateResume(resumeData);
}

// Function to generate resume
function generateResume(data: ResumeData): void {
    const resumeOutput = document.getElementById('resume-output') as HTMLDivElement;

    resumeOutput.innerHTML = `
        <h2>Resume</h2>
        <h3>${data.name}</h3>
        <p>Email: ${data.email}</p>
        <p>Phone: ${data.phone || 'N/A'}</p>
        <p>Address: ${data.address || 'N/A'}</p>

        <h3>Education</h3>
        ${data.education.map(edu => `
            <p>${edu.degree} from ${edu.institution} (${edu.years})</p>
        `).join('')}

        <h3>Work Experience</h3>
        ${data.experience.map(exp => `
            <p>${exp.role} at ${exp.company} (${exp.years})</p>
        `).join('')}

        <h3>Skills</h3>
        <ul>
            ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;
}

// Add event listeners
document.getElementById('resume-form')?.addEventListener('submit', handleFormSubmission);

document.getElementById('add-education')?.addEventListener('click', () => {
    const container = document.getElementById('education-container') as HTMLDivElement;
    container.insertAdjacentHTML('beforeend', `
        <div class="education-item">
            <label for="edu-institution">Institution:</label>
            <input type="text" class="edu-institution" required><br>

            <label for="edu-degree">Degree:</label>
            <input type="text" class="edu-degree" required><br>

            <label for="edu-years">Years:</label>
            <input type="text" class="edu-years" required><br>
        </div>
    `);
});

document.getElementById('add-experience')?.addEventListener('click', () => {
    const container = document.getElementById('experience-container') as HTMLDivElement;
    container.insertAdjacentHTML('beforeend', `
        <div class="experience-item">
            <label for="exp-company">Company:</label>
            <input type="text" class="exp-company" required><br>

            <label for="exp-role">Role:</label>
            <input type="text" class="exp-role" required><br>

            <label for="exp-years">Years:</label>
            <input type="text" class="exp-years" required><br>
        </div>
    `);
});

document.getElementById('add-skill')?.addEventListener('click', () => {
    const container = document.getElementById('skills-container') as HTMLDivElement;
    container.insertAdjacentHTML('beforeend', `
        <input type="text" class="skill" placeholder="Skill" required><br>
    `);
});
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', formatPhoneNumber);

function formatPhoneNumber(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    
    if (value.startsWith('92')) {
        value = '+' + value;
    }
    
    if (value.length > 2) {
        value = value.slice(0, 3) + ' ' + value.slice(3);
    }
    
    if (value.length > 3) {
        value = value.slice(0, 8) + ' ' + value.slice(8);
    }
    
    input.value = value;
}

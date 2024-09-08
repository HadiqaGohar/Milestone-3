document.addEventListener('DOMContentLoaded', () => {
    const addSkillButton = document.getElementById('addSkillButton');
    const skillsContainer = document.getElementById('skillsContainer');

    // Add event listener to the "Add Another Skill" button
    addSkillButton.addEventListener('click', () => {
        // Create a new container for the skill input and remove button
        const skillContainer = document.createElement('div');
        skillContainer.className = 'flex items-center space-x-4';

        // Create new skill input field
        const newSkillInput = document.createElement('input');
        newSkillInput.type = 'text';
        newSkillInput.name = 'skills[]';
        newSkillInput.placeholder = 'Enter a skill';
        newSkillInput.required = true;
        newSkillInput.className = 'mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3 bg-gray-50 border-2 border-gray-200';

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'text-red-500 hover:text-red-700';
        removeButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
        removeButton.addEventListener('click', () => {
            skillContainer.remove();
        });

        // Append input field and remove button to the skill container
        skillContainer.appendChild(newSkillInput);
        skillContainer.appendChild(removeButton);

        // Append the new skill container to the skillsContainer
        skillsContainer.appendChild(skillContainer);
    });
});

// Function to remove a skill input field
function removeSkill(button) {
    button.parentElement.remove();
}
document.addEventListener('DOMContentLoaded', () => {
    const addSkillButton = document.getElementById('addSkillButton');
    const skillsContainer = document.getElementById('skillsContainer');
    const resumeForm = document.getElementById('resumeForm');
    const { jsPDF } = window.jspdf;

    // Add event listener to the "Add Another Skill" button
    addSkillButton.addEventListener('click', () => {
        // Create a new container for the skill input and remove button
        const skillContainer = document.createElement('div');
        skillContainer.className = 'flex items-center space-x-4';

        // Create new skill input field
        const newSkillInput = document.createElement('input');
        newSkillInput.type = 'text';
        newSkillInput.name = 'skills[]';
        newSkillInput.placeholder = 'Enter a skill';
        newSkillInput.required = true;
        newSkillInput.className = 'mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3 bg-gray-50 border-2 border-gray-200';

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.className = 'text-red-500 hover:text-red-700';
        removeButton.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        `;
        removeButton.addEventListener('click', () => {
            skillContainer.remove();
        });

        // Append input field and remove button to the skill container
        skillContainer.appendChild(newSkillInput);
        skillContainer.appendChild(removeButton);

        // Append the new skill container to the skillsContainer
        skillsContainer.appendChild(skillContainer);
    });

    // Handle form submission and generate PDF
    resumeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = Array.from(document.querySelectorAll('input[name="skills[]"]')).map(input => input.value).join(', ');

        // Add content to PDF
        doc.setFontSize(16);
        doc.text(`Name: ${firstName} ${lastName}`, 10, 10);
        doc.text(`Email: ${email}`, 10, 20);
        doc.text(`Education: ${education}`, 10, 30);
        doc.text(`Experience: ${experience}`, 10, 40);
        doc.text(`Skills: ${skills}`, 10, 50);

        // Save the PDF
        doc.save('resume.pdf');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');

    form.addEventListener('input', updatePreview);

    function updatePreview() {
        const firstName = document.getElementById('firstName').value || 'John';
        const lastName = document.getElementById('lastName').value || 'Doe';
        const email = document.getElementById('email').value || 'example@example.com';
        const education = document.getElementById('education').value || 'Your degree';
        const experience = document.getElementById('experience').value || 'Describe your work experience';

        const skills = Array.from(document.querySelectorAll('input[name="skills[]"]'))
            .map(input => input.value)
            .filter(skill => skill.trim() !== '');

        resumePreview.innerHTML = `
            <h2 class="text-2xl font-semibold mb-4">${firstName} ${lastName}</h2>
            <p class="text-lg mb-2"><strong>Email:</strong> ${email}</p>
            <p class="text-lg mb-2"><strong>Education:</strong> ${education}</p>
            <p class="text-lg mb-2"><strong>Experience:</strong> ${experience}</p>
            <div class="mt-4">
                <h3 class="text-xl font-semibold mb-2">Skills</h3>
                <ul class="list-disc list-inside">
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Add functionality to generate PDF from the preview
    document.querySelector('button[type="submit"]').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the form from submitting
        
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text('Dynamic Resume Builder', 10, 10);
        doc.text(`Name: ${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`, 10, 20);
        doc.text(`Email: ${document.getElementById('email').value}`, 10, 30);
        doc.text(`Education: ${document.getElementById('education').value}`, 10, 40);
        doc.text(`Experience: ${document.getElementById('experience').value}`, 10, 50);

        let y = 60;
        const skills = Array.from(document.querySelectorAll('input[name="skills[]"]'))
            .map(input => input.value)
            .filter(skill => skill.trim() !== '');

        if (skills.length > 0) {
            doc.text('Skills:', 10, y);
            y += 10;
            skills.forEach(skill => {
                doc.text(`- ${skill}`, 10, y);
                y += 10;
            });
        }

        doc.save('resume.pdf');
    });
});

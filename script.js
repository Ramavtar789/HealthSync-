// Symptom data with enhanced structure (merged with index.html's data)
const symptoms = {
    "Headache": {
        conditions: "Dehydration, Tension",
        advice: "Drink water, rest.",
        video: "https://www.youtube.com/embed/WAYBYjS1A4k",
        link: "https://www.practo.com/general-physician",
        severity: ["Moderate", "Moderate", "Mild", "Moderate", "Moderate"] // Align with index.html
    },
    "Fever": {
        conditions: "Cold, Flu",
        advice: "Monitor temp, hydrate.",
        video: "https://www.youtube.com/embed/GOwV4TcUuI8",
        link: "https://www.apollo247.com/specialties/general-physician",
        severity: ["Severe", "Moderate", "Mild", "Moderate", "Moderate", "Mild", "Mild"]
    },
    "Cough": {
        conditions: "Cold, Allergies",
        advice: "Try honey, steam.",
        video: "https://www.youtube.com/embed/gkz2DB5CLGQ",
        link: "https://www.practo.com/chest-surgeon",
        severity: ["Moderate", "Moderate", "Moderate", "Mild", "Mild"]
    },
    "Sore Throat": {
        conditions: "Viral infection, allergy",
        advice: "Warm fluids, lozenges",
        video: "https://www.youtube.com/embed/LxGdo8dZqgU",
        link: "https://www.practo.com/ent-specialist",
        severity: ["Moderate", "Moderate", "Mild", "Mild", "Moderate"]
    },
    "Nausea": {
        conditions: "Food poisoning, motion sickness",
        advice: "Rest, ginger tea, light meals",
        video: "https://www.youtube.com/embed/tdtw5e5XQpE",
        link: "https://www.apollo247.com/specialties/gastroenterologist",
        severity: ["Moderate", "Moderate", "Mild"]
    },
    "Fatigue": {
        conditions: "Anemia, stress, sleep disorder",
        advice: "Rest, hydrate, consider a checkup",
        video: "https://www.youtube.com/embed/2dz7IFMRsPM",
        link: "https://www.practo.com/general-physician",
        severity: ["Moderate", "Moderate", "Moderate", "Moderate", "Moderate"]
    },
    "Stomach Ache": {
        conditions: "Indigestion, gas, cramps",
        advice: "Warm compress, avoid spicy food",
        video: "https://www.youtube.com/embed/1nFBsWcQHUY",
        link: "https://www.apollo247.com/specialties/gastroenterologist",
        severity: ["Moderate", "Mild", "Mild", "Moderate", "Mild"]
    },
    "Diarrhea": {
        conditions: "Infection, food intolerance",
        advice: "Rehydrate, bland food",
        video: "https://www.youtube.com/embed/5Cy8iGd9m6Q",
        link: "https://www.practo.com/gastroenterologist",
        severity: ["Moderate", "Moderate", "Mild", "Severe", "Moderate"]
    },
    "Back Pain": {
        conditions: "Muscle strain, poor posture",
        advice: "Stretch, rest, apply heat/ice",
        video: "https://www.youtube.com/embed/9fzc5h3jk5Q",
        link: "https://www.apollo247.com/specialties/orthopedic",
        severity: ["Moderate", "Mild"]
    },
    "Dizziness": {
        conditions: "Low BP, dehydration, anxiety",
        advice: "Sit down, drink water",
        video: "https://www.youtube.com/embed/Tl4W5e5XQpE",
        link: "https://www.practo.com/neurologist",
        severity: ["Moderate", "Moderate", "Mild"]
    }
};

// Navigation functions
function showSymptomChecker() {
    toggleSection('symptom-checker');
}

function showMedicationReminder() {
    toggleSection('medication-reminder');
}

function showMedicineInfo() {
    toggleSection('medicine-info');
}

function showPersonalizedHealth() {
    toggleSection('personalized-health');
}

function goBack() {
    toggleSection('home');
}

function toggleSection(sectionId) {
    const sections = ['home', 'symptom-checker', 'medication-reminder', 'medicine-info', 'personalized-health'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.toggle('hidden', id !== sectionId);
            if (id === sectionId) section.classList.add('fade-in');
            else section.classList.remove('fade-in');
        } else {
            console.error(`Section not found: ${id}`);
        }
    });
}

// Enhanced Symptom Checker
function checkSymptom() {
    const symptomSelect = document.getElementById('symptom-select');
    const resultDiv = document.getElementById('symptom-result');
    const symptom = symptomSelect.value;

    if (symptom && symptoms[symptom]) {
        const data = symptoms[symptom];
        const hasSevere = data.severity.includes("Severe");
        const hasModerate = data.severity.includes("Moderate");
        let guidance = "";

        if (hasSevere) {
            guidance = "<p><strong>Where to Go:</strong> Seek immediate medical attention at a hospital or call emergency services if symptoms worsen rapidly.</p>";
        } else if (hasModerate) {
            guidance = "<p><strong>Where to Go:</strong> Consult a doctor or visit a clinic for evaluation if symptoms persist or worsen.</p>";
        } else {
            guidance = "<p><strong>Where to Go:</strong> Manage at home with rest and hydration, but see a doctor if symptoms don’t improve.</p>";
        }

        resultDiv.innerHTML = `
            <h3>${symptom} Insights:</h3>
            <p><strong>Possible causes:</strong> ${data.conditions}</p>
            <p><strong>Advice:</strong> ${data.advice}</p>
            <iframe width="300" height="170" src="${data.video}" frameborder="0" allowfullscreen></iframe>
            <p><a href="${data.link}" target="_blank">Book a doctor</a></p>
            ${guidance}
            <p><em>Informational purposes only. Consult a healthcare professional.</em></p>
        `;
    } else {
        resultDiv.textContent = "Please select a symptom.";
    }
}

// Enhanced Medication Reminder with Persistence
let medications = JSON.parse(localStorage.getItem('medications')) || [];

function addMedication() {
    const name = document.getElementById('med-name').value.trim();
    const time = document.getElementById('med-time').value.trim();
    const list = document.getElementById('med-list');

    if (name && time) {
        const entry = { name, time, date: new Date().toISOString().split('T')[0] };
        medications.push(entry);
        localStorage.setItem('medications', JSON.stringify(medications));

        const item = document.createElement('li');
        item.textContent = `${name} - ${time}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            medications = medications.filter(m => m.name !== name || m.time !== time);
            localStorage.setItem('medications', JSON.stringify(medications));
            item.remove();
        };
        item.appendChild(deleteBtn);
        list.appendChild(item);

        document.getElementById('med-name').value = '';
        document.getElementById('med-time').value = '';
        alert("Reminder added! (Note: Browser notifications not set up yet.)");
        setupNotification(name, time);
    } else {
        alert("Please enter both medication name and time.");
    }
}

function loadMedications() {
    const list = document.getElementById('med-list');
    list.innerHTML = '';
    medications.forEach(med => {
        const item = document.createElement('li');
        item.textContent = `${med.name} - ${med.time}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            medications = medications.filter(m => m.name !== med.name || m.time !== med.time);
            localStorage.setItem('medications', JSON.stringify(medications));
            item.remove();
        };
        item.appendChild(deleteBtn);
        list.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', loadMedications);

// Basic Notification Setup (Browser permission required)
function setupNotification(name, time) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const [hours, minutes] = time.split(':');
        const now = new Date();
        const notifyTime = new Date(now.setHours(hours, minutes, 0, 0));
        if (notifyTime > now) {
            setTimeout(() => {
                new Notification(`Reminder: ${name}`, { body: 'Time to take your medication!' });
            }, notifyTime - now);
        }
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') setupNotification(name, time);
        });
    }
}

// Medicine Information
function searchMedicine() {
    const query = document.getElementById('medicine-search').value.trim();
    if (query) {
        window.open(`https://www.webmd.com/search/search_results/default.aspx?query=${encodeURIComponent(query)}`, '_blank');
    } else {
        alert("Please enter a medicine name.");
    }
}
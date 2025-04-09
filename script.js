const symptoms = {
    "Headache": {
        conditions: "Dehydration, Tension",
        advice: "Drink water, rest.",
        video: "https://www.youtube.com/embed/WAYBYjS1A4k",
        link: "https://www.practo.com/general-physician"
    },
    "Fever": {
        conditions: "Cold, Flu",
        advice: "Monitor temp, hydrate.",
        video: "https://www.youtube.com/embed/GOwV4TcUuI8",
        link: "https://www.apollo247.com/specialties/general-physician"
    },
    "Cough": {
        conditions: "Cold, Allergies",
        advice: "Try honey, steam.",
        video: "https://www.youtube.com/embed/gkz2DB5CLGQ",
        link: "https://www.practo.com/chest-surgeon"
    },
    "Sore Throat": {
        conditions: "Viral infection, allergy",
        advice: "Warm fluids, lozenges",
        video: "https://www.youtube.com/embed/LxGdo8dZqgU",
        link: "https://www.practo.com/ent-specialist"
    },
    "Nausea": {
        conditions: "Food poisoning, motion sickness",
        advice: "Rest, ginger tea, light meals",
        video: "https://www.youtube.com/embed/tdtw5e5XQpE",
        link: "https://www.apollo247.com/specialties/gastroenterologist"
    },
    "Fatigue": {
        conditions: "Anemia, stress, sleep disorder",
        advice: "Rest, hydrate, consider a checkup",
        video: "https://www.youtube.com/embed/2dz7IFMRsPM",
        link: "https://www.practo.com/general-physician"
    },
    "Stomach Ache": {
        conditions: "Indigestion, gas, cramps",
        advice: "Warm compress, avoid spicy food",
        video: "https://www.youtube.com/embed/1nFBsWcQHUY",
        link: "https://www.apollo247.com/specialties/gastroenterologist"
    },
    "Diarrhea": {
        conditions: "Infection, food intolerance",
        advice: "Rehydrate, bland food",
        video: "https://www.youtube.com/embed/5Cy8iGd9m6Q",
        link: "https://www.practo.com/gastroenterologist"
    },
    "Back Pain": {
        conditions: "Muscle strain, poor posture",
        advice: "Stretch, rest, apply heat/ice",
        video: "https://www.youtube.com/embed/9fzc5h3jk5Q",
        link: "https://www.apollo247.com/specialties/orthopedic"
    },
    "Dizziness": {
        conditions: "Low BP, dehydration, anxiety",
        advice: "Sit down, drink water",
        video: "https://www.youtube.com/embed/Tl4WFXbTnHM",
        link: "https://www.practo.com/neurologist"
    }
};

function showSymptomChecker() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("symptom-checker").classList.remove("hidden");
    document.getElementById("medication-reminder").classList.add("hidden");
}

function showMedicationReminder() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("medication-reminder").classList.remove("hidden");
    document.getElementById("symptom-checker").classList.add("hidden");
}

function checkSymptom() {
    const symptom = document.getElementById("symptom-select").value;
    const result = document.getElementById("symptom-result");

    if (symptom && symptoms[symptom]) {
        const data = symptoms[symptom];
        result.innerHTML = `
            <strong>Possible causes:</strong> ${data.conditions}<br>
            <strong>Advice:</strong> ${data.advice}<br><br>
            <iframe width="300" height="170" src="${data.video}" frameborder="0" allowfullscreen></iframe><br><br>
            <a href="${data.link}" target="_blank">Book a doctor on Practo/Apollo</a><br>
            <small>See a doctor if symptoms are severe.</small>
        `;
    } else {
        result.textContent = "Please select a symptom.";
    }
}

function addMedication() {
    const name = document.getElementById("med-name").value.trim();
    const time = document.getElementById("med-time").value.trim();
    const list = document.getElementById("med-list");

    if (name && time) {
        const item = document.createElement("li");
        item.textContent = `${name} - ${time}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => item.remove();
        item.appendChild(deleteBtn);
        list.appendChild(item);

        document.getElementById("med-name").value = "";
        document.getElementById("med-time").value = "";
        alert("Reminder added! (Note: Browser notifications not set up yet.)");
    } else {
        alert("Please enter both medication name and time.");
    }
}


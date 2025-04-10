const symptoms = {
    "Headache": { conditions: "Dehydration, Tension", advice: "Drink water, rest." },
    "Fever": { conditions: "Cold, Flu", advice: "Monitor temp, hydrate." },
    "Cough": { conditions: "Cold, Allergies", advice: "Try honey, steam." }
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
        result.innerHTML = `Possible causes: ${symptoms[symptom].conditions}<br>Advice: ${symptoms[symptom].advice}<br>See a doctor if severe.`;
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
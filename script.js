// Symptom data
const symptoms = {
    "Headache": {
        conditions: "Tension, Migraine, Dehydration",
        advice: "Rest in a quiet room, drink water, take over-the-counter pain relief like ibuprofen if needed.",
        video: "https://www.youtube.com/embed/WAYBYjS1A4k",
        link: "https://www.practo.com/general-physician"
    },
    "Fever": {
        conditions: "Infection (e.g., Flu), Inflammation",
        advice: "Stay hydrated, rest, use a cool compress; seek medical help if above 103°F or lasting over 3 days.",
        video: "https://www.youtube.com/embed/GOwV4TcUuI8",
        link: "https://www.apollo247.com/specialties/general-physician"
    },
    "Cough": {
        conditions: "Cold, Allergies, Bronchitis",
        advice: "Stay hydrated, use honey or lozenges, avoid irritants; see a doctor if persistent for over 2 weeks.",
        video: "https://www.youtube.com/embed/gkz2DB5CLGQ",
        link: "https://www.practo.com/chest-surgeon"
    },
    "Sore Throat": {
        conditions: "Viral Infection, Strep Throat",
        advice: "Gargle with warm salt water, drink tea with honey, rest voice; see a doctor if severe or with fever.",
        video: "https://www.youtube.com/embed/LxGdo8dZqgU",
        link: "https://www.practo.com/ent-specialist"
    },
    "Nausea": {
        conditions: "Food Poisoning, Motion Sickness",
        advice: "Sip ginger tea, eat small bland meals, rest; seek help if vomiting persists over 24 hours.",
        video: "https://www.youtube.com/embed/tdtw5e5XQpE",
        link: "https://www.apollo247.com/specialties/gastroenterologist"
    },
    "Fatigue": {
        conditions: "Anemia, Stress, Sleep Deprivation",
        advice: "Get 7-8 hours of sleep, eat iron-rich foods, reduce stress; consult a doctor if chronic.",
        video: "https://www.youtube.com/embed/2dz7IFMRsPM",
        link: "https://www.practo.com/general-physician"
    },
    "Stomach Ache": {
        conditions: "Indigestion, Gas, Infection",
        advice: "Apply a warm compress, avoid spicy food, stay hydrated; see a doctor if severe pain.",
        video: "https://www.youtube.com/embed/1nFBsWcQHUY",
        link: "https://www.apollo247.com/specialties/gastroenterologist"
    },
    "Diarrhea": {
        conditions: "Viral Gastroenteritis, Food Intolerance",
        advice: "Rehydrate with water or oral rehydration solutions, eat bland foods; seek help if lasting over 2 days.",
        video: "https://www.youtube.com/embed/5Cy8iGd9m6Q",
        link: "https://www.practo.com/gastroenterologist"
    },
    "Back Pain": {
        conditions: "Muscle Strain, Poor Posture",
        advice: "Stretch gently, apply heat or ice, maintain good posture; see a doctor if persistent.",
        video: "https://www.youtube.com/embed/9fzc5h3jk5Q",
        link: "https://www.apollo247.com/specialties/orthopedic"
    },
    "Dizziness": {
        conditions: "Low Blood Pressure, Dehydration",
        advice: "Sit or lie down, drink water, avoid sudden movements; seek help if frequent.",
        video: "https://www.youtube.com/embed/Tl4W5e5XQpE",
        link: "https://www.practo.com/neurologist"
    },
    "Abdominal Pain": {
        conditions: "Indigestion, Infection, Cramps",
        advice: "Rest, hydrate, avoid heavy meals; see a doctor if severe or with fever.",
        video: "https://www.youtube.com/embed/example_abdominal", // Replace with real URL
        link: "https://www.practo.com/gastroenterologist"
    }
};

// Symptom Checker
function checkSymptom() {
    const symptomSelect = document.getElementById("symptom-select");
    const result = document.getElementById("result");
    const symptom = symptomSelect.value;

    if (!symptom || symptom === "") {
        result.innerHTML = "Please select a condition.";
    } else if (symptoms[symptom]) {
        const data = symptoms[symptom];
        result.innerHTML = `
            <strong>Possible causes:</strong> ${data.conditions}<br>
            <strong>Advice:</strong> ${data.advice}<br><br>
            <iframe width="300" height="170" src="${data.video}" frameborder="0" allowfullscreen></iframe><br><br>
            <a href="${data.link}" target="_blank">Book a doctor on Practo/Apollo</a><br>
            <small>See a doctor if symptoms are severe.</small>
        `;
    } else {
        result.innerHTML = "No data available for this symptom.";
    }
}

// Medication Reminder
function addReminder() {
    const medName = document.getElementById("med-name").value;
    const medTime = document.getElementById("med-time").value;
    if (medName && medTime) {
        const reminder = { name: medName, time: medTime };
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        reminders.push(reminder);
        localStorage.setItem("reminders", JSON.stringify(reminders));
        displayReminders();
        document.getElementById("med-name").value = "";
        document.getElementById("med-time").value = "";
    } else {
        alert("Please enter both medication name and time.");
    }
}

function displayReminders() {
    const reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    const reminderList = document.getElementById("reminder-list");
    reminderList.innerHTML = reminders.map(r => `<p>${r.name} at ${r.time}</p>`).join("");
}

// Personalized Health
let healthData = JSON.parse(localStorage.getItem("healthData")) || [];

function logHealthData() {
    const symptom = prompt("Enter symptom (e.g., Headache):");
    const severity = prompt("Enter severity (Mild/Moderate/Severe):");
    if (symptom && severity) {
        healthData.push({ symptom, severity, date: new Date().toLocaleDateString() });
        localStorage.setItem("healthData", JSON.stringify(healthData));
        updateHealthScore();
        updateChart();
    }
}

function updateHealthScore() {
    const recentData = healthData.slice(-5); // Last 5 entries
    const severeCount = recentData.filter(d => d.severity === "Severe").length;
    const moderateCount = recentData.filter(d => d.severity === "Moderate").length;
    const mildCount = recentData.filter(d => d.severity === "Mild").length;
    const total = severeCount + moderateCount + mildCount;
    const score = total ? (mildCount + moderateCount * 0.5) / total * 100 : 0;
    document.getElementById("health-score").textContent = `Health Score: ${score.toFixed(1)}%`;
}

function updateChart() {
    const ctx = document.getElementById("healthChart").getContext("2d");
    const labels = healthData.map(d => d.date);
    const data = healthData.map(d => {
        return { x: d.date, y: d.severity === "Mild" ? 1 : d.severity === "Moderate" ? 2 : 3 };
    });

    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: "line",
        data: {
            datasets: [{
                label: "Severity Trend",
                data: data,
                borderColor: "#007bff",
                fill: false
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { title: { display: true, text: "Severity (1=Mild, 2=Moderate, 3=Severe)" }, min: 0, max: 4 }
            }
        }
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    displayReminders();
    updateHealthScore();
    updateChart();
});
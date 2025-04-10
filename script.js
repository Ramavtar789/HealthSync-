const symptoms = {
  "Headache": {
    conditions: "Dehydration, Tension",
    advice: "Drink water, rest.",
    link: "https://www.practo.com/general-physician"
  },
  "Fever": {
    conditions: "Cold, Flu",
    advice: "Monitor temp, hydrate.",
    link: "https://www.apollo247.com/specialties/general-physician"
  },
  "Cough": {
    conditions: "Cold, Allergies",
    advice: "Try honey, steam.",
    link: "https://www.practo.com/chest-surgeon"
  },
  "Sore Throat": {
    conditions: "Viral infection, allergy",
    advice: "Warm fluids, lozenges",
    link: "https://www.practo.com/ent-specialist"
  },
  "Nausea": {
    conditions: "Food poisoning, motion sickness",
    advice: "Rest, ginger tea, light meals",
    link: "https://www.apollo247.com/specialties/gastroenterologist"
  },
  "Fatigue": {
    conditions: "Anemia, stress, sleep disorder",
    advice: "Rest, hydrate, consider a checkup",
    link: "https://www.practo.com/general-physician"
  },
  "Stomach Ache": {
    conditions: "Indigestion, gas, cramps",
    advice: "Warm compress, avoid spicy food",
    link: "https://www.apollo247.com/specialties/gastroenterologist"
  },
  "Diarrhea": {
    conditions: "Infection, food intolerance",
    advice: "Rehydrate, bland food",
    link: "https://www.practo.com/gastroenterologist"
  },
  "Back Pain": {
    conditions: "Muscle strain, poor posture",
    advice: "Stretch, rest, apply heat/ice",
    link: "https://www.apollo247.com/specialties/orthopedic"
  },
  "Dizziness": {
    conditions: "Low BP, dehydration, anxiety",
    advice: "Sit down, drink water",
    link: "https://www.practo.com/neurologist"
  }
};

document.addEventListener("DOMContentLoaded", function () {
  function toggleSection(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    const section = document.getElementById(id);
    if (section) section.classList.remove("hidden");
  }

  window.showSymptomChecker = () => toggleSection("symptom-checker");
  window.showMedicationReminder = () => toggleSection("medication-reminder");
  window.showPersonalizedHealth = () => toggleSection("personalized-health");
  window.goBack = () => toggleSection("home");

  window.checkSymptom = function () {
    const symptom = document.getElementById("symptom-select").value;
    const result = document.getElementById("symptom-result");

    if (symptom && symptoms[symptom]) {
      const info = symptoms[symptom];
      result.innerHTML = `
        <strong>Possible Causes:</strong> ${info.conditions}<br>
        <strong>Advice:</strong> ${info.advice}<br>
        <a href="${info.link}" target="_blank">Consult a Doctor</a>
      `;
    } else {
      result.textContent = "Please select a symptom.";
    }
  };

  window.addMedication = function () {
    const name = document.getElementById("med-name").value.trim();
    const time = document.getElementById("med-time").value.trim();
    const list = document.getElementById("med-list");

    if (name && time) {
      const item = document.createElement("li");
      item.textContent = name + " - " + time;
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.onclick = () => item.remove();
      item.appendChild(btn);
      list.appendChild(item);

      document.getElementById("med-name").value = "";
      document.getElementById("med-time").value = "";
      alert("Reminder added!");
    } else {
      alert("Please enter both name and time.");
    }
  };
});

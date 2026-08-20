const DISEASE_CATS = {
  "General OPD": {
    label: 'General OPD',
    color: '#2c7a4b', bg: '#e8f5ed', border: '#a3d9b9',
    diseases: [
      {name: 'Cough', severity: 2}, {name: 'Cold & Runny Nose', severity: 2}, {name: 'Fever', severity: 4}, 
      {name: 'Sore Throat', severity: 3}, {name: 'Headache', severity: 3},
      {name: 'Body Pain', severity: 3}, {name: 'Loose Motion', severity: 4}, {name: 'Diarrhoea', severity: 4}, 
      {name: 'Vomiting', severity: 4}, {name: 'Nausea', severity: 3},
      {name: 'Stomach Ache', severity: 4}, {name: 'Acidity / Gas', severity: 2}, {name: 'Constipation', severity: 2}, 
      {name: 'Skin Rash', severity: 3}, {name: 'Eye Irritation', severity: 2},
      {name: 'Ear Pain', severity: 4}, {name: 'Toothache', severity: 4}, {name: 'Mouth Ulcers', severity: 2}, 
      {name: 'Fatigue / Weakness', severity: 3}, {name: 'Mild Dehydration', severity: 5},
    ]
  },
  "Orthopedics": {
    label: 'Orthopaedics',
    color: '#9a3412', bg: '#fff7ed', border: '#fdba74',
    diseases: [
      {name: 'Bone Fracture', severity: 7}, {name: 'Hairline Fracture', severity: 5}, {name: 'Dislocation', severity: 7}, 
      {name: 'Ligament Tear', severity: 6},
      {name: 'Muscle Sprain', severity: 4}, {name: 'Joint Pain', severity: 3}, {name: 'Knee Pain', severity: 3}, 
      {name: 'Back Pain', severity: 4}, {name: 'Neck Pain', severity: 3},
      {name: 'Shoulder Injury', severity: 5}, {name: 'Wrist Injury', severity: 5}, {name: 'Ankle Sprain', severity: 4}, 
      {name: 'Hip Pain', severity: 5},
      {name: 'Arthritis Flare', severity: 4}, {name: 'Slipped Disc', severity: 6}, {name: 'Swollen Joint', severity: 4},
    ]
  },
  "Emergency": {
    label: 'Emergency',
    color: '#c0392b', bg: '#f9eae8', border: '#f5a99f',
    diseases: [
      {name: 'Road Accident', severity: 10}, {name: 'Fall from Height', severity: 9}, {name: 'Head Trauma', severity: 10}, 
      {name: 'Severe Burns', severity: 9},
      {name: 'Cardiac Arrest', severity: 10}, {name: 'Heart Attack', severity: 10}, {name: 'Stroke', severity: 10}, 
      {name: 'Unconsciousness', severity: 9},
      {name: 'Poisoning / Overdose', severity: 10}, {name: 'Drowning', severity: 10}, {name: 'Electrocution', severity: 10}, 
      {name: 'Stab Wound', severity: 10},
      {name: 'Gunshot Wound', severity: 10}, {name: 'Severe Bleeding', severity: 10}, {name: 'Breathing Difficulty', severity: 9}, 
      {name: 'Anaphylaxis', severity: 10},
    ]
  },
  "Cardiology": {
    label: 'Cardiology',
    color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    diseases: [
      {name: 'Chest Pain (Angina)', severity: 8}, {name: 'Palpitations', severity: 6}, {name: 'High Blood Pressure', severity: 6},
      {name: 'Shortness of Breath', severity: 7}, {name: 'Fainting / Syncope', severity: 8}, {name: 'Irregular Heartbeat', severity: 7},
      {name: 'Heart Murmur', severity: 5}, {name: 'Swollen Legs (Edema)', severity: 5}
    ]
  },
  "Neurology": {
    label: 'Neurology',
    color: '#7e22ce', bg: '#faf5ff', border: '#e9d5ff',
    diseases: [
      {name: 'Seizures / Epilepsy', severity: 8}, {name: 'Severe Migraine', severity: 6}, {name: 'Numbness / Tingling', severity: 5},
      {name: 'Sudden Weakness', severity: 9}, {name: 'Memory Loss', severity: 4}, {name: 'Tremors', severity: 5},
      {name: 'Vertigo / Dizziness', severity: 4}, {name: 'Loss of Coordination', severity: 7}
    ]
  },
  "Pediatrics": {
    label: 'Pediatrics',
    color: '#b45309', bg: '#fffbeb', border: '#fde68a',
    diseases: [
      {name: 'High Fever in Infant', severity: 8}, {name: 'Croup / Hacking Cough', severity: 6}, {name: 'Asthma Attack', severity: 8},
      {name: 'Ear Infection', severity: 4}, {name: 'Chickenpox / Measles', severity: 5}, {name: 'Colic', severity: 3},
      {name: 'Difficulty Feeding', severity: 6}, {name: 'Lethargy in Toddler', severity: 8}
    ]
  }
};

let activeDiseaseCategory = 'General OPD';
let selectedDisease = '';

function switchDiseaseCategory(cat, btn) {
  activeDiseaseCategory = cat;
  document.querySelectorAll('.dis-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  selectedDisease = '';
  document.getElementById('diseaseInput').value = '';
  
  const deptSelect = document.getElementById('department');
  if (deptSelect.value !== cat) deptSelect.value = cat;

  renderDiseaseGrid();
}

document.getElementById('department').addEventListener('change', function() {
  const cat = this.value;
  const btn = document.querySelector(`.dis-cat-btn[data-cat="${cat}"]`);
  switchDiseaseCategory(cat, btn);
});

function renderDiseaseGrid() {
  const grid = document.getElementById('diseaseGrid');
  const cat = DISEASE_CATS[activeDiseaseCategory];
  grid.innerHTML = cat.diseases.map(d => `
    <span class="dis-chip ${selectedDisease === d.name ? 'selected' : ''}"
      style="background:${selectedDisease === d.name ? cat.color : cat.bg};
             color:${selectedDisease === d.name ? '#fff' : cat.color};
             border-color:${cat.border};"
      onclick="selectDisease('${d.name.replace(/'/g,"\\'")}', ${d.severity})">
      ${d.name}
    </span>
  `).join('');
}

function selectDisease(name, severity) {
  selectedDisease = name;
  document.getElementById('diseaseInput').value = name;
  
  if (severity) {
    document.getElementById('severitySlider').value = severity;
    document.getElementById('severitySlider').dispatchEvent(new Event('input'));
  }
  
  renderDiseaseGrid();
}

let patients = [];
let attended = 0;
let currentView = 'active';

async function fetchPatients() {
  try {
    const url = currentView === 'history' ? "http://localhost:8081/patients/history" : "http://localhost:8081/patients";
    const response = await fetch(url);
    const data = await response.json();
    
    const existingPatients = patients;

    patients = data.map(p => {
      const existing = existingPatients.find(ex => ex.id === p.id);
      return {
        id: p.id,
        name: p.name,
        severity: p.priority,
        department: "General",
        disease: p.disease,
        arrivalTime: existing ? existing.arrivalTime : Date.now()
      };
    });

    renderQueue();
    updateStats();

  } catch (error) {
    console.error("Error fetching patients:", error);
  }
}
let activeFilter = 'all';
let idCounter = 1000;

function switchView(view) {
  currentView = view;
  document.getElementById('tabActive').style.background = view === 'active' ? 'var(--primary-light)' : 'var(--surface)';
  document.getElementById('tabActive').style.color = view === 'active' ? 'var(--primary)' : 'var(--text)';
  document.getElementById('tabHistory').style.background = view === 'history' ? 'var(--primary-light)' : 'var(--surface)';
  document.getElementById('tabHistory').style.color = view === 'history' ? 'var(--primary)' : 'var(--text)';
  fetchPatients();
}

function sevClass(s) {
  if (s >= 8) return 'sev-critical';
  if (s >= 6) return 'sev-high';
  if (s >= 4) return 'sev-medium';
  return 'sev-low';
}

function sevText(s) {
  if (s >= 9) return 'Critical';
  if (s >= 7) return 'Severe';
  if (s >= 5) return 'Moderate';
  if (s >= 3) return 'Mild';
  return 'Routine';
}

function sevColor(s) {
  if (s >= 8) return 'var(--accent)';
  if (s >= 6) return 'var(--warn)';
  if (s >= 4) return '#0284c7';
  return 'var(--accent2)';
}

function sevBg(s) {
  if (s >= 8) return 'var(--accent-light)';
  if (s >= 6) return 'var(--warn-light)';
  if (s >= 4) return '#e0f2fe';
  return 'var(--accent2-light)';
}

const slider = document.getElementById('severitySlider');
const sevNum = document.getElementById('sevNum');
const sevLabel = document.getElementById('sevLabel');
const sevBarFill = document.getElementById('sevBarFill');

slider.addEventListener('input', function() {
  const v = parseInt(this.value);
  sevNum.textContent = v;
  sevNum.style.color = sevColor(v);
  sevLabel.textContent = sevText(v);
  sevLabel.style.background = sevBg(v);
  sevLabel.style.color = sevColor(v);
  sevBarFill.style.width = (v / 10 * 100) + '%';
  sevBarFill.style.background = sevColor(v);
});

slider.dispatchEvent(new Event('input'));

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

function addPatient() {
  const name = document.getElementById('patientName').value.trim();
  const severity = parseInt(document.getElementById('severitySlider').value);
  const dept = document.getElementById('department').value;
  const disease = document.getElementById('diseaseInput').value.trim();

  if (!name) {
    showToast('⚠ Please enter a patient name.', true);
    document.getElementById('patientName').focus();
    return;
  }

  const patient = {
    id: ++idCounter,
    name,
    severity,
    department: dept,
    disease,
    arrivalTime: Date.now(),
  };

  fetch("http://localhost:8081/patients", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: name,
    age: 25,
    disease: disease,
    priority: severity
  })
})
.then(() => fetchPatients())
.catch(err => console.error(err));
  document.getElementById('patientName').value = '';
  document.getElementById('diseaseInput').value = '';
  document.getElementById('severitySlider').value = 1;
  slider.dispatchEvent(new Event('input'));

  renderQueue();
  updateStats();
  showToast(`✓ ${name} added to queue — severity ${severity}`);
}

function sortPatients(list) {
  return [...list].sort((a, b) => {
    if (b.severity !== a.severity) return b.severity - a.severity;
    return a.arrivalTime - b.arrivalTime;
  });
}

function waitLabel(arrivalTime) {
  const diff = Math.floor((Date.now() - arrivalTime) / 1000);
  if (diff < 60) return diff + 's';
  if (diff < 3600) return Math.floor(diff / 60) + 'm';
  return Math.floor(diff / 3600) + 'h ' + Math.floor((diff % 3600) / 60) + 'm';
}

function setFilter(f, btn) {
  activeFilter = f;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderQueue();
}

function filterPatients(list) {
  if (activeFilter === 'critical') return list.filter(p => p.severity >= 8);
  if (activeFilter === 'high') return list.filter(p => p.severity >= 6 && p.severity < 8);
  if (activeFilter === 'low') return list.filter(p => p.severity < 6);
  return list;
}

function renderQueue() {
  const body = document.getElementById('queueBody');
  const empty = document.getElementById('emptyState');
  const sorted = sortPatients(filterPatients(patients));

  body.innerHTML = '';

  if (sorted.length === 0) {
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  const all = sortPatients(patients);

  sorted.forEach((p, i) => {
    const globalRank = all.findIndex(x => x.id === p.id) + 1;
    const tr = document.createElement('tr');
    tr.style.animationDelay = (i * 0.04) + 's';

    const posCls = globalRank === 1 ? 'pos-1' : globalRank === 2 ? 'pos-2' : globalRank === 3 ? 'pos-3' : 'pos-other';

    let dots = '';
    for (let d = 1; d <= 10; d++) {
      dots += `<div class="sev-dot ${d <= p.severity ? 'filled' : 'empty'}"></div>`;
    }

    const wait = waitLabel(p.arrivalTime);
    const waitColor = (Date.now() - p.arrivalTime) > 1800000 ? 'var(--accent)' : 'var(--text-muted)';

    tr.innerHTML = `
      <td><div class="pos-badge ${posCls}">${globalRank}</div></td>
      <td>
        <div class="patient-name">${escHtml(p.name)}</div>
        <div class="patient-id">ID #${p.id}</div>
      </td>
      <td style="font-size:12px;color:var(--text-muted);font-family:'DM Mono',monospace;">${escHtml(p.department)}</td>
      <td>
        <span style="
          display:inline-block;font-size:11px;font-family:'DM Mono',monospace;letter-spacing:0.3px;
          padding:3px 9px;border-radius:999px;
          background:${p.disease ? '#f0eaff' : 'var(--surface2)'};
          color:${p.disease ? '#6d28d9' : 'var(--text-muted)'};
          border:1px solid ${p.disease ? '#c4b5fd' : 'var(--border)'};
          white-space:nowrap;max-width:140px;overflow:hidden;text-overflow:ellipsis;
        " title="${escHtml(p.disease || 'N/A')}">${escHtml(p.disease || '—')}</span>
      </td>
      <td>
        <div class="severity-cell ${sevClass(p.severity)}">
          <div class="sev-dots">${dots}</div>
          <span class="sev-val">${p.severity}</span>
        </div>
      </td>
      <td>
        <span class="wait-chip" style="color:${waitColor};background:${waitColor === 'var(--accent)' ? 'var(--accent-light)' : 'var(--surface2)'}">
          ${wait}
        </span>
      </td>
      <td>
        ${currentView === 'active' ? `
        <button class="btn-attend" onclick="attendPatient('${p.id}')">Attend</button>
        <button class="btn-remove" onclick="removePatient('${p.id}')" title="Remove">✕</button>
        ` : `<span style="color:var(--accent2);font-weight:600;font-size:12px;">✓ Attended</span>`}
      </td>
    `;
    body.appendChild(tr);
  });
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function attendPatient(id) {
  fetch(`http://localhost:8081/patients/${id}/attend`, {
    method: "PUT"
  })
  .then(() => {
    attended++;
    fetchPatients();
    showToast("Patient attended ✔");
  })
  .catch(err => console.error(err));
}

function removePatient(id) {
  fetch(`http://localhost:8081/patients/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    fetchPatients();
    showToast("Removed patient from queue ✔");
  })
  .catch(err => console.error(err));
}

function updateStats() {
  document.getElementById('statTotal').textContent = patients.length;
  document.getElementById('statCritical').textContent = patients.filter(p => p.severity >= 8).length;
  document.getElementById('statAttended').textContent = attended;
}

let toastTimeout;
function showToast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 3200);
}

setInterval(() => {
  if (patients.length) renderQueue();
}, 30000);


renderDiseaseGrid();
fetchPatients();
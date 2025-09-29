let isEnabled = false;

// Status Toggle
const toggleBtn = document.getElementById('toggle-macro');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');

toggleBtn.addEventListener('click', () => {
    isEnabled = !isEnabled;
    statusIndicator.className = isEnabled ? 'on' : 'off';
    statusText.textContent = `Macro ${isEnabled ? 'ON' : 'OFF'}`;
    toggleBtn.textContent = isEnabled ? 'Disable' : 'Enable';
});

// Sliders
const sliders = ['speed-up','speed-down','speed-left','speed-right','sensitivity'];
sliders.forEach(id => {
    const slider = document.getElementById(id);
    const val = document.getElementById(id+'-val');
    slider.addEventListener('input', () => {
        val.textContent = slider.value;
    });
});

// Help modal
const helpBtn = document.getElementById('help-btn');
const helpModal = document.getElementById('help-modal');
const closeHelp = document.getElementById('close-help');
helpBtn.addEventListener('click', ()=> helpModal.style.display='flex');
closeHelp.addEventListener('click', ()=> helpModal.style.display='none');

// Profiles (localStorage)
const profileSelect = document.getElementById('profile-select');
function updateProfiles() {
    profileSelect.innerHTML = '';
    const profiles = JSON.parse(localStorage.getItem('nebulaProfiles')||'{}');
    for (let name in profiles) {
        const opt = document.createElement('option');
        opt.value = name; opt.textContent = name;
        profileSelect.appendChild(opt);
    }
}
updateProfiles();

function saveProfile(name) {
    const profiles = JSON.parse(localStorage.getItem('nebulaProfiles')||'{}');
    profiles[name] = {};
    sliders.forEach(id => profiles[name][id] = document.getElementById(id).value);
    localStorage.setItem('nebulaProfiles', JSON.stringify(profiles));
    updateProfiles();
}

document.getElementById('load-profile').addEventListener('click', () => {
    const profiles = JSON.parse(localStorage.getItem('nebulaProfiles')||'{}');
    const name = profileSelect.value;
    if (profiles[name]) {
        sliders.forEach(id => document.getElementById(id).value = profiles[name][id]);
        sliders.forEach(id => document.getElementById(id+'-val').textContent = profiles[name][id]);
    }
});
document.getElementById('save-profile').addEventListener('click', () => {
    const name = profileSelect.value;
    if (!name) return alert('Select a profile or use Save As');
    saveProfile(name);
});
document.getElementById('save-as-profile').addEventListener('click', () => {
    const name = prompt('Enter profile name:');
    if (name) saveProfile(name);
});
document.getElementById('delete-profile').addEventListener('click', () => {
    const name = profileSelect.value;
    if (!name) return;
    const profiles = JSON.parse(localStorage.getItem('nebulaProfiles')||'{}');
    delete profiles[name];
    localStorage.setItem('nebulaProfiles', JSON.stringify(profiles));
    updateProfiles();
});

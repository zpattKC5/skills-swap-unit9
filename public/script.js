const state = {
  skills: [],
  selectedCategory: 'all',
  isLoading: false,
  error: '',
};

const skillList = document.getElementById('skillList');
const summary = document.getElementById('summary');
const skillForm = document.getElementById('skillForm');
const categoryFilter = document.getElementById('categoryFilter');
const formStatus = document.getElementById('formStatus');
const apiStatus = document.getElementById('apiStatus');

function setStatus(element, message, type = 'info') {
  if (!element) return;

  element.textContent = message;
  element.className = `status ${type}`;
}

function renderSummary(skills) {
  const visible = window.skillUtils.filterSkillsByCategory(skills, state.selectedCategory);
  const total = window.skillUtils.calculateTotalCosts(visible);
  const matches = window.skillUtils.matchSkillsToUser(skills, {
    category: state.selectedCategory,
    keyword: '',
  });

  summary.innerHTML = `
    <p>Total visible: ${visible.length}</p>
    <p>Matching skills: ${matches.length}</p>
    <p>Total value: $${total.toFixed(2)}</p>
  `;
}

function renderSkills() {
  const filteredSkills = window.skillUtils.filterSkillsByCategory(state.skills, state.selectedCategory);

  if (!filteredSkills.length) {
    skillList.innerHTML = '<li>No skills match this category.</li>';
    renderSummary(state.skills);
    return;
  }

  skillList.innerHTML = filteredSkills
    .map(
      (skill) => `
        <li class="skill-item">
          <div class="skill-header">
            <h3>${skill.title}</h3>
            <span class="price">$${Number(skill.price || 0).toFixed(2)}</span>
          </div>
          <p class="category">${skill.category || 'General'}</p>
          <p>${skill.description || 'No description provided.'}</p>
          <p class="provider">${skill.provider ? `Provider: ${skill.provider}` : 'Provider: Anonymous'}</p>
        </li>
      `
    )
    .join('');

  renderSummary(state.skills);
}

async function loadSkills() {
  state.isLoading = true;
  setStatus(apiStatus, 'Loading skills...', 'info');

  try {
    const skills = await window.apiService.fetchSkills();
    state.skills = Array.isArray(skills) ? skills : [];
    renderSkills();
    setStatus(apiStatus, `${state.skills.length} skill(s) loaded successfully.`, 'success');
  } catch (error) {
    state.error = 'Unable to load skills from the API.';
    skillList.innerHTML = '<li>Unable to load skills from the API.</li>';
    setStatus(apiStatus, state.error, 'error');
  } finally {
    state.isLoading = false;
  }
}

categoryFilter.addEventListener('change', (event) => {
  state.selectedCategory = event.target.value;
  renderSkills();
});

skillForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(skillForm);
  const title = String(formData.get('title') || '').trim();
  const category = String(formData.get('category') || '').trim();
  const price = Number(formData.get('price'));
  const description = String(formData.get('description') || '').trim();
  const provider = String(formData.get('provider') || '').trim();

  if (!title || !category || Number.isNaN(price) || price < 0) {
    setStatus(formStatus, 'Please enter a valid title, category, and price.', 'error');
    return;
  }

  const skillData = {
    title,
    category,
    price,
    description,
    provider: provider || 'Anonymous',
  };

  setStatus(formStatus, 'Creating skill...', 'info');

  try {
    await window.apiService.createSkill(skillData);
    skillForm.reset();
    setStatus(formStatus, 'Skill created successfully!', 'success');
    await loadSkills();
  } catch (error) {
    setStatus(formStatus, 'Unable to create the skill. Please try again.', 'error');
  }
});

loadSkills();

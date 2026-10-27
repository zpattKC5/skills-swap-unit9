const state = {
  skills: [],
  selectedCategory: 'all',
};

const skillList = document.getElementById('skillList');
const summary = document.getElementById('summary');
const skillForm = document.getElementById('skillForm');
const categoryFilter = document.getElementById('categoryFilter');

function renderSummary(skills) {
  const total = window.skillUtils.calculateTotalCosts(skills);
  const visible = window.skillUtils.filterSkillsByCategory(skills, state.selectedCategory);
  const matches = window.skillUtils.matchSkillsToUser(skills, {
    category: state.selectedCategory,
    keyword: '',
  });

  summary.innerHTML = `
    <p>Total visible: ${visible.length}</p>
    <p>Matching skills: ${matches.length}</p>
    <p>Total value: $${total}</p>
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
            <span class="price">$${Number(skill.price).toFixed(2)}</span>
          </div>
          <p class="category">${skill.category}</p>
          <p>${skill.description || 'No description provided.'}</p>
        </li>
      `
    )
    .join('');

  renderSummary(state.skills);
}

async function loadSkills() {
  try {
    state.skills = await window.apiService.fetchSkills();
    renderSkills();
  } catch (error) {
    skillList.innerHTML = '<li>Unable to load skills from the API.</li>';
  }
}

categoryFilter.addEventListener('change', (event) => {
  state.selectedCategory = event.target.value;
  renderSkills();
});

skillForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(skillForm);
  const skillData = {
    title: formData.get('title'),
    category: formData.get('category'),
    price: Number(formData.get('price')),
    description: formData.get('description'),
    provider: 'Student',
  };

  try {
    await window.apiService.createSkill(skillData);
    skillForm.reset();
    await loadSkills();
  } catch (error) {
    alert('Unable to create the skill. Please try again.');
  }
});

loadSkills();

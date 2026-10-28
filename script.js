const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 },
  { title: 'Jazz Piano', category: 'Music', price: 10 },
  { title: 'Interview Coaching', category: 'Career', price: 35 },
];

const skillList = document.getElementById('skillList');
const totalCost = document.getElementById('totalCost');
const matchResults = document.getElementById('matchResults');
const costForm = document.getElementById('costForm');
const matchForm = document.getElementById('matchForm');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderSkills(selectedCategory = 'All') {
  const filteredSkills = filterSkillsByCategory(skills, selectedCategory);

  if (!filteredSkills.length) {
    skillList.innerHTML = '<p class="empty-text">No skills match this category.</p>';
    return;
  }

  skillList.innerHTML = filteredSkills
    .map(
      (skill) => `
        <div class="skill-card">
          <div class="skill-header">
            <strong>${skill.title}</strong>
            <span>$${Number(skill.price).toFixed(2)}</span>
          </div>
          <p>${skill.category}</p>
        </div>
      `
    )
    .join('');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderSkills(button.dataset.category);
  });
});

costForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const hourlyRate = Number(document.getElementById('hourlyRate').value);
  const hours = Number(document.getElementById('hours').value);

  totalCost.textContent = `$${calculateTotalCosts(hourlyRate, hours).toFixed(2)}`;
});

matchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const userNeeds = {
    category: document.getElementById('matchCategory').value,
    maxPrice: Number(document.getElementById('maxPrice').value),
  };

  const matches = matchSkillsToUser(userNeeds, skills);

  if (!matches.length) {
    matchResults.innerHTML = '<li class="empty-text">No matches found.</li>';
    return;
  }

  matchResults.innerHTML = matches
    .map(
      (skill) => `
        <li class="match-item">
          <strong>${skill.title}</strong> - ${skill.category} - $${Number(skill.price).toFixed(2)}
        </li>
      `
    )
    .join('');
});

renderSkills();

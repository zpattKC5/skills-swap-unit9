(function (global) {
  function filterSkillsByCategory(skills, category) {
    if (!Array.isArray(skills)) return [];

    if (!category || category === 'all') {
      return [...skills];
    }

    const normalizedCategory = String(category).trim().toLowerCase();
    return skills.filter((skill) => {
      const skillCategory = String(skill.category || '').trim().toLowerCase();
      return skillCategory === normalizedCategory;
    });
  }

  function calculateTotalCosts(skills) {
    if (!Array.isArray(skills)) return 0;
    return skills.reduce((total, skill) => total + Number(skill.price || 0), 0);
  }

  function matchSkillsToUser(skills, userPreferences = {}) {
    if (!Array.isArray(skills)) return [];

    const desiredCategory = String(userPreferences.category || '').trim().toLowerCase();
    const keyword = String(userPreferences.keyword || '').trim().toLowerCase();

    return skills.filter((skill) => {
      const skillCategory = String(skill.category || '').trim().toLowerCase();
      const title = String(skill.title || '').trim().toLowerCase();
      const description = String(skill.description || '').trim().toLowerCase();

      const categoryMatches = !desiredCategory || desiredCategory === 'all' || skillCategory === desiredCategory;
      const keywordMatches =
        !keyword ||
        title.includes(keyword) ||
        description.includes(keyword) ||
        skillCategory.includes(keyword);

      return categoryMatches && keywordMatches;
    });
  }

  const api = {
    filterSkillsByCategory,
    calculateTotalCosts,
    matchSkillsToUser,
  };

  global.skillUtils = api;

  if (typeof module !== 'undefined') {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);

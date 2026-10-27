(function (global) {
  function normalizeCategory(value) {
    return String(value || '').trim().toLowerCase();
  }

  function filterSkillsByCategory(skills, category) {
    if (!Array.isArray(skills)) return [];

    if (!category || category === 'all') {
      return [...skills];
    }

    const normalizedCategory = normalizeCategory(category);

    return skills.filter((skill) => {
      const skillCategory = normalizeCategory(skill.category);
      return skillCategory === normalizedCategory;
    });
  }

  function calculateTotalCosts(skills) {
    if (!Array.isArray(skills)) return 0;

    return skills.reduce((total, skill) => {
      const value = Number(skill?.price ?? 0);
      return total + (Number.isFinite(value) ? value : 0);
    }, 0);
  }

  function matchSkillsToUser(skills, userPreferences = {}) {
    if (!Array.isArray(skills)) return [];

    const desiredCategory = normalizeCategory(userPreferences.category);
    const keyword = String(userPreferences.keyword || '').trim().toLowerCase();

    return skills.filter((skill) => {
      const skillCategory = normalizeCategory(skill.category);
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

function filterSkillsByCategory(skills, category) {
  if (!Array.isArray(skills)) {
    return [];
  }

  const normalizedCategory = String(category || '').trim().toLowerCase();

  if (!normalizedCategory || normalizedCategory === 'all') {
    return [...skills];
  }

  return skills.filter((skill) => {
    const skillCategory = String(skill.category || '').trim().toLowerCase();
    return skillCategory === normalizedCategory;
  });
}

function calculateTotalCosts(hourlyRate, hours) {
  const rate = Number(hourlyRate);
  const duration = Number(hours);

  if (!Number.isFinite(rate) || !Number.isFinite(duration)) {
    return 0;
  }

  return Number((rate * duration).toFixed(2));
}

function matchSkillsToUser(userNeeds, skills) {
  if (!userNeeds || !Array.isArray(skills)) {
    return [];
  }

  const preferredCategory = String(userNeeds.category || '').trim().toLowerCase();
  const maxPrice = Number(userNeeds.maxPrice ?? Infinity);

  if (!preferredCategory) {
    return [];
  }

  return skills.filter((skill) => {
    const skillCategory = String(skill.category || '').trim().toLowerCase();
    const price = Number(skill.price ?? 0);

    return skillCategory === preferredCategory && price <= maxPrice;
  });
}

if (typeof module !== 'undefined') {
  module.exports = {
    filterSkillsByCategory,
    calculateTotalCosts,
    matchSkillsToUser,
  };
}

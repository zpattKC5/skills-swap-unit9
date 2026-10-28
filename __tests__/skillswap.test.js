const { filterSkillsByCategory, calculateTotalCosts, matchSkillsToUser } = require('../skillswap-functions.js');

describe('filterSkillsByCategory', () => {
  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 25 },
  ];

  test('filters skills by selected category', () => {
    expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'Web Development', category: 'Programming', price: 25 },
    ]);
  });

  test('handles the All category', () => {
    expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
  });

  test('returns an empty array when no skill matches', () => {
    expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
  });
});

describe('calculateTotalCosts', () => {
  test('returns correct values for different hourly rates and hours', () => {
    expect(calculateTotalCosts(20, 2)).toBe(40);
    expect(calculateTotalCosts(25, 1.5)).toBe(37.5);
  });

  test('handles free sessions and zero hours', () => {
    expect(calculateTotalCosts(0, 3)).toBe(0);
    expect(calculateTotalCosts(20, 0)).toBe(0);
  });

  test('handles decimal hours correctly', () => {
    expect(calculateTotalCosts(15.5, 2.5)).toBe(38.75);
  });
});

describe('matchSkillsToUser', () => {
  const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'JavaScript Help', category: 'Programming', price: 25 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
  ];

  test('matches by category and max price', () => {
    const userNeeds = { category: 'Programming', maxPrice: 30 };
    expect(matchSkillsToUser(userNeeds, skills)).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
      { title: 'JavaScript Help', category: 'Programming', price: 25 },
    ]);
  });

  test('filters by max price', () => {
    const userNeeds = { category: 'Programming', maxPrice: 20 };
    expect(matchSkillsToUser(userNeeds, skills)).toEqual([
      { title: 'Python Tutoring', category: 'Programming', price: 20 },
    ]);
  });

  test('returns empty array for no matches', () => {
    const userNeeds = { category: 'Cooking', maxPrice: 100 };
    expect(matchSkillsToUser(userNeeds, skills)).toEqual([]);
  });

  test('includes free skills', () => {
    const userNeeds = { category: 'Career', maxPrice: 0 };
    expect(matchSkillsToUser(userNeeds, skills)).toEqual([
      { title: 'Resume Review', category: 'Career', price: 0 },
    ]);
  });
});

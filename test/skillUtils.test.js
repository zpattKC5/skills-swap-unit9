const test = require('node:test');
const assert = require('node:assert/strict');
const { filterSkillsByCategory, calculateTotalCosts, matchSkillsToUser } = require('../public/skillUtils.js');

test('filterSkillsByCategory returns all skills when category is all', () => {
  const skills = [
    { title: 'JS', category: 'Technology', price: 25 },
    { title: 'Spanish', category: 'Languages', price: 18 },
  ];

  assert.deepEqual(filterSkillsByCategory(skills, 'all'), skills);
});

test('filterSkillsByCategory is case-insensitive and filters by category', () => {
  const skills = [
    { title: 'JS', category: 'Technology', price: 25 },
    { title: 'Spanish', category: 'Languages', price: 18 },
  ];

  const result = filterSkillsByCategory(skills, 'technology');
  assert.equal(result.length, 1);
  assert.equal(result[0].title, 'JS');
});

test('calculateTotalCosts sums skill prices safely', () => {
  const skills = [
    { title: 'JS', category: 'Technology', price: 25 },
    { title: 'Spanish', category: 'Languages', price: 18 },
    { title: 'Guitar', category: 'Music', price: 30 },
    { title: 'No price', category: 'Career', price: null },
  ];

  assert.equal(calculateTotalCosts(skills), 73);
});

test('calculateTotalCosts returns 0 for invalid input', () => {
  assert.equal(calculateTotalCosts(null), 0);
  assert.equal(calculateTotalCosts([]), 0);
});

test('matchSkillsToUser returns matches for category and keyword', () => {
  const skills = [
    { title: 'JavaScript Tutoring', category: 'Technology', description: 'Frontend basics', price: 22 },
    { title: 'Spanish Conversation', category: 'Languages', description: 'Everyday speaking', price: 15 },
    { title: 'Guitar Lessons', category: 'Music', description: 'Chord practice', price: 28 },
  ];

  const matches = matchSkillsToUser(skills, { category: 'Technology', keyword: 'frontend' });
  assert.equal(matches.length, 1);
  assert.equal(matches[0].title, 'JavaScript Tutoring');
});

test('matchSkillsToUser ignores category when all is passed', () => {
  const skills = [
    { title: 'JavaScript Tutoring', category: 'Technology', description: 'Frontend basics', price: 22 },
    { title: 'Spanish Conversation', category: 'Languages', description: 'Everyday speaking', price: 15 },
  ];

  const matches = matchSkillsToUser(skills, { category: 'all', keyword: 'speaking' });
  assert.equal(matches.length, 1);
  assert.equal(matches[0].title, 'Spanish Conversation');
});

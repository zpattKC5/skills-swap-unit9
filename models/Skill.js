const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'skills',
  timestamps: true,
});

const defaultSkills = [
  {
    title: 'JavaScript Tutoring',
    category: 'Technology',
    price: 35,
    description: 'Learn JavaScript fundamentals, arrays, and DOM manipulation.',
  },
  {
    title: 'Spanish Conversation',
    category: 'Languages',
    price: 25,
    description: 'Practice everyday Spanish with a friendly conversational partner.',
  },
  {
    title: 'Guitar Lessons',
    category: 'Music',
    price: 40,
    description: 'Beginner guitar lessons covering chords, rhythm, and songs.',
  },
  {
    title: 'Resume Review',
    category: 'Career',
    price: 30,
    description: 'Get feedback on your resume and interview strategy.',
  },
];

async function seedSkills() {
  const count = await Skill.count();
  if (count === 0) {
    await Skill.bulkCreate(defaultSkills);
  }

  return Skill.findAll({
    order: [['createdAt', 'ASC']],
  });
}

module.exports = { Skill, seedSkills };

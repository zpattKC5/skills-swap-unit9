const sequelize = require('../config/database');
const { Skill, seedSkills } = require('../models/Skill');

async function setupDatabase() {
  await sequelize.sync({ force: true });
  await seedSkills();
  console.log('Database initialized successfully.');
}

setupDatabase()
  .then(() => sequelize.close())
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });

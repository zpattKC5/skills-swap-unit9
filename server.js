const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const { Skill, seedSkills } = require('./models/Skill');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.findAll({ order: [['createdAt', 'ASC']] });
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Failed to fetch skills.' });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const { title, category, price, description } = req.body;

    if (!title || !category || price === undefined) {
      return res.status(400).json({ message: 'Title, category, and price are required.' });
    }

    const skill = await Skill.create({
      title: String(title).trim(),
      category: String(category).trim(),
      price: Number(price),
      description: description ? String(description).trim() : '',
    });

    res.status(201).json(skill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ message: 'Failed to create skill.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await seedSkills();
    app.listen(PORT, () => {
      console.log(`Skill Swap app listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

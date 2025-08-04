require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const Blog = require('./models/Blog');

User.hasMany(Blog, { foreignKey: { name: 'authorId', allowNull: false }, onDelete: 'CASCADE' });
Blog.belongsTo(User, { foreignKey: 'authorId' });

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

app.get('/', (req, res) => res.send('API is running!'));

const PORT = process.env.PORT || 5001;
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established.');
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Server startup error:', error);
  }
};

startServer();
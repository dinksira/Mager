const express = require('express');
const cors = require('cors');
const path = require('path');
const contentRoutes = require('./routes/content');
const slidesRoutes = require('./routes/slides');
const contactRoutes = require('./routes/contact');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/content', contentRoutes);
app.use('/api/slides', slidesRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

module.exports = app;

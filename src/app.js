const express = require('express');
const logger = require('./middleware/logger');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} adresinde çalışıyor.`);
});
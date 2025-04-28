const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { readdirSync } = require('fs');
const { checkConnection } = require('./config/db');
const createUserTable = require('./config/userTable');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// check database connection and start server if successful
async function main() {
  await checkConnection();
  await createUserTable();
}

main();

// middleware
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(cors());

// error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// routes
readdirSync('./routes').map((i) => {
  try {
    console.log(`Loading route: ${i}`);
    app.use('/api', require('./routes/' + i));
  } catch (err) {
    console.error(`Error loading route ${i}:`, err);
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
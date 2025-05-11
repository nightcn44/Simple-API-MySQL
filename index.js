const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const { readdirSync } = require('fs');
const { checkConnection } = require("./config/db");
const createUserTable = require("./config/user.table");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

checkConnection();
createUserTable();

app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

// readdirSync('./routes').map((i) => {
//   try {
//     console.log(`Loading route: ${i}`);
//     app.use('/api', require('./routes/' + i));
//   } catch (err) {
//     console.error(`Error loading route ${i}:`, err);
//   }
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const mysql = require('mysql2');
const connect = require("./connect");
const usersRouter = require("./routes/usersRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
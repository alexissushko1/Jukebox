const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
//app.use(require("morgan")("dev"));

app.use("", require("./api/users.js"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong :(");
});

/* app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
}); */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

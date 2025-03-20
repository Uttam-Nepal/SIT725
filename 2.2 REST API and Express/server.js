const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Wrong entries");
  }

  const result = num1 + num2;
  res.json({ result });
});

app.get("/subtract", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Wrong entries");
  }

  const result = num1 - num2;
  res.json({ result });
});

app.get("/multiply", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Wrong entries");
  }

  const result = num1 * num2;
  res.json({ result });
});

app.get("/divide", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).send("Wrong entries");
  }

  if (num2 === 0) {
    return res.status(400).send("Cannot divide by zero.");
  }

  const result = num1 / num2;
  res.json({ result });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

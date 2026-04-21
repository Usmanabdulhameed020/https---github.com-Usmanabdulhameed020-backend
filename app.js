const express = require("express");
const app = express();

app.use(express.json());

let passwords = [
  { id: 1, site: "test", username: "admin", password: "1234" }
];

app.post("/passwords", (req, res) => {
  const { site, username, password } = req.body;

  if (!site || !username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newPassword = {
    id: id++,
    site,
    username,
    password,
  };

  passwords.push(newPassword);
  res.status(201).json(newPassword);
});

app.get("/passwords", (req, res) => {
  res.json(passwords);
});

app.get("/passwords/:id", (req, res) => {
  const item = passwords.find(p => p.id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(item);
});

app.put("/passwords/:id", (req, res) => {
  const item = passwords.find(p => p.id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Not found" });
  }

  const { site, username, password } = req.body;

  if (site) item.site = site;
  if (username) item.username = username;
  if (password) item.password = password;

  res.json(item);
});

app.delete("/passwords/:id", (req, res) => {
  const index = passwords.findIndex(p => p.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  passwords.splice(index, 1);
  res.json({ message: "Deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
});
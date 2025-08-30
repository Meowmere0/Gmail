const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'logs.json');

if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, '[]', 'utf8');
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/log', (req, res) => {
  const body = req.body || {};
  const record = {
    simulation: true,
    clicked: !!body.clicked,
    email_provided: !!body.email_provided,
    timestamp: body.timestamp || new Date().toISOString(),
    user_agent: body.user_agent || '',
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  };

  const arr = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
  arr.push(record);
  fs.writeFileSync(LOG_FILE, JSON.stringify(arr, null, 2));

  console.log('Saved simulation event:', record);
  res.json({ ok: true });
});

app.post('/log', (req, res) => {
  const body = req.body || {};
  const record = {
    simulation: true,
    clicked: !!body.clicked,
    email_provided: !!body.email_provided,
    timestamp: body.timestamp || new Date().toISOString(),
    user_agent: body.user_agent || '',
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  };

  // Just print to terminal instead of saving a file
  console.log('Simulation event:', record);

  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
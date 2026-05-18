const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();

const upload = multer({ dest: 'public/uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.array('images'), (req, res) => {
  res.sendStatus(200);
});

app.get('/images', (req, res) => {
  const files = fs.readdirSync('public/uploads');
  const urls = files.map(f => '/uploads/' + f);
  res.json(urls);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

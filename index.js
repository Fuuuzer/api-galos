const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express();
const PORT = 3000;

const imagesDir = path.join(__dirname, 'public/images');

app.get('/random-galo', (req, res) => {
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao acessar as imagens' });
    }

    const randomImage = files[Math.floor(Math.random() * files.length)];
    const imagePath = path.join(imagesDir, randomImage);

    res.sendFile(imagePath);
  });
});

app.use('/images', express.static(imagesDir));

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
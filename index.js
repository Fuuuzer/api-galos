const express = require('express');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

const imagesDir = path.join(__dirname, 'public/images');


const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: 'Máximo de requisições atigindo.'
})

app.use(limiter)

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
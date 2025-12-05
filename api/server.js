require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:4200', 'https://infinite-wallpapers.vercel.app']
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.get('/', (req, res) => {
  res.json({ msg: 'api working' });
});

app.get('/wallpapers/:page', async (req, res) => {
  try {
    const page = Number(req.params.page) || 1;

    const unsplashUrl = `https://api.unsplash.com/topics/wallpapers/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=${page}&per_page=30`;

    const response = await fetch(unsplashUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status || 500).json(data);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errors: ['Server error'] });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

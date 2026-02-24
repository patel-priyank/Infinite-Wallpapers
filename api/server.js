import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'api working' });
});

app.get('/api/wallpapers', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const unsplashUrl = `https://api.unsplash.com/topics/wallpapers/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&page=${page}&per_page=30`;

    const response = await fetch(unsplashUrl);

    const json = await response.json();

    if (!response.ok) {
      return res.status(response.status || 500).json({
        error: json.errors?.[0] || 'Failed to fetch'
      });
    }

    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = Number(process.env.PORT);

if (!process.env.PORT || !Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error('Port is undefined or invalid.');
}

if (!process.env.UNSPLASH_ACCESS_KEY) {
  throw new Error('Unsplash access key is undefined.');
}

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json()); 
// cors solo aceptando desde el front
app.use(cors({origin: process.env.URL_FRONT}));


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Backend grupo 04 lyep listening on port ${port}`);
});
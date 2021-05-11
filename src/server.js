const express = require('express');
const router = require('./routes/router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(router);
app.use((req, res) => {
  res.status(404).send({
    message: 'resource not found',
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

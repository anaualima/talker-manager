const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
// const talker = require('./Controller/talker');
// const error = require('./Middleware/error');

const talkerJson = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const data = await fs.readFile(talkerJson);
  const treatmentData = JSON.parse(data);
  if (treatmentData.length === 0) return res.status(200).json([]);
  console.log(typeof treatmentData);
  return res.status(200).json(treatmentData);
});

// app.use((err, req, res) => {
//   // console.error(err);
//   return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
// });

app.listen(PORT, () => {
  console.log('Online');
});

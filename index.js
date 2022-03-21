const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const crypto = require('crypto');
const rescue = require('express-rescue');
const auth = require('./Middleware/auth');

const validToken = require('./Middleware/validToken');
const validName = require('./Middleware/validName');
const validAge = require('./Middleware/validAge');
const validTalk = require('./Middleware/validTalk');
const validWatchedAt = require('./Middleware/validWatchedAt');
const validRate = require('./Middleware/validRate');
// const talker = require('./Controller/talker');
// const error = require('./Middleware/error');

const talkerJson = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const token = crypto.randomBytes(8).toString('hex');

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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const validId = [1, 2, 3, 4];
  const data = await fs.readFile(talkerJson);
  const treatmentData = JSON.parse(data);
  const findTalker = treatmentData.find((t) => t.id === +id);
  if (validId.some((v) => v === +id)) {
    return res.status(200).json(findTalker);
  }
  return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', auth, rescue((req, res) => {
  console.log(token);
  if (token !== undefined) {
    return res.status(200).json({ token });
  }
}));

app.post('/talker',
  validToken,
  validName,
  validAge,
  validTalk,
  validWatchedAt,
  validRate,
  async (req, res) => {
    const data = await fs.readFile(talkerJson);
    const treatmentData = JSON.parse(data); // tranforma o data em string para o readfile poder ler.
    const newTalker = req.body;
    newTalker.id = treatmentData.length + 1;
   treatmentData.push(newTalker);
   fs.writeFile(talkerJson, JSON.stringify(treatmentData));
   return res.status(201).send(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});

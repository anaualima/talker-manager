const talkerJson = require('../talker.json');

module.exports = (req, res) => {
  if (!talkerJson || talkerJson.length === 0) {
    return [];
  }
  return res.status(200).json({ talkerJson });
};
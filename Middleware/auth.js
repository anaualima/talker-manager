module.exports = ((req, res, next) => {
    const { email, password } = req.body;
    const number = 6;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?$/i;
    const validateEmail = regexEmail.test(String(email).toLowerCase());
    if (!email) {
        return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    }
    if (!validateEmail) {
        return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
        return res.status(400).send({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < number) {
        return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
});
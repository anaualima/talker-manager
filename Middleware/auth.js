module.exports = ((req, res, next) => {
    const number = 6;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?$/i;
    const validateEmail = regexEmail.test(String(req.headers.email).toLowerCase());
    if (!req.headers.email) {
        return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    }
    if (!validateEmail) {
        return res.status(400).send({ message: 'O "email" deve ter o formato email@email.com' });
    }
    if (!req.headers.password) {
        return res.status(400).send({ message: 'O campo "password" é obrigatório' });
    }
    if (req.headers.password < number) {
        return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
});
export function validateUserAndPassword (req, res, next) {
    const { email, password } = req.body;

    if(!email || !password) return res.sendStatus(400);

    next();
}
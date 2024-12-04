
function veterinariaAuth(req, res, next) {
    if (req.session.logado && req.session.veterinaria) {
        return next();
    }
    res.status(403).redirect('/veterinaria/login');
}

module.exports = { veterinariaAuth };

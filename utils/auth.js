//Para verificar el login y si es usuario
//dejarlo pasar

let autentication = (req, res, next) => {
    if (req.session && req.session.usuario)
        return next();
    else
        res.render('auth_login');
};

module.exports = autentication;
function checkLogin(req, res, next) {
    if(req.user) {
        next()
    } else {
        return res.status(401).send("El usuario no está logeado")
    }
}

module.exports = checkLogin;


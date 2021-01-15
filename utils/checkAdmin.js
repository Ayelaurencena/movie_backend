function checkAdmin(req, res, next) {
    if (req.user) {
        if(req.user.isAdmin) {
            next()
        } else {
            return res.status(403).send("El usuario no es Admin")
    } 
} else  {
    return res.status(401).send("El usuario no está logeado")
    }

}

module.exports = checkAdmin;

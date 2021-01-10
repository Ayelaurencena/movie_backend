const express = require('express');
const router = express.Router();
const UserController = require("./../controllers/userController");
const UserService = require("./../services/userService");
const UserInstance = new UserController(new UserService());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hola TP :)");
});


// [GET] /users -> Muestra una lista de usuarios, no tiene restricciones de acceso

router.get("/users", function(req, res, next) {
  UserInstance.getUsers(req, res);
})

// [GET] /users/:id -> Muestra la información de un usuario particular, no tiene restricciones de acceso

router.get("/user/:id", function(req, res, next) {
  UserInstance.getUser(req, res);
})

// [POST] /users -> Sirve para crear un usuario en la base de datos, no tiene restricciones de acceso

router.post("/users", function(req, res, next) {
  UserInstance.createUser(req, res);
})

// [PUT] /users/edit/:id -> Sirve para modificar un usuario en la base de datos. Necesita estar autenticado y ser admin para que se ejecute

router.put("/users/edit/:id", function(req, res, next) {
  UserInstance.editUser(req, res);
})

// [DELETE] /users/delete/:id -> Sirve para borrar un usuario de la base de datos. Necesita estar autenticado y ser admin para que se ejecute

router.delete("/users/delete/:id", function(req, res, next) {
  UserInstance.deleteuser(req, res);
})

module.exports = router;
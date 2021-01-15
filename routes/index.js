const express = require('express');
const router = express.Router();
const passport = require("passport");
const UserController = require("./../controllers/userController");
const UserService = require("./../services/userService");
const MovieController = require("./../controllers/movieController");
const MovieService = require("./../services/movieService");
const UserInstance = new UserController(new UserService());
const MovieInstance = new MovieController(new MovieService());
const checkAdmin = require("./../utils/checkAdmin");
const checkLogin = require("./../utils/checkLogin");

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
  UserInstance.getUserById(req, res);
})

// [POST] /users -> Sirve para crear un usuario en la base de datos, no tiene restricciones de acceso

router.post("/users", function(req, res, next) {
  UserInstance.createUser(req, res);
})

// [PUT] /users/edit/:id -> Sirve para modificar un usuario en la base de datos. Necesita estar autenticado y ser admin para que se ejecute

router.put("/users/edit/:id", checkLogin, function(req, res, next) {
  UserInstance.editUser(req, res);
})

// [DELETE] /users/delete/:id -> Sirve para borrar un usuario de la base de datos. Necesita estar autenticado y ser admin para que se ejecute

router.delete("/users/delete/:id", checkAdmin, function(req, res, next) {
  UserInstance.deleteUser(req, res);
})

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  return res.json({
    ok: true
  });
});

router.get("/api/verify", (req, res) => {
  return res.json(req.user);
});

// [GET] /movies -> Muestra un array con todas las películas. Solo se puede acceder autenticado

router.get("/movies", checkLogin, function(req, res, next) {
    MovieInstance.getMovies(req, res);
 
})

// [GET] /movies/:id -> Muestra la información de una película especīfica. Solo se puede acceder autenticado

router.get("/movies/:id", checkLogin, function(req, res, next) {
  MovieInstance.getMovieById(req, res);
})

// [POST] /movies -> Sirve para crear una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute

router.post("/movies", checkAdmin, function(req, res, next) {
  MovieInstance.createMovie(req, res);
})

// [PUT] /movies/edit/:id -> Sirve para modificar una película en la base de datos. Necesita estar autenticado y ser admin para que se ejecute

router.put("/movies/edit/:id", checkAdmin, function(req, res, next) {
  MovieInstance.editMovie(req, res);
})

// [DELETE] /movies/delete/:id -> Sirve para borrar una película de la base de datos. Necesita estar autenticado y ser admin para que se ejecute

router.delete("/movies/delete/:id", checkAdmin, function(req, res, next) {
  MovieInstance.deleteMovie(req, res);
})

module.exports = router;
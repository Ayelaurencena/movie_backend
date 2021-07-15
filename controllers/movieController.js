const { render, response } = require("../app");

class MovieController {

    constructor (movieService) {
        try {
            this.movieService = movieService;
        } catch(e) {
            console.log(e);
          return res.status(400).send("El id no corresponde a una pelicula existente");
        }
        
    }

    async getMovies(req, res) {
            const movies = await this.movieService.getMovies();
            res.json(movies);
    }

    async getMovieById(req, res) {
        const id = req.params.id;

        try {
            const movie = await this.movieService.getMovieById(id);
            return res.json(movie);

        } catch(e) {
            return res.status(400).send("La pelicula no existe");
        }

    }

    async createMovie(req, res) {
        const { body } = req;
        if(body.type == "serie" || body.type =="pelicula") {
            
            const { name, category, type } = req.body;
            const typeToLowerCase = type.toLowerCase();
            console.log(req.file);
            const { filename } = req.file;
            const data = {
                "name" : name,
                "category": category,
                "image" : filename,
                "type" : typeToLowerCase, 
            }
            try {

                const movie = await this.movieService.createMovie(data);
                console.log(movie);
                return res.status(200).json(movie);

            } catch(e) {
                return res.status(400).send("Corrige la información ingresada");
            }
        } else {
            res.status(400).send("Las categorias aceptadas son *serie* y *pelicula*");
        }
    }



    async editMovie(req, res) {
        const { name, category, type } = req.body;
        const typeToLowerCase = type.toLowerCase();
        const { id } = req.params;
        console.log(req.file);
        const { filename } = req.file;  
        const data = {
            "name" : name,
            "category": category,
            "image" : filename,
            "type" : typeToLowerCase, 
        }      
        try {
            const editedMovie = await this.movieService.editMovie(id, data);
            return res.json(editedMovie);
        } catch(e) {
            console.log(e);
            return res.status(400).send("No fue posible actualizar el elemento");
        }

    }




    async deleteMovie(req, res) {
        const { id } = req.params;       
        try {
            await this.movieService.deleteMovie(id);
            return res.status(200).send("La película ha sido borrada");
        } catch(e) {
            console.log(e);
            return res.status(400).send("El elemento que quiere borrar no existe");
        }

    }

} 

module.exports = MovieController;
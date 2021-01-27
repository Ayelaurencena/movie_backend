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
            return res.sendStatus(400)
        }

    }

    async createMovie(req, res) {
        const { body } = req;
       

        if(body.type == "serie" || body.type =="pelicula") {
            
            const { name, category, type } = req.body;
            const typeToLowerCase = type.toLowerCase();
            const { file } = req.file;
            const data = {
                "name" : name,
                "category": category,
                "image" : file,
                "type" : typeToLowerCase, 
            }
            try {

                const movie = await this.movieService.createMovie(data);
                console.log(movie);
                return res.status(200).json(movie);

            } catch(e) {
                return res.status(400);
            }
        } else {
            res.sendStatus(400);
        }
    }



    async editMovie(req, res) {
        const { body } = req;
        const { id } = req.params       
        try {
            const editedMovie = await this.movieService.editMovie(id, body);
            return res.json(editedMovie);
        } catch(e) {
            console.log(e);
            return res.sendStatus(400);
        }

    }




    async deleteMovie(req, res) {
        const { id } = req.params;       
        try {
            await this.movieService.deleteMovie(id);
            return res.status(200).send("La película ha sido borrada")
        } catch(e) {
            console.log(e);
            return res.sendStatus(400);
        }

    }

} 

module.exports = MovieController;
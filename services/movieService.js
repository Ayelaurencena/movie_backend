const Movie = require("./../models/movieModel");

class MovieService {

    async getMovies() {
        const query = await Movie.find().exec();
        return query;

    }

    async getMovieById(id) {
        const query = await Movie.findOne({"_id" : id}).exec();
        return query;


    }


    createMovie(data) {
            const newMovie = new Movie(data);
            return newMovie.save();

    }
    
// que pasa si quiero mandar solo el dato que se actualiza y no todo?

    async editMovie(id, data) {
        const query = await Movie.findOneAndUpdate({ _id: id}, data).exec();
        return query;

    }

    deleteMovie(id) {
        
        const query = Movie.deleteOne({ _id: id }).exec();
        return query;

    }
}

module.exports = MovieService;
from flask import Blueprint, jsonify, request
from http import HTTPStatus
from src.models.movie import Movie, MovieSchema
from src.services.session import SessionService
from src.services.movie import MovieService

movies_bp = Blueprint("movies_bp", __name__)


@movies_bp.route("/", methods=["GET"])
def get_movies(sessionService: SessionService, movieService: MovieService):
    sessionService.setSession()

    movies = movieService.getMovies()
    movies_data = MovieSchema().dump(movies, many=True)

    return jsonify(movies_data), HTTPStatus.OK


@movies_bp.route("/", methods=["POST"])
def like_movies(sessionService: SessionService, movieService: MovieService):
    liked_movies = request.form.getlist("movies")

    movies = movieService.getMovies()

    liked_movies_list = []
    for movie in movies:
        if str(movie.id) in liked_movies:
            liked_movies_list.append(movie)

    sessionService.setLikedMovies(liked_movies_list)
    return "", HTTPStatus.OK


@movies_bp.route("/liked", methods=["GET"])
def get_liked_movies(sessionService: SessionService):
    try:
        liked_movies = sessionService.getLikedMovies()
        return jsonify(liked_movies), HTTPStatus.OK
    except Exception as err:
        print("err: ", err, flush=True)
        return "", HTTPStatus.INTERNAL_SERVER_ERROR


@movies_bp.route("/actor", methods=["GET"])
def get_actors_in_liked_movies(sessionService: SessionService):
    liked_movies = sessionService.getLikedMovies()
    return "", HTTPStatus.OK

from flask import Blueprint, jsonify, request
from http import HTTPStatus
from src.models.movie import Movie, MovieSchema
from src.services.session import SessionService

movies_bp = Blueprint("movies_bp", __name__)


@movies_bp.route("/", methods=["GET"])
def get_movies(sessionService: SessionService):
    sessionService.setSession()

    movies = [Movie(1, "cool movie"), Movie(2, "another awesome movie"), Movie(3, "test movie")]

    movies_data = MovieSchema().dump(movies, many=True)

    return jsonify(movies_data), HTTPStatus.OK


@movies_bp.route("/", methods=["POST"])
def like_movies(sessionService: SessionService):
    liked_movies = request.form.getlist("movies")
    sessionService.setLikedMovies(liked_movies)

    return "", HTTPStatus.OK


@movies_bp.route("/liked", methods=["GET"])
def get_liked_movies(sessionService: SessionService):
    liked_movies = sessionService.getLikedMovies()
    return jsonify({"movies": liked_movies}), HTTPStatus.FOUND

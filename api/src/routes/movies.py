from flask import Blueprint, jsonify, request
from http import HTTPStatus
from src.services.session import SessionService

movies_bp = Blueprint("movies_bp", __name__)


@movies_bp.route("/", methods=["GET"])
def get_movies(sessionService: SessionService):
    sessionService.setSession()
    return jsonify({"movies": []}), HTTPStatus.OK


@movies_bp.route("/", methods=["POST"])
def like_movies(sessionService: SessionService):
    liked_movies = request.form.getlist("movies")
    sessionService.setLikedMovies(liked_movies)

    return "", HTTPStatus.OK


@movies_bp.route("/liked", methods=["GET"])
def get_liked_movies(sessionService: SessionService):
    liked_movies = sessionService.getLikedMovies()
    return jsonify({"movies": liked_movies}), HTTPStatus.FOUND

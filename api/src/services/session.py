from flask import session
from src.models.movie import MovieSchema, Movie
from typing import List


class SessionKeys:
    LIKED_MOVIES = "LIKED_MOVIES"


class SessionService:
    movieSchema = MovieSchema()

    def setSession(self):
        session[SessionKeys.LIKED_MOVIES] = []

    def setLikedMovies(self, movies: List[str]):
        session[SessionKeys.LIKED_MOVIES] = movies

    def getLikedMovies(self):
        if SessionKeys.LIKED_MOVIES not in session:
            raise Exception("No session key")
        return session[SessionKeys.LIKED_MOVIES]

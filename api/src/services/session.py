from flask import session
from src.models.movie import MovieSchema, Movie
from typing import List


class SessionKeys:
    LIKED_MOVIES = "LIKED_MOVIES"


class SessionService:
    movieSchema = MovieSchema()

    def setSession(self):
        session[SessionKeys.LIKED_MOVIES] = []

    def setLikedMovies(self, movies: List[Movie]):
        liked_movies_data = self.movieSchema.dump(movies, many=True)
        session[SessionKeys.LIKED_MOVIES] = liked_movies_data
        session.modified = True

    def getLikedMovies(self) -> List[Movie]:
        if SessionKeys.LIKED_MOVIES not in session:
            raise Exception("No session key")

        liked_movies_dict = session[SessionKeys.LIKED_MOVIES]
        liked_movies = self.movieSchema.load_multiple(liked_movies_dict)
        return self.movieSchema.dump(liked_movies, many=True)

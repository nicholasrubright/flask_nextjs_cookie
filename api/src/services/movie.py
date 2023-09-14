from src.models.movie import Movie, MovieSchema
from typing import List


class MovieService:
    name: str = "MovieService"

    movies: List[Movie] = []

    def __init__(self):
        self.movies = [
            Movie(1, "cool movie"),
            Movie(2, "another awesome movie"),
            Movie(3, "test movie"),
        ]

    def getMovies(self) -> List[Movie]:
        return self.movies

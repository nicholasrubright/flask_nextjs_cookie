from flask import Flask
from injector import Module, singleton
from src.services.movie import MovieService


from flask_marshmallow import Marshmallow


class AppModule(Module):
    def __init__(self, app: Flask):
        self.app = app

    def configure(self, binder):
        binder.bind(Marshmallow, to=self.getMarshmallow(), scope=singleton)
        binder.bind(MovieService, to=self.getMovieService(), scope=singleton)

    def getMarshmallow(self) -> Marshmallow:
        return Marshmallow(self.app)

    def getMovieService(self) -> MovieService:
        return MovieService()

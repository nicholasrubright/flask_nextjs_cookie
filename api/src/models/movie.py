from marshmallow import Schema, fields, pre_load
from typing import Dict, List


class Movie:
    id: int
    title: str

    def __init__(self, id: int, title: str):
        self.id = id
        self.title = title

    def toJSON(self) -> Dict:
        return {"id": self.id, "title": self.title}

    def __repr__(self) -> str:
        return f"<Movie (id={self.title}, title={self.title})>"


class MovieSchema(Schema):
    id = fields.Int()
    title = fields.Str()

    @pre_load
    def make_obj(self, data, **kwargs):
        return {"id": data["id"], "title": data["title"]}

    def load(self, *args, **kwargs) -> Movie:
        data = super().load(*args, **kwargs)
        return Movie(**data)  # type: ignore

    def load_multiple(self, data) -> List[Movie]:
        return [self.load(d) for d in data]

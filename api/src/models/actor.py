from marshmallow import Schema, fields, pre_load
from typing import Dict, List


class Actor:
    id: int
    name: str

    def __init__(self, id: int, name: str):
        self.id = id
        self.name = name

    def toJSON(self) -> Dict:
        return {"id": self.id, "name": self.name}

    def __repr__(self) -> str:
        return f"<Actor (id={self.id}, name={self.name})>"


class ActorSchema(Schema):
    id = fields.Int()
    name = fields.Str()

    @pre_load
    def make_obj(self, data, **kwrags):
        return {"id": data["id"], "name": data["name"]}

    def load(self, *args, **kwargs) -> Actor:
        data = super().load(*args, **kwargs)
        return Actor(**data)  # type: ignore

    def load_multiple(self, data) -> List[Actor]:
        return [self.load(d) for d in data]

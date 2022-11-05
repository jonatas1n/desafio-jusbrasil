from enum import Enum
import json

with open('database.json') as file:
    database = json.load(file)

class Response(Enum):
    SUCCESS = 1
    WRONG_LENGTH = 2
    INVALID_CODE = 3
    NOT_FOUND = 4

class Database:
    def __init__(self):
        self.database = database

    def __validate_code(self, code: str) -> Response:
        if len(code) != 20:
            return Response.WRONG_LENGTH

        sequencial = code[:7]
        dd = code[7:9]
        year = code[9:13]
        j = code[13]
        tr = code[14:16]
        origin = code[16:]

        n1 = int(sequencial) % 97
        n1 = str(n1).rjust(2, '0')
        n2 = int(f"{n1}{int(year)}{int(j)+int(tr)}") % 97
        n2 = str(n2).rjust(2, '0')
        n3 = 98 - ((int(f"{n2}{int(origin)}") * 100) % 97)

        if dd != str(n3).rjust(2, '0'):
            return Response.INVALID_CODE

        return Response.SUCCESS

    def search(self, page: int, limit: int, parameters: dict):
        data = self.database

        for parameter, value in parameters.items():
            data = [item for item in data if value in item[parameter]]
        data = data[limit*page:limit*(page+1)+1]

        return data

    def process(self, lawsuit_id: str):
        validation = self.__validate_code(lawsuit_id)
        
        data = self.database


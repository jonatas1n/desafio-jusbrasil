from fastapi import FastAPI
from enum import Enum

class errorResponse(Enum):
    WRONG_LENGTH = 2
    INVALID_CODE = 3

app = FastAPI()

def validate_code(code):
    if len(code) != 20:
        return errorResponse.WRONG_LENGTH

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
        return errorResponse.INVALID_CODE

    return True

@app.get("/process/{code}")
async def process(code):
    code = str(code)

    check = validate_code(code)
    if check:
        return {
            'message': code,
            'status': 'success'
        }
    if check == errorResponse.WRONG_LENGTH:
        return {
            'message': 'Lawsuit ID should have 20 digits',
            'status': 'fail'
        }

@app.get("/search")
async def search(page=0, limit=30, advocacy_name=None, tribunal=None, parts_name=None):
    pass

@app.get("/resume/{code}")
async def resume(code):
    if not validate_code(code):
        return {
            'status': 'fail',
            'message': '',
        }

    return {
        'message': f"Resume of Lawsuit ID {code}",
        'status': 'success'
    }

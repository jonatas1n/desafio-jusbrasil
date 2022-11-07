from fastapi import FastAPI

app = FastAPI()

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

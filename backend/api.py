from fastapi import FastAPI
from database import Database
from fastapi_pagination import Page, add_pagination, paginate
from models import SearchResponse, PostRequest, MovementResponse, FiltersRequest
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

database = Database()
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:7755",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/{code}")
async def process(code:str):
    process = database.get_process(code)
    if process is None:
        return
    return process

@app.get("/", response_model=Page[SearchResponse])
async def search(search:str|None=None):
    if search is None:
        return
    results = database.search(search)
    return paginate(results)

@app.post("/",  response_model=Page[SearchResponse])
async def filtered_search(filters: PostRequest,):
    filters = [tuple(filter) for filter in filters if filter[1] is not None]
    filters = dict(filters)
    results = database.filtered_search(**filters)
    return paginate(results)

@app.get("/participants/{code}")
async def get_participants(code:str, type:str='active'):
    type_functions = {
        'active': database.get_active,
        'passive': database.get_passive,
        'others': database.get_others,
    }
    participants = type_functions[type](code)
    return participants

@app.get('/movement/{code}')
async def get_movement(code: str):
    result = database.get_movement(code)
    return result

@app.post('/filters/')
async def get_filter_list(filters: FiltersRequest):
    filters = [tuple(filter) for filter in filters if filter[1] is not None]
    filters = dict(filters)
    results = database.get_filters_list(**filters)
    return results

add_pagination(app)

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=7700)
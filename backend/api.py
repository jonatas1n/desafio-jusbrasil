from fastapi import FastAPI
from database import Database
from fastapi_pagination import Page, add_pagination, paginate
from models import SearchResult, PostRequest, ParticipantResponse

from fastapi.middleware.cors import CORSMiddleware

database = Database()
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
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

@app.get("/", response_model=Page[SearchResult])
async def search(search:str|None=None):
    if search is None:
        return
    results = database.search(search)
    return paginate(results)

@app.post("/",  response_model=Page[SearchResult])
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
    movement = database.get_movement(code)
    return movement

@app.get('/filters/{filter_key}')
async def get_filter_list(filter_key):
    filter_options = {
        'court': database.get_court_list,
        'judgeBody': database.get_judge_body_list,
        'judgeClass': database.get_judge_class_list,
        'jurisdiction': database.get_jurisdiction_list
    }
    if filter_key not in filter_options:
        return []
    return sorted(filter_options[filter_key]())

add_pagination(app)
from fastapi import FastAPI
from database import Database
from fastapi_pagination import Page, add_pagination, paginate
from models import SearchResponse, PostRequest, FiltersRequest
import uvicorn

from fastapi.middleware.cors import CORSMiddleware

database = Database()

description = '''
**Probusca - Se mantenha atualizado sobre os processos que você tem interesse** 🔎
----
Essa API retorna dados sobre processos extraídos de diversos estados Brasileiros, entre várias comarcas e tribunais.

Os dados persistidos aqui são de 11 estados:
- Amapá *(TJPA)*
- Amazonas *(TRF1)*
- Ceará *(TJCE)*
- Distrito Federal *(CNJ)*
- Espírito Santo  *(TJES)*
- Mato Grosso *(TJMT)*
- Minas Gerais *(TJMG)*
- Paraíba *(TJPB)*
- Piauí *(TRF1)*
- Tocantins *(TRF1)*
'''

tags_metadata = [
    {
        "name": "Processo",
        "description": "Retorna dados sobre o processo do número indicado.",
    },
    {
        "name": "Busca",
        "description": "Retorna o resultado de uma busca por processos.",
    },
    {
        "name": "Busca Filtrada",
        "description": "Retorna o resultado de uma busca, mas com filtros nos parâmetros."
    },
    {
        "name": "Participantes",
        "description": "Retorna todos os participantes de determinado processo."
    },
    {
        "name": "Movimentação",
        "description": "Retorna a movimentação de determinado processo."
    },
    {
        "name": "Filtros",
        "description": "Retorna uma lista de filtros para utilização no frontend."
    }
]

app = FastAPI(
    title="Probusca API",
    description=description,
    version='2.1.0',
    contact={
        "name": "Jônatas Gomes Barbosa da Silva",
        "email": "jonatasgomesb@gmail.com"
    },
    openapi_tags=tags_metadata
)

origins = ["http://localhost",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/{code}", tags=["Processo"])
async def process(code:str):
    process = database.get_process(code)
    if process is None:
        return "No process found"
    return process

@app.get("/api/", response_model=Page[SearchResponse], tags=["Busca"])
async def search(search:str|None=None):
    if search is None:
        return "No parameters set"
    results = database.search(search)
    return paginate(results)

@app.post("/api/",  response_model=Page[SearchResponse], tags=["Busca Filtrada"])
async def filtered_search(filters: PostRequest,):
    filters = [tuple(filter) for filter in filters if filter[1] is not None]
    filters = dict(filters)
    results = database.filtered_search(**filters)
    return paginate(results)

@app.get("/api/participants/{code}", tags=["Participantes"])
async def get_participants(code:str, type:str='active'):
    type_functions = {
        'active': database.get_active,
        'passive': database.get_passive,
        'others': database.get_others,
    }
    participants = type_functions[type](code)
    return participants

@app.get('/api/movement/{code}', tags=["Movimentação"])
async def get_movement(code: str):
    result = database.get_movement(code)
    return result

@app.post('/api/filters/', tags=["Filtros"])
async def get_filter_list(filters: FiltersRequest):
    filters = [tuple(filter) for filter in filters if filter[1] is not None]
    filters = dict(filters)
    results = database.get_filters_list(**filters)
    return results

add_pagination(app)

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=7700)
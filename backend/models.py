from pydantic import BaseModel

class SearchResponse(BaseModel):
    subject: str | None
    date: str | None
    lawsuitID: str | None
    judgeClass: str | None
    judgeBoy: str | None
    court: str | None
    state: str | None
    jurisdiction: str | None

class PostRequest(BaseModel):
    subject: str | None
    date: str | None
    lawsuitID: str | None
    judgeClass: str | None
    judgeBoy: str | None
    participant: str | None
    court: str | None
    state: str | None
    jurisdiction: str | None

class MovementResponse(BaseModel):
    data: str
    content: str

class FiltersRequest(BaseModel):
    court: str | None
    judgeClass: str | None
    judgeBody: str | None
    jurisdiction: str | None
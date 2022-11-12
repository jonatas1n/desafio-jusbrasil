from pydantic import BaseModel

class SearchResult(BaseModel):
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

class ParticipantResponse(BaseModel):
    type: str | None
    is_active: str | bool | None
    name: str | None
    OAB: str | None
    text: str | None
    id: str | None
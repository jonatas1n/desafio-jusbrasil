all:
	cd probusca && npm run dev && cd ../backend && uvicorn api:app

dev:
	cd probusca && npm run dev

api:
	cd backend && uvicorn api:app
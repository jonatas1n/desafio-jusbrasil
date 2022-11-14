up:
	docker-compose up probusca_server probusca_api

attach:
	docker exec -it probusca_server bash

attach_api:
	docker exec -it probusca_api bash

test:
	docker-compose up tests
up:
	docker-compose up nginx

attach:
	docker exec -it probusca_server bash

attach_api:
	docker exec -it probusca_api bash

test:
	docker-compose up tests
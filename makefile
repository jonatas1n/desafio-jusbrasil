COMPOSE=docker-compose
EXEC=docker exec -it

up:
	$(COMPOSE) up nginx

restart:
	$(COMPOSE) restart

build:
	$(COMPOSE) build

attach:
	$(EXEC) probusca_server bash

attach_api:
	$(EXEC) probusca_api bash

test:
	$(COMPOSE) up tests
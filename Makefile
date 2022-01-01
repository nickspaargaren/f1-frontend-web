info: 
	@echo "  make build       Build the project images."
	@echo "  make start       Start the project containers."
	@echo "  make stop        Stop the project containers."
	@echo "  make dev         Start the project containers including dev output."
	@echo "  make reset       Reset the project containers & volumes."
build:
	@docker-compose build
start:
	@docker-compose up -d
	@echo ""
	@echo "  The fronted is running on http://localhost:3000/."
	@echo ""
stop:
	@docker-compose stop
dev:
	@docker-compose up
reset:
	@docker-compose down -v
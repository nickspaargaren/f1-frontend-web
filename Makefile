info: 
	@echo "  make build			Build the project images."
	@echo "  make start			Start the project containers."
	@echo "  make stop			Stop the project containers."
	@echo "  make dev			Start the project containers including dev output."
	@echo "  make update			Update all dependencies in root, frontend and backend folders."
	@echo "  make reset			Reset the project containers, volumes, local dependencies and cache files."

build: \
	do-install-dependencies
	@echo ""
	@docker-compose build

start:
	@docker-compose up -d
	@docker-compose exec frontend sh -c "yarn prisma:setup && yarn prisma:generate"
	@docker-compose exec frontend sh -c "yarn prisma db seed"
	@echo ""
	@echo "  The project is running on http://localhost:3000/."
	@echo ""

stop:
	@docker-compose stop

dev:
	@docker-compose up

update: do-update-dependencies

reset: \
	do-remove-nodemodules
	sudo rm -rf postgres-data
	@docker-compose down -v

# Installing dependencies
do-install-dependencies:
	@echo ""
	@echo "Installing local dependencies.."
	yarn install

# Upgrade dependencies
do-update-dependencies:
	@echo ""
	@echo "Updating dependencies.."
	yarn upgrade-interactive --latest

# Remove dependencies & cache
do-remove-nodemodules:
	@echo ""
	@echo "Removing all node_modules folders.."
	sudo rm -rf node_modules
	@echo "All node_modules folders removed.."
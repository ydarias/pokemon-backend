docker-build:
	docker build -t pokemon-backend .

docker-run:
	docker run --name pokemon-backend-instance -p3000:3000 pokemon-backend:latest

docker-clean:
	docker rm -f pokemon-backend-instance
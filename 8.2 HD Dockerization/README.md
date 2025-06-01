Fork the project repo
CLone it to the local
Install node again in the terminal
Install docker in your system
OSX: https://docs.docker.com/desktop/setup/install/mac-install/
Windows: https://docs.docker.com/desktop/setup/install/windows-install/
Ubuntu: https://docs.docker.com/engine/install/ubuntu/
Update Dockerfile and docker-compose.yml
In terminal run the following to create image
docker-compose build -This command builds your Docker images based on your docker-compose.yml file and the specified Dockerfile.
docker-compose up - This command starts (and builds if needed) your containers and runs your full app.
Open browser to access:
"http://localhost:3000/api/student"
Expected output:
{"name":"Uttam Nepal","studentId":"224968443"}
To confirm docker container is running in cmd
Run"docker ps"

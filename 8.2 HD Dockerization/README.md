Fork the project repo
CLone it to the local
Install node again in the terminal
Install docker in your system
OSX: https://docs.docker.com/desktop/setup/install/mac-install/
Windows: https://docs.docker.com/desktop/setup/install/windows-install/
Ubuntu: https://docs.docker.com/engine/install/ubuntu/
In terminal write the following to create image
"docker build -f backend/Dockerfile -t express-docker-app ." //change file path here
Run container in the terminal
"docker run -p 3000:3000 express-docker-app"
Open browser to access:
"http://localhost:3000/api/student"
Expected output:
{"name":"Uttam Nepal","studentId":"224968443"}
To confirm docker container is running in cmd
Run"docker ps"

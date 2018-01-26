# VAR ELA Web Client

It's an implementation of a web client to define and launch genomic analyses against the [var-ela-data-server](https://gitlab.com/dani.rg15/var-ela-data-server ""), which is intended to perform the jobs in a remote machine such as grid computing centers, or similar.


# Connect with analysis server
This applications uses the API exposed by [var-ela-data-server](https://gitlab.com/dani.rg15/var-ela-data-server "") to send jobs and retrieve the results computed. Also provides an easy way to connect to different compute-centers to create and execute jobs.

To be able to connect to a remote machine, there must be installed the [var-ela-data-server](https://gitlab.com/dani.rg15/var-ela-data-server "") module in the remote compute-machine. Then providing the remote host, port where is running [var-ela-data-server](https://gitlab.com/dani.rg15/var-ela-data-server ""), you can administrate all the analyses hosted in the compute-machine we are connected to.


# Use
The application runs inside a Docker containaer, so to deploy this app just run the following commands.

#### Install docker
```sh
$ sudo apt -y install docker docker-compose
```

#### Clone git repo
```sh
$ git clone https://gitlab.com/dani.rg15/var-ela-app-server.git
```

#### Run app
```sh
$ cd var-ela-app-server
$ sudo docker-compose up
```
The app will run in port 3000 by default, this can be changed in .env



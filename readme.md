# XXXXXXX

XXXXXX is an implementation of a web client to define and launch genomic analyses against the XXXXXx module, which is intended to perform the jobs in a remote machine such as grid computing centers, or similar.

#Architecture
	*Comming soon!*

# Connect with analysis server
This applications just use the API exposed by XXXXX_data_server to send jobs and retrieve the results computed. Also provides an easy way to connect to different compute-centers to create and execute jobs.

To be able to connect to a remote machine, there must be installed the XXX_data_server module in the remote compute-machine. Then providing the remote host, port where is running XXX_data_server, and API Key issued by XXXX_data_server you can administrate all the analyses hosted in the compute-machine we are connected to.

# Use
	The application runs inside a Docker containaer. To deploy this app just run the following commands.

#### Install docker
```sh
$ sudo apt -y install docker docker-compose
```

#### Clone git repo
```sh
$ git clone XXXX_repo
```

#### Run app
```sh
$ cd XXXXX
$ sudo docker-compose up
```
The app will run in port 3000 by default, this can be changed in .env

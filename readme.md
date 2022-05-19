
# E-commerce Rest API

developed with nodejs and mongodb

##### How to setup local server: 

1. clone this repository and cd into the local repository
2. run "npm install" to install all the dependencies
3. run "npm run start" to start the local server. the server will start on port 8000.

The local server is now running. 

The apis can be tested using postman. Here is a guide to test the api on postman:  
1. Import the postman collection: 
   [click to get postman collection](https://www.postman.com/collections/45d9dd1f012830aa18f4)


2. set up a new environment. Add environment variable: =>
   
   baseUrl: `http://localhost:8000/api/v1`

3. Make sure that this environment is selected.

Now all requests made from postman collection should be getting expected response from the server.

Thank you!
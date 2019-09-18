# RedisAdancedMovieIndexSearch
A simple API that shows the functionality of Redis and how to use it on A MongoDB dataBase to optimize the search speed 

To run this project 
+ first you need to download [mongo](https://www.mongodb.com/download-center/charts) and [redis](https://redis.io/download) as well as [node](https://nodejs.org/en/download/) on your local machine
+ after that you need to import the CSV or the JSON dataBase into the mongoDB dataBases using this command from the command line :
```mongoimport --db dataBaseAdi --collection collectionAdi --type csv --headerline --file csvDosyaAdi.csv ```
+ after that from the same directory of the project.js file open the command line and run the following code to initialize the project envo
```npm init ```
+ then you have to install the required libraries 
```
npm install express
npm install redis
npm install body-parser
npm install mongoose

```
now to run the app node ```moviesIndexDemo.js```
after that your site should be running at : [http://127.0.0.1:3000](http://127.0.0.1:3000)
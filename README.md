# RedisAdancedMovieIndexSearch
A simple API that shows the functionality of Redis and how to use it on A MongoDB dataBase to optimize the search speed 

To run this project 
+ first you need to download [mongo](https://www.mongodb.com/download-center/charts) and [redis](https://redis.io/download) as well as [node](https://nodejs.org/en/download/) on your local machine
+ after that you need to import the CSV or the JSON dataBase into the mongoDB dataBases using this command from the command line :
```mongoimport --db dataBaseAdi --collection collectionAdi --type csv --headerline --file csvDosyaAdi.csv ```
+ after that from the same directory of the app.js file open the command line and run the following code to initialize the project envo
```npm init ```
+ then you have to install the required libraries 
```javascript
npm install express
npm install redis
npm install body-parser
npm install mongoose

if (isAwesome){
  return true
}

```
now to run the app node ```moviesIndexDemo.js```
after that your site should be running at : [http://127.0.0.1:3000](http://127.0.0.1:3000)

![alt text](https://github.com/daniMusli/RedisAdancedMovieIndexSearch/blob/master/img1.jpg)

the concept of this project is to check wether the movie exists in the redis cache or not before actually checking the Database which 
significantly improves the efficiency of the searching process , and if not then add it to the cache for a period of time in case it got frequently requested again . this method is extremly helpfull when dealing with big and complex dataBases .

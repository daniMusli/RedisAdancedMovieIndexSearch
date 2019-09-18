
//curl -i -X GET "http://127.0.0.1:3000"
//curl -i -X POST   -d film="What Happens in Vegas" "http://localhost:3000/"
//curl -i -X POST  -d film="Waitress" "http://localhost:3000/"


var express=require('express');
var redis=require('redis');
var	bodyParser=require('body-parser');//To be able to parse the incoming request bodies
var	mongoose=require('mongoose');//To be able to connect to a MongoDB Database
var app=express();
var redisClient=redis.createClient();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json()); 

mongoose.connect('mongodb://127.0.0.1/moviesProject',{ useNewUrlParser: true },function(err,res){
	if(err)
		console.log('Connection to MongoDB Database failed.');
	console.log('Successfully Connected to MongoDB Database Called moviesProject.');
});
var movieSchema=new mongoose.Schema({
   
    "Film":{type:String},
	"Genre":{type:String},
	"Lead Studio":{type:String},
	"Audience score %":{type:Number},
	"Profitability":{type:Number},
	"Rotten Tomatoes %":{type:Number},
    "Worldwide Gross":{type:String},
    "Year":{type:Number}},
	{collection:'filmler'}
);
var film=mongoose.model('Movie',movieSchema); 


app.get('/',function(req,res){
 var html =  createFirstHtmlPage()  
 res.send(html)
});
app.post('/',function(req,res){
 var filmName = req.body.film
 redisClient.exists(filmName,function(err,reply){
 if(reply==1)
 {
   console.log('The film ('+filmName+') exists in the Redis Cache.')
   redisClient.get(filmName,function(err,val){res.send(val)});       
 }     
   
 else
 {
   console.log('The film ('+filmName+') does not exist in the Redis Cache.');
   film.findOne({"Film":filmName},function(err,movie){
   if(err)
     return res.send({status:500,message:err.message});
   if(!movie) 
     return res.send(""+filmName+"  Not found in the Database.")
   var htmlContent=createSecondHtmlPage(movie["Film"],movie["Genre"],movie["Lead Studio"],movie["Audience score %"],movie["Profitability"],movie["Rotten Tomatoes %"],movie["Worldwide Gross"],movie["Year"])
   redisClient.set(filmName,htmlContent,function(err,reply){
     if(!err)
	   console.log('A new film ('+filmName+') has been inserted into Redis Cache.');
   });
   redisClient.expire(filmName,300);
   res.send(htmlContent) 
  })   
 }     
 })     
})
app.listen(3000,function(){
	console.log('   Server Running at http://127.0.0.1:3000');
});
function createFirstHtmlPage()
{
    var htmlPage = '<!DOCTYPE html>'+
                '<html>'+
                  '<head>'+
                   '<title>Guncel Project 3</title>'+
                  '</head>'+
                  '<body>'+ 
                   '<form action="/" method="post">'+
                    '<input type="text" name="film" placeholder="Enter A Movie Name">'+
                     '<input type="submit" value="search">'+
                   '</form>'+
                  '</body>'+
                 '</html> ' 
return htmlPage                
}
function createSecondHtmlPage(full_name,genre,lead_studio,audience_score,profitability,rotten_tomatoes,worldwide_gross,year)
{
	var content='<!DOCTYPE html>'+
                '<html>'+
                  '<head>'+
                   '<title>Guncel Project 3</title>'+
                  '</head>'+
                  '<body>'+ 
                   '<form action="/" method="post">'+
                    '<input type="text" name="film" placeholder="Enter A Movie Name">'+
                     '<input type="submit" value="search">'+
                   '</form><br><br><br>'+
    			   '<table style="height:200px;width:600px;">'+
        			'<tr>'+
					 '<td><b>Film:</b></td>'+
			   		 '<td>'+full_name+'</td>'+
        			'</tr>'+
            		'<tr>'+
         			 '<td><b>Genre:</b></td>'+
                	 '<td>'+genre+'</td>'+
            		'</tr>'+
            		'<tr>'+
            		 '<td><b>Lead Studio:</b></td>'+
                	 '<td>'+lead_studio+'</td>'+
          			'</tr>'+
            		'<tr>'+
                     '<td><b>Audience score %:</b></td>'+
               	     '<td>'+audience_score+'</td>'+
          			'</tr>'+
           			'<tr>'+
					 '<td><b>Profitability:</b></td>'+
				     '<td>'+profitability+'</td>'+
           			'</tr>'+
            		'<tr>'+
            		 '<td><b>Rotten Tomatoes %:</b></td>'+
                	 '<td>'+rotten_tomatoes+'</td>'+
           			'</tr>'+
            		'<tr>'+
            		 '<td><b>Worldwide Gross:</b></td>'+
                	 '<td>'+worldwide_gross+'</td>'+
           			'</tr>'+
            		'<tr>'+
            		 '<td><b>Year:</b></td>'+
                	 '<td>'+year+'</td>'+
           			'</tr>'+                    
				   '</table>'+
				  '</body>'+
				'</html>';
	return content; 
}
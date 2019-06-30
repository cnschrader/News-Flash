
// Requiring necessary node packages.
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// requiring handlebars

var exphbs = require('express-handlebars');

// axios for apis, and cheerio for scraping.
const axios = require('axios');
const cheerio = require('cheerio');

// Getting access to the models created with mongoose. 
const db = require('./models');

// Establishing the port that will be used 
const PORT = 3000

// connecting to the mongodb
mongoose.connect('mongodb://localhost/NewsFlash',{ useNewUrlParser: true });



// Using express
var app = express();

// Using morgan
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Making the public file static
app.use(express.static('public'));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

  //Routes==============================
  app.get('/', function(req, res){
      axios.get('https://www.buzzfeednews.com/',).then(function(response){
        const $ = cheerio.load(response.data);
        const results = [];

        $('article').each(function(i, element){
            
            const title = $(element).text();

            const link = $(element).children().attr('href')
            
            results.push({
                title: title,
                link: link
            })


            db.Article.create(results)
            .then(function(dbArticle){
                console.log(dbArticle)
                
            })
            .catch(function(err){
                console.log(err);
            });
        });
       

        res.send(results)
        
      })
  })

  
// Server is listening on port 3000
  app.listen(PORT, function() {
    console.log('App running on port ' + PORT + '!');
  });
  


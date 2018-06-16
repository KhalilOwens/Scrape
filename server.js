var cheerio = require("cheerio");
var request = require("request");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
const Article = require("./models/Article.js");
const Notes = require("./models/Note.js");
var axios = require("axios");
var cheerio = require("cheerio");
var logger = require("morgan");

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));


app.listen(3000);

mongoose.connect(MONGODB_URI);

console.log("Grabbing an article");


request('https://www.nytimes.com/', function (error, response, body) {
   
    var $ = cheerio.load(body);

    var results = [];

    $(".story-heading").each(function (i, element) {

        var heading = $(element).children().text();

        var link = $(element).children("a").attr("href");

        var summary = $(".summary").text();

        
        results.push({
            heading: heading,
            link: link,
            summary: summary
        })


    });

    Article.create(results)
        .then(function (dbexample) {
            console.log(dbexample)
        }).catch(function (err) {
            console.log(err.message)
        })

        ;


});



app.post("/submit", function (req, res) {
   // event.preventDefault();
    Notes.create(req.body)
        .then(function (Anote) {

            return Article.findOneAndUpdate({}, { $push: { Notes: Anote_id } }, { new: true });
        }).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });

});



app.get("/populated", function (req, res) {
    Article.find({})
        .populate('Notes')
        .then(function (Anote) {
            res.json(Anote);
        }).catch(function (err) {
            res.json(err);
        });




});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.render('index', { dbArticle });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

app.get("/Notes", function (req, res) {
    // Grab every document in the Articles collection
    Notes.find({})
        .then(function (Anote) {
            // If we were able to successfully find Articles, send them back to the client
            res.render('index', { Anote });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});



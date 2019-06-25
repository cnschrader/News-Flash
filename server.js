
// Requiring necessary node packages.
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

// requiring handlebars
var express = require("express");
var exphbs = require("express-handlebars");

// axios for apis, and cheerio for scraping.
const axios = require('axios');
const cheerio = require('cheerio');

// Getting access to the models created with mongoose. 
const db = require('./models');

// Establishing the port that will be used 
const PORT = 3000

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


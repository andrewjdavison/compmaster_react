var config = require('config');
var express = require('express');
var mysql = require('mysql');
var db = require('mysql-promise')();

db.configure({
  "host": config.get('Database.host'),
  "user": config.get('Database.user'),
  "password": config.get('Database.password'),
  "database": config.get('Database.database'),
  "debug": config.get('Database.debug'),
});

module.exports = db;


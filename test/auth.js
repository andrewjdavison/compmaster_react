"use strict";
process.env.NODE_ENV="test";

global.rootRequire = function(name) {
  return require( __dirname + '/../' + name);
};

var config = require('config');
var cmConst = require('../common/const');
var capabilities = require('../common/capabilities');

var assert = require('chai').assert;
var Auth = require('../models/auth');

var request = require('supertest');

//var request = supertest(config.get('cmsRoot')+':'+config.get('port_https'));

var express = require('express');
var app = require('../app.js');

describe('Auth Class', function(){
  describe('constructor', function(){
    var auth = new Auth();
    it('should have a null id', function() {
      assert.equal(auth.id,null);
    });
    it('should have a null username', function() {
      assert.equal(auth.username, null);
    });
    it('should have a null password', function() {
      assert.equal(auth.password, null);
    });
  });
  describe('save', function() {
    var auth = new Auth();
    var oldPassword=null;
    before(function(){
      return auth.build()
      .then(function() {
        auth.username='andrew';
        auth.password='test123';
        auth.userid=1;
        auth.permissions = capabilities.test | capabilities.admin;
        oldPassword=auth.password;
      });
    });
    it('should have a null id before the save', function(){
      assert.equal(auth.id, null);
    });
    it('should change the id to a real value after a save', function(){
      auth.hash();
      return auth.save()
      .then(function(){
        assert.notEqual(auth.id, null);
      });
    });
    it('should hash the password', function() {
      assert.notEqual('test123', auth.password);
    });
  });
  describe('load', ()=>{
    var auth = new Auth();
    before(()=> {
      auth.username='Tonya';
      auth.password='test123';
      auth.permissions=0;
      auth.hash();
      return auth.save();
    });
    it('should have an empty Auth instance', ()=> {
      auth = new Auth();
      assert.equal(auth.username, null);
    });
    it('should load an Auth instance with the user data', ()=>{
      auth.load(1)
      .then(()=>{
        assert(auth.username, 'andrew');
      });
    });
  });
  describe('compare',()=> {
    var auth = new Auth();
    before(()=>{
      return auth.load(1);
    });
    it('should be able to authenticate against the stored password',()=> {
      assert.equal(auth.compare('test123'), true);
    });
    it('should fail for an incorrect password', ()=>{
      assert.equal(auth.compare('test1234'), false);
    });
  });
  describe('verifyPassword',()=> {
    var auth = new Auth();
    before(()=>{
      return auth.load(1);
    });
    it('should be able to authenticate with a promise returned', ()=> {
      return auth.verifyPassword('test123')
      .then((res)=> {
        assert.equal(res,true);
      });
    });
  });
  describe('findOne',()=>{
    var auth = new Auth();
    it('should load a single result for id 2 and return an json object with username "Tonya"', ()=> {
      return auth.findOne({id:2})
      .then((res)=>{
        assert.equal('Tonya', res.username);
      });
    });
  });
  describe('findOne',()=>{
    var auth = new Auth();
    it('should load a single result for username "andrew" and return an json object ', ()=> {
      return auth.findOne({username:'andrew'})
      .then((res)=>{
        assert.equal('andrew', res.username);
      });
    });
  });
  describe('find', ()=>{
    var auth = new Auth();
    it('should load all the use objects, in this case 2', ()=> {
      return auth.find()
      .then((res)=>{
        assert.equal(res.length, 2);
      });
    });
  });
  describe('Unauthenticated GET /users', ()=>{
    it('will fail to access the API', (done)=>{
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect(401)
        .end((err,res)=>{
          if(err) return done(err);
          done();
        });
    });
  });

  describe('Login with unvalidated credentials', ()=> {
    before(()=> {
      var auth = new Auth();
      auth.username='Simon';
      auth.password='aaa';
      auth.activationCode= 'sssss';
      auth.permissions=0;
      auth.hash();
      return auth.save();
    });
    it('will reject the authentication attempt', (done)=> {
      request(app)
        .post('/auth')
        .send({username: "Simon", password: 'aaa'})
        .expect(402)
        .end((err, res) => {
          if(err) return done(err);
          done();
        });
    });
//    it('will increment the loginAttempts counter', (done)=> {

//    });
  });
  describe('Authenticated GET /users', ()=>{
    var token=null;
    it('Authenticates', (done)=>{
      // Authenticate first
      request(app)
        .post('/auth')
        .send({username: 'Tonya', password: 'test123'})
        .expect(200)
        .end((err,res) => {
          if(err) return done(err);
          token = res.body.token;
          done();
        });
    });
  });

  describe('Change an auth record: POST /auth', ()=> {
    var response={};
    var token=null;
    it('Authenticates', (done)=>{
      // Authenticate first
      request(app)
        .post('/auth')
        .send({username: 'Tonya', password: 'test123'})
        .expect(200)
        .end((err,res) => {
          if(err) return done(err);
          token = res.body.token;
          done();
        });
    });

    it('responds with 401 Unauthorized if it isn\'t our own record', (done)=>{
      request(app)
        .post('/auths')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({username: 'andrew', password: 'titus123'})
        .expect(401)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.auths;
          done();
        });
    });
    it('responds with 200 OK if it is our own record', (done)=>{
      request(app)
        .post('/auths')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({username: 'Tonya', password: 'titus123'})
        .expect(200)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.auths;
          done();
        });
    });
    it('should have a hashed password', ()=> {
      assert.notEqual(response.password, 'toohot');
    });
  });
  describe('Admin Changes an auth record: POST /auth', ()=> {
    var response={};
    var token=null;
    it('Authenticates', (done)=>{
      // Authenticate first
      request(app)
        .post('/auth')
        .send({username: 'andrew', password: 'test123'})
        .expect(200)
        .end((err,res) => {
          if(err) return done(err);
          token = res.body.token;
          done();
        });
    });

    it('responds with 200 OK', (done)=>{
      request(app)
        .post('/auths')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({username: 'Tonya', password: 'titus123'})
        .expect(200)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.auths;
          done();
        });
    });
    it('should have a hashed password', ()=> {
      assert.notEqual(response.password, 'toohot');
    });
  });

});

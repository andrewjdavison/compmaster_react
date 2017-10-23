"use strict";
process.env.NODE_ENV="test";

global.rootRequire = function(name) {
  return require( __dirname + '/../' + name);
};

var config = require('config');

var assert = require('chai').assert;
var State = require('../models/state');
var Country = require('../models/country');

var request = require('supertest');
var express = require('express');
var app = require('../app.js');




describe('Country & State Classes', function(){
  describe('Authenticated GET /countries', ()=>{
    var result=null;
    var token=null;
    before((done)=>{

      var country1 = new Country({id: 1, name: 'Maldovia', code:'ML'});
      var country2 = new Country({id: 2, name: 'Sexyland', code:'SX'});
      var country3 = new Country({id: 3, name: 'Catatonia', code:'CA'});

      return country1.build()
      .then((result)=>{
        return country1.save()

      })
      .then((result)=>{
        return country2.save();
      })
      .then(()=>{
        return country3.save();
      })
      .then(()=>{
        assert.equal(country1.name,'Maldovia');
        done();
      })
    });
    it('Rejects an authentication request with impropper credentials', (done)=>{
      // Authenticate first
      request(app)
        .post('/auth')
        .send({username: 'Tonya', password: 'test123'})
        .expect(401)
        .end((err,res) => {
          if(err) return done(err);
          done();
        });
    });
    it('Authenticates', (done)=>{
      // Authenticate first
      request(app)
        .post('/auth')
        .send({username: 'Tonya', password: 'titus123'})
        .expect(200)
        .end((err,res) => {
          if(err) return done(err);
          token = res.body.token;
          done();
        });
    });
    it('responds with a 200 OK and an array with 3 elements', (done)=>{
      request(app)
        .get('/countries')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .expect(200)
        .expect(hasThreeElements)
        .end((err,res)=>{
          if(err) return done(err);
          result = res;
          done();
        });
      function hasThreeElements(res){
        if(res.body.countries.length < 3) throw new Error('Too few elements in response');
        if(res.body.countries.length > 3) throw new Error('Too many elements in response');
      };
    });
  });
  describe('Authenticated GET /countries/1', ()=>{
    var token=null;
    it('Authenticates', (done)=>{
      // Authenticate first
      request(app)
        .post('/auth')
        .send({username: 'Tonya', password: 'titus123'})
        .expect(200)
        .end((err,res) => {
          if(err) return done(err);
          token = res.body.token;
          done();
        });

    });
    it('and responds with a json object with name "Maldovia"', (done)=>{
      request(app)
        .get('/countries/1')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .expect(200)
        .expect(correctUser)
        .end((err,res)=>{
          if(err) return done(err);
          done();
        });
      function correctUser(res){
        if(res.body.countries[0].name !== 'Maldovia') throw new Error('Expected '+res.body.users[0].name+' = "Melbourne Brewers"');
      };
    });
  });
  describe('Unauthorised user Saving a new country with POST /countries', ()=> {
    var response={};
    var token=null;
    var clubResult=null;
    it('Authenticates an unauthorized user', (done)=>{
      request(app)
        .post('/auth')
        .send({username: 'Tonya', password: 'titus123'})
        .expect(200)
        .end((err,res) => {
          if(err) return done(err);
          token = res.body.token;
          done();
        });
    });
    it('Rejects a request to save a new country from an unauthorized user', (done)=>{
      request(app)
        .post('/countries')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({"name": 'Seolinia', "code": 'SM'})
        .expect(401)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.users;
          done();
        });
    });
  });
  describe('Authorized user saving a new country with POST /countries', ()=> {
    var response={};
    var token=null;
    var countryResult=null;
    it('Authenticates an authorized user', (done)=>{
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
    it('Allows a request to save a new country from an authorized user', (done)=>{
      request(app)
        .post('/countries')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({name: 'Cornicopolis', code: 'CO'})
        .expect(200)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.users;
          done();
        });
    });
    it('should have saved a new club', ()=> {
      var country = new Country();
      return country.findOne({name:'Cornicopolis'})
      .then((result)=>{
        countryResult = result;
        assert.notEqual(result, null);
        assert.equal(result.code, 'CO');
      })
    });
  });
});

"use strict";
process.env.NODE_ENV="test";

global.rootRequire = function(name) {
  return require( __dirname + '/../' + name);
};

var config = require('config');

var assert = require('chai').assert;
var Club = require('../models/club');

var request = require('supertest');
var express = require('express');
var app = require('../app.js');




describe('Club Class', function(){
  describe('Authenticated GET /club', ()=>{
    var result=null;
    var token=null;
    before((done)=>{

      var club1 = new Club({id: 1, name: 'Melbourne Brewers', regionId:2});
      var club2 = new Club({id: 2, name: 'Bayside Brewers', regionId:2});
      var club3 = new Club({id: 3, name: 'Westgate Brewers', regionId:2});

      return club1.build()
      .then((result)=>{
        return club1.save()
      })
      .then((result)=>{
        return club2.save();
      })
      .then(()=>{
        return club3.save();
      })
      .then(()=>{
        assert.equal(club1.name,'Melbourne Brewers');
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
          token = res.body.token;
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
        .get('/clubs')
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
        if(res.body.clubs.length < 3) throw new Error('Too few elements in response');
        if(res.body.clubs.length > 3) throw new Error('Too many elements in response');
      };
    });
  });
  describe('Authenticated GET /clubs/1', ()=>{
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
    it('and responds with a json object with clubNAme "Melbourne Brewers"', (done)=>{
      request(app)
        .get('/clubs/1')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .expect(200)
        .expect(correctUser)
        .end((err,res)=>{
          if(err) return done(err);
          done();
        });
      function correctUser(res){
        if(res.body.clubs[0].name !== 'Melbourne Brewers') throw new Error('Expected '+res.body.users[0].name+' = "Melbourne Brewers"');
      };
    });
  });
  describe('Saving a new club with POST /clubs', ()=> {
    var response={};
    var token=null;
    var clubResult=null;
    it('Authenticates', (done)=>{
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
    it('responds with 200 OK', (done)=>{
      request(app)
        .post('/clubs')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({name: 'Yarra Valley Brewers', regionId: 3})
        .expect(200)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.users;
          done();
        });
    });
    it('should have saved a new club', ()=> {
    var club = new Club();
      return club.findOne({name:'Yarra Valley Brewers'})
      .then((result)=>{
        clubResult = result;
        assert.notEqual(result, null);
        assert.equal(result.name, 'Yarra Valley Brewers');
      })
    });
    it('Should have a clubId of 4', ()=> {
      assert.equal(clubResult.id, 4);
    });
  });
  describe('Editting a club with POST /clubs', ()=> {
    var response={};
    var token=null;
    var clubResult=null;
    it('Authenticates', (done)=>{
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
    it('responds with 200 OK', (done)=>{
      request(app)
        .post('/clubs')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({id: 2, regionId: 3})
        .expect(200)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.users;
          done();
        });
    });
    it('should have the editted club', ()=> {
    var club = new Club();
      return club.findOne({id:2})
      .then((result)=>{
        clubResult = result;
        assert.notEqual(result, null);
        assert.equal(result.name, 'Bayside Brewers');
        assert.equal(result.regionId, 3);
      })
    });
    it('Should have a clubId of 4', ()=> {
      assert.equal(clubResult.id, 2);
    });
    it('will tell us how many connections are stip up in the pool...', ()=>{
      var club = new Club();
    });
  });
  describe('Editting a club with PUT /clubs/1', ()=> {
    var response={};
    var token=null;
    var clubResult=null;
    it('Authenticates', (done)=>{
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
    it('responds with 200 OK', (done)=>{
      request(app)
        .put('/clubs/2')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({regionId: 4})
        .expect(200)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.users;
          done();
        });
    });
    it('should have the editted club', ()=> {
    var club = new Club();
      return club.findOne({id:2})
      .then((result)=>{
        clubResult = result;
        assert.notEqual(result, null);
        assert.equal(result.name, 'Bayside Brewers');
        assert.equal(result.regionId, 4);
      })
    });
    it('Should have a clubId of 4', ()=> {
      assert.equal(clubResult.id, 2);
    });
    it('will tell us how many connections are stip up in the pool...', ()=>{
      var club = new Club();
    });
  });
});

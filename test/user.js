"use strict";
process.env.NODE_ENV="test";

global.rootRequire = function(name) {
  return require( __dirname + '/../' + name);
};

var config = require('config');

var assert = require('chai').assert;
var User = require('../models/user');
var Auth = require('../models/auth');
var capabilities = require('../common/capabilities');

var request = require('supertest');
var express = require('express');
var app = require('../app.js');




describe('User Class', function(){
  /*
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
    it('and responds with a json array with two objects', (done)=>{
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .expect(200)
        .expect(hasTwoElements)
        .end((err,res)=>{
          if(err) return done(err);
          done();
        });
      function hasTwoElements(res){
        if(res.body.auths.length < 2) throw new Error('Too few elements in response');
        if(res.body.auths.length > 2) throw new Error('Too many elements in response');
      };
    });
  });
 */
  describe('Authenticated GET /users/1', ()=>{
    var token=null;
    before((done)=>{
      var user = new User();
      return user.build()
      .then(()=>{
        user.userid = 1;
        user.firstName = 'Andrew';
        user.lastName = 'Davison';
        user.club = 2;
        return user.save()
      })
      .then(()=>{
        var auth = new Auth();
        auth.username='andrew';
        auth.password='test123';
        auth.userid=1;
        auth.permissions = capabilities.test | capabilities.admin;
        auth.hash();
        return auth.save();
      })
      .then(()=>{
        var auth = new Auth();
        auth.username='Tonya';
        auth.password='test123';
        auth.userid=1;
        auth.permissions = capabilities.test | capabilities.admin;
        auth.hash();
        return auth.save();
      })
      .then(()=>{
        done();
      });
    });

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
    it('and responds with a json object with firstName "andrew"', (done)=>{
      request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .expect(200)
        .expect(correctUser)
        .end((err,res)=>{
          if(err) return done(err);
          done();
        });
      function correctUser(res){
        if(res.body.users[0].firstName !== 'Andrew') throw new Error('Wrong username in retrieved record');
      };
    });
  });
  describe('Saving a new user with POST /users', ()=> {
    var response={};
    var token=null;
    var userResult=null;
    it('Authenticates', (done)=>{
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
    it('responds with 200 OK', (done)=>{
      request(app)
        .post('/users')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+token)
        .send({
          currentComp: 12,
          firstName: 'Kerryn',
          lastName: 'Davison',
          street1: '',
          street2: '',
          city: '',
          state: '',
          country: '',
          postcode: '',
          phone: '',
          club:0,
          judgeId: '',
          judgeLevel: '',
          receiveInvitations: '',
          regionId: ''
        })
        .expect(200)
        .end((err,res)=>{
          if(err) return done(err);
          response=res.body.users;
          done();
        });
    });
    it('should have saved a new user', ()=> {
    var user = new User();
      return user.findOne({firstName:'Kerryn'})
      .then((result)=>{
        userResult = result;
        assert.notEqual(result, null);
        assert.equal(result.lastName, 'Davison');
      })
    });
    it('Should have a currentComp of 12', ()=> {
      assert.equal(userResult.currentComp, 12);
    });

  });
});

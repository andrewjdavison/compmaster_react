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
var User = require('../models/user');

var request = require('supertest');
var express = require('express');
var app = require('../app.js');

describe('Sign-up Process', function(){
  var activationCode='';
  describe('An Invalid sign-up', function(){
    before(()=>{
      var auth=new Auth();
      var user=new User();


      auth.username="tonystark";
      return auth.build()
      .then(()=>{
        return user.build();
      })
      .then(()=>{
        return auth.save()
      })
      .then(()=>{
        user.email="user@domain.com";
        return user.save();
      })
    });
    it('should fail is there is no username', (done)=>{
      request(app)
        .post('/sign-up')
        .send({email:'user@domain.com',recaptcha:'hffhdskj'})
        .expect(400)
        .end((err,res) => {
          if(err) return done(err);
          done();
        });
    });
    it('should fail if there is no email', (done)=> {
      request(app)
        .post('/sign-up')
        .send({username:'fred',recaptcha:config.recaptcha.site})
        .expect(400)
        .end((err,res) => {
          if(err) return done(err);
          done();
        });
    });
    it('should fail if there is no password', (done)=>{
      request(app)
        .post('/sign-up')
        .send({username:'fred',email:"user@dommani.com", recaptcha:config.recaptcha.site})
        .expect(400)
        .end((err,res) => {
          if(err) return done(err);
          done();
        });
    });
    it('should fail if there is no recaptcha key', (done)=>{
      request(app)
        .post('/sign-up')
        .send({username:'fred',email:"user@dommani.com", password:'hffhdskj'})
        .expect(400)
        .end((err,res) => {
          if(err) return done(err);
          done();
        });
    });
    it('should fail with an invalid recaptcha key',function(done){
      this.timeout(3000);
      request(app)
        .post('/sign-up')
        .send({"username":'fred',"email":"user@dommani.com", "password":'hffhdskj', "recaptcha":'hkfds'})
        .expect(200)
        .expect(theRightErrorCode)
        .end((err,res) => {
          if(err) {
            console.log(err);
            return done(err);
          }
          done();
        });
      function theRightErrorCode(res){
        if(!('errors' in res.body)) throw new Error("No errors were found when I was expecting them!");
        if(res.body.errors[0].code != 121) throw new Error('Wrong error code returned');
      };
    });
    it('should fail if the username already exists',(done)=>{
      request(app)
        .post('/sign-up')
        .send({username:'tonystark',email:"tony@domain.com", password:'hffhdskj', recaptcha:config.recaptcha.response})
        .expect(200)
        .expect(theRightErrorCode)
        .end((err,res) => {
          if(err) return done(err);
          done();
        });
      function theRightErrorCode(res){
        if(!('errors' in res.body)) throw new Error("No errors were found when I was expecting them!");
        if(res.body.errors[0].code != 123) throw new Error('Wrong error code returned');
      };

    });
    it('should fail if the email is already registered', (done)=>{
      request(app)
        .post('/sign-up')
        .send({username:'fred',email:"user@domain.com", password:'hffhdskj', recaptcha:config.recaptcha.response})
        .expect(200)
        .expect(theRightErrorCode)
        .end((err,res) => {
          if(err) return done(err);
          done();
        });
      function theRightErrorCode(res){
        if(!('errors' in res.body)) throw new Error("No errors were found when I was expecting them!");
        if(res.body.errors[0].code != 101) throw new Error('Wrong error code returned');
      };

    });
  });
  describe('A valid sign-up', function(){
    it('should create a new user if all the data provided is correct', (done)=>{
      request(app)
        .post('/sign-up')
        .send({username:'fred',email:"andrew@davison-family.com", password:'hffhdskj', recaptcha:config.recaptcha.response})
        .expect(200)
        .expect(haveCreatedTheNewUserAndAuth)
        .end((err,res) => {
          if(err) return done(err);
          done();
        });
      function haveCreatedTheNewUserAndAuth(res){
        var user = new User();
        var auth = new Auth();
        return user.findOne( {email:'andrew@davison-family.com'})
        .then((result)=>{
          if(!result) throw new Error("User wasn't created");
          return auth.findOne({username:'fred'});
        })
        .then((result)=>{
          if(!result) throw new Error('Auth was not found');
          activationCode = result.activationCode;
        });

      };
    });
  });
  describe('An attempt to activate no activationCode', ()=>{
    it('should fail with a 404 error', (done)=>{
      request(app)
      .get('/activate')
      .expect(404)
      .end((err,res) => {
        if(err) return done(err);
        done();
      });
    });
  });
  describe('An attempt to activate a non-existant activationCode', ()=>{
    it('should fail with a 403 error', (done)=>{
      request(app)
      .get('/activate/fgdjsklfdsal')
      .expect(403)
      .end((err,res) => {
        if(err) return done(err);
        done();
      });
    });
  });
  describe('An attempt to activate a valid activationCode',()=>{
    it('should succeed and return a redirect', (done)=> {
      request(app)
      .get('/activate/'+activationCode)
      .expect(302)
      .end((err,res) => {
        if(err) return done(err);
        done();
      });
    });
    it('should clear the activation code', ()=>{
      var auth = new Auth();
      return auth.findOne({id:2})
      .then((result)=>{
        if(result.activationCode!==''){
          throw new Error("Activation code wasn't cleared");
        }
      })
      .catch((err)=>{
        throw new Error(err);
      });
    });
  });
});

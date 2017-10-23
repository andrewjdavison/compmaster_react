"use strict";
process.env.NODE_ENV="test";

global.rootRequire = function(name) {
  return require( __dirname + '/../../' + name);
};

var config = require('config');
var cmConst = rootRequire('common/const');
var capabilities = rootRequire('common/capabilities');

var assert = require('chai').assert;
var Auth = rootRequire('models/auth');

var request = require('supertest');

//var request = supertest(config.get('cmsRoot')+':'+config.get('port_https'));

var express = require('express');
var app = rootRequire('app.js');
var loginResponse;

/*
 * Return a promise that will return a token or an auth error
 */

function login(user, done){
	request(app)
		.post('/auth/')
		.send({username: user.username, password: user.password})
		.expect(200)
		.end((err, res)=>{
			if(err) {
        done(err);
      }
			var response= res.body;
      loginResponse = response;
			done();
		});
}

function unauthenticatedRequest(expectedResult, done){
  request(app)
    .get('/users/'+config.cmuser.userId)
    .set('Accept', 'application/json')
    .expect(expectedResult)
    .end((err,res)=>{
      if(err) return done(err);
      done();
    });
}

function authenticatedRequest(expectedResult, done){
  request(app)
    .get('/users/'+config.cmuser.userId)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer '+loginResponse.token)
    .expect(expectedResult)
    .end((err,res)=>{
      console.log(res);
      if(err) return done(err);
      done();
    });
}

describe('Attempt to read user data ', function(){
  describe('by an unauthenticated user ', function(){
    it('should fail', (done)=> {
      unauthenticatedRequest(401, done);
    });
  });
  describe('by another authorized user ', (done)=>{
    it('should authenticate', (done)=> {
        login(config.cmuser2, done);
    });
    it('should fail', (done)=> {
      authenticatedRequest(401, done);
    });
  });
  describe('by the owner', (done)=>{
    it('should authenticate', (done)=> {
        login(config.cmuser, done);
    });
    it('should succeed in accessing the data', (done)=>{
      authenticatedRequest(200, done);
    });
  });
  describe('by an admin', (done)=>{
    it('should authenticate', (done)=> {
        login(config.sadmin, done);
    });
    it('should succeed', (done)=> {
      authenticatedRequest(200, done);
    });
  });
  describe('by a compManager', (done)=>{
    it('should authenticate', (done)=> {
        login(config.cadmin, done);
    });
    it('should fail for a compManager', (done) => {
      authenticatedRequest(401, done);
    });
  });
  describe('by a judgeDirector', (done)=>{
    it('should authenticate', (done)=> {
        login(config.judgeDirector, done);
    });
    it('should fail', (done) => {
      authenticatedRequest(401, done);
    });
  });
  describe('by a dataOfficer', (done)=>{
    it('should authenticate', (done)=> {
        login(config.dataOfficer, done);
    });
    it('should fail', (done) => {
      authenticatedRequest(401, done);
    });
  });
  describe('by a compTreasurer', (done)=>{
    it('should authenticate', (done)=> {
        login(config.compTreasurer, done);
    });
    it('should fail', (done) => {
      authenticatedRequest(401, done);
    });
  });

});

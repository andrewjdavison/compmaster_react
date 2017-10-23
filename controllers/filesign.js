'use strict';
var responder = rootRequire('common/responder');
var aws4 = require('aws4');
var config = require('config');
var crypto = require('crypto');
var moment = require('moment');

class FilesignController {
  /*
  sign(req, res){
    if(req.query.hasOwnProperty('name') && req.query.hasOwnProperty('size') && req.query.hasOwnProperty('type')){
      var policy = {
        "expiration" :"2018-12-12T12:00:00:00.000Z",
        "conditions" : [
          {"acl":"public-read"},
          {"bucket": "sponsors.compmaster.com.au"},
          ["content-length-range", 0, 2000000],
        ]
      };
      var opts = {
        service: 's3',
        region: config.s3Options.region,
      };
      aws4.sign(opts, {accessKeyId: config.s3Options.accessKeyId, secretAccessKey: config.s3Options.secretAccessKey});
      console.log(opts);
      var responseData = {};
      responseData.opts=opts;

      responder.httpRespond(res, {code: responder.OK, detail: responseData});
    } else {
     responder.httpRespond(res, {code: responder.INVALID_PARAM});
    }
  }
  */

  signing(req, res) {
    var aws = config.s3Options;
    var request = req.query;
    var fileName = request.name

    var compInstId = req.params.id;
    var bucketName = req.params.bucket;
    var path = compInstId + '/' + fileName;
    var bucket;

    if(config.s3Options.buckets.hasOwnProperty(bucketName)){
      bucket = config.s3Options.buckets[bucketName];
    } else {
      responder.httpRespond(res, {code: responder.INVALID_PARAM});
      return;
    }
    console.log(bucket);

//    var s3Url = 'https://' + bucket + '.s3.amazonaws.com';
    var s3Url = 'https://' + bucket + '.s3-' + aws.region + '.amazonaws.com';
//    var s3Url = 'https://s3-' + aws.region + '.amazonaws.com/'+bucket+'/';
//    var s3Url = 'https://' + bucket + '.s3.amazonaws.com';

    var readType = 'public-read';
    var expiration = moment().add(5, 'm').toDate(); //15 minutes

    var s3Policy = {
        'expiration': expiration,
        'conditions': [
          {
            'bucket': bucket
          },
          ['starts-with', '$key', path],
          {
            'acl': readType
          },
          {
            'success_action_status': '201'
          },
          ['starts-with', '$Content-Type', request.type],
          ['content-length-range', 2048, 10485760], //min and max
        ]
     };

     var stringPolicy = JSON.stringify(s3Policy);
     var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');

        // sign policy
     var signature = crypto.createHmac('sha1', aws.secretAccessKey)
         .update(new Buffer(base64Policy, 'utf-8')).digest('base64');

     var credentials = {
       url: s3Url,
       bucket: bucket,
       key: path,
       fields: {
         key: path,
         AWSAccessKeyId: aws.accessKeyId,
         acl: readType,
         policy: base64Policy,
         signature: signature,
         'Content-Type': request.type,
         success_action_status: 201
       }
     };
     console.log(credentials);
     res.jsonp(credentials);
  };
}

module.exports = FilesignController;

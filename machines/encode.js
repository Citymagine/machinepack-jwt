module.exports = {


  friendlyName: 'encode',


  description: 'Encode a JWT.',


  extendedDescription: 'Encode a JSON web token with a provided secret. You may choose what algorithm you want to use to encode the JWT, but make sure to use the same algorithm when you are decoding the JWT.',


  inputs: {
    secret: {
      friendlyName:'Secret',
      example: 'abc123jdhs3h4js',
      description: 'The secret used to encode the JWT.',
      required: true
    },
    payload: {
      friendlyName:'JWT Payload',
      typeclass: '*',
      description: 'The contents of the JWT.',
      required: true
    },
    algorithm:{
      friendlyName:'Algorithm',
      example:'HS256',
      description:'The type of algorithm that is used to encode the JWT. Options: HS256, HS384, HS512 and RS256.'
    },
    expiresInSeconds:{
      friendlyName:'Expires in Seconds',
      example: 60,
      description:'Number of seconds until the token expires.'
    },
    expiresInMinutes:{
      friendlyName:'Expires in Minutes',
      example: 120,
      description:'Number of minutes until the token expires.'
    }
  },

  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred while encoding JWT.',
    },

    success: {
      "description": 'JWT encoded successfully.',
      "example":'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
      "hasDynamicOutputType":true
    }

  },


  fn: function (inputs,exits) {
    var jwt = require('jsonwebtoken');
    if(inputs.expires || inputs.algorithm){ //Options exist
      var options = {};
      if(inputs.algorithm){
        options.algorithm = inputs.algorithm;
      }
      if(inputs.expiresInMinutes){
        options.expiresInMinutes = inputs.expiresInMinutes;
      }
      if(inputs.expiresInSeconds){
        options.expiresInSeconds = inputs.expiresInSeconds;
      }
      return exits.success(jwt.sign(inputs.payload, inputs.secret, options));
    }
    else {
      return exits.success(jwt.sign(inputs.payload, inputs.secret));
    }
  },



};

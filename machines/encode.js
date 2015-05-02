module.exports = {


  friendlyName: 'encode',


  description: 'Encode a JWT.',


  extendedDescription: 'Encode a JSON web token with a provided secret. You may choose what algorithm you want to use to encode the JWT, but make sure to use the same algorithm when you are decoding the JWT.',


  inputs: {
    secret: {
      example: 'abc123jdhs3h4js',
      description: 'The secret used to encode the JWT.',
      required: true
    },
    payload: {
      example: {username:'ExampleUser', email:'example@email.com'},
      description: 'The contents of the JWT.',
      required: true
    },
    algorithm:{
      example:'HS256',
      description:'The type of algorithm that is used to encode the JWT. Options: HS256, HS384, HS512 and RS256.'
    }
  },

  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred while encoding JWT.',
    },

    success: {
      description: 'JWT encoded successfully.',
    },

  },


  fn: function (inputs,exits) {
    var jwt = require('jwt-simple');
    var a = "HS256";
    if(inputs.algorithm){
      return exits.success(jwt.encode(inputs.payload, inputs.secret, inputs.algorithm));
    }
    return exits.success(jwt.encode(inputs.payload, inputs.secret));
  },



};

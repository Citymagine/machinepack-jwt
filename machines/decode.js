module.exports = {


  friendlyName: 'decode',


  description: 'Decode a JWT.',


  extendedDescription: 'Decode a JSON web token with a provided secret. You may choose what algorithm you want to use to decode the JWT, but make sure to use the same algorithm that you used to encode the JWT.',


  inputs: {
    secret: {
      example: 'abc123jdhs3h4js',
      description: 'Secret used to decode the JSON web token.',
      required: true
    },
    token: {
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
      description: 'JSON web token to decode.',
      required: true
    },
    algorithm:{
      example:'HS256',
      description:'The type of algorithm that is used to decode the JWT. Options: HS256, HS384, HS512 and RS256. Make sure to use the same algorithm that you used to encode the JWT.'
    }
  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred while decoding JWT.',
    },

    success: {
      description: 'JWT decoded successfully.',
      example:{
        email:"test@test.com", 
        name:"test"
      },
      hasDynamicOutputType:true
    },

  },


  fn: function (inputs,exits) {
    var jwt = require('jsonwebtoken');
    if(inputs.algorithm){ //Options exist
      var options = {};
      if(inputs.algorithm){
        options.algorithms = [inputs.algorithm];
      }
      return exits.success(jwt.verify(inputs.token, inputs.secret, options));
    }
    else {
      return exits.success(jwt.verify(inputs.token, inputs.secret));
    }
  },

};

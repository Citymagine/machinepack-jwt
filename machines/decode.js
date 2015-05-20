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
    schema:{
      description:'Expected parts of the token to make available in output.',
      example:'*',
      defaultsTo:'*'
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
      friendlyName:'then',
      description: 'JWT decoded successfully.',
      getExample:function(inputs){
        return inputs.schema;
      },
      hasDynamicOutputType:true
    }

  },


  fn: function (inputs,exits) {
    return exits.success(getToken(inputs));
  }

};

function getToken(inputs){
  var jwt = require('jsonwebtoken');
  if(inputs.algorithm){ //Options exist
    //TODO: Check that algorithm matches possibilities
    var options = {};
    if(inputs.algorithm){
      options.algorithms = [inputs.algorithm];
    }
    return jwt.verify(inputs.token, inputs.secret, options);
  }
  else {
    var d = jwt.verify(inputs.token, inputs.secret);
    return d;
  }
}

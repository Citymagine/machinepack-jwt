var _ = require('underscore');

module.exports = {


  friendlyName: 'decode',


  description: 'Decode a JWT.',


  extendedDescription: 'Decode a JSON web token with a provided secret. You may choose what algorithm you want to use to decode the JWT, but make sure to use the same algorithm that you used to encode the JWT.',


  inputs: {
    secret: {
      friendlyName: 'Secret',
      example: 'abc123jdhs3h4js',
      description: 'Secret used to decode the JSON web token.',
      required: true
    },
    token: {
      friendlyName: 'Token',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
      description: 'JSON web token to decode.',
      required: true
    },
    schema:{
      friendlyName: 'Schema',
      typeclass:'*',
      description:'Example of expected token object to make available in output. Can be example object or a list/array of parameter names.'
    },
    algorithm:{
      friendlyName: 'Algorithm',
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
      hasDynamicOutputType:true,
      getExample:function (inputs){
        // Example schema
        var defaultObj = {id:"abc123", email:"example@example.com", role:"user", sessionId:"abc123"};
        if(!inputs.schema) return defaultObj;
        // Handle a array of parameters
        if(_.isArray(inputs.schema)){
          return arrayToExample(inputs.schema);
        }
        // Handle a list of parameters
        if(_.isString(inputs.schema)){
          var paramsArray = inputs.schema.split(",");
          return arrayToExample(paramsArray);
        }
        // schema is an object
        return inputs.schema;
      }
    }
  },

  fn: function(inputs, exits){
    return exitWithToken(inputs, exits);
  }

};

function exitWithToken(inputs, exits){
  var jwt = require('jsonwebtoken');
  if(inputs.algorithm){ //Options exist
    //TODO: Check that algorithm matches possibilities
    var options = {};
    if(inputs.algorithm){
      options.algorithms = [inputs.algorithm];
    }
    try {
      return exits.success(jwt.verify(inputs.token, inputs.secret, options));
    } catch(err){
      return exits.error(err);
    }
  }
  else {
    try {
      return exits.success(jwt.verify(inputs.token, inputs.secret));
    } catch(err){
      return exits.error(err);
    }
  }
}
function arrayToExample(paramsArray){
  var exampleObj = {};
  _.each(paramsArray, function(param){
    param.replace(" ", ""); //Trim space from param name
    if(param == "email") {
      exampleObj.email = "example@email.com"
    } else {
      exampleObj[param] = "example data"
    }
  });
  return exampleObj;
}
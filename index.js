var request = require('request'),
    qs = require('querystring'),
    fermata = require('fermata');

var getHeader = function (token) {
  var header = {
    'Authorization': 'Bearer ' + token
  };

  return header;
};

var postHeader = function (token, size) {
  var header = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'multipart/form-data'
  };

  return header;
};

var processAPIResponse = function (error, response, body) {
  var result = [null, null];

  if (error) {
    result[0] = {error: 'Oops.'};
  } else {
    if (response.statusCode === 404) {
      result[0] = {error: 'pageNotFound', 
                errorDescription: 'Page was not found. Make sure you provided all the parameters needed for this endpoint.'};
    } else {
      try {
        result[1] = JSON.parse(body);
      } catch (e) {
        console.log(e);
        result[0] = result[0] || {error: 'badJson', errorDescription: 'Received malformed JSON response from 23andme.'};
      }
    }
  }

  return result;
};

module.exports = {
  getProfiles: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/user/',
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getProfileNames: function (params, callback) {
    var profileId = params.profileId ? params.profileId + '/' : '';

    var requestParams = {
      url: 'https://api.23andme.com/1/names/' + profileId,
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getProfilePictures: function (params, callback) {
    var profileId = params.profileId ? params.profileId + '/' : '';

    var requestParams = {
      url: 'https://api.23andme.com/1/profile_picture/' + profileId,
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getPublished: function (params, callback) {
    var profileId = params.profileId;
    var featureId = params.featureId;
    var linkId = params.linkId ? params.linkId + '/' : '';

    var requestParams = {
      url: 'https://api.23andme.com/1/publish/' + profileId + '/' + featureId + '/' + linkId,
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getIntroduction: function (params, callback) {
    var profileId = params.profileId;
    var matchId = params.matchId;

    var requestParams = {
      url: 'https://api.23andme.com/1/introduction/' + profileId + '/' + matchId + '/',
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getGenotypes: function (params, callback) {
    var unfiltered = params.unfiltered ? '&unfiltered=true' : '';
    var requestParams = {
      url: 'https://api.23andme.com/1/genotypes/' + params.profileId + '/?locations=' + encodeURIComponent(params.locations.join(' ')) + unfiltered,
      headers: getHeader(params.token),
      method: 'GET'
    };
    
    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getGenomes: function (params, callback) {
    var unfiltered = params.unfiltered ? '?unfiltered=true' : '';
    var requestParams = {
      url: 'https://api.23andme.com/1/genomes/' + params.profileId + '/' + unfiltered,
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getHaplogroups: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/haplogroups/' + params.profileId + '/',
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getAncestry: function (params, callback) {
    var threshold = params.threshold ? params.threshold + '/' : '';
    var requestParams = {
      url: 'https://api.23andme.com/1/ancestry/' + params.profileId + '/?threshold=' + params.threshold,
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getNeanderthal: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/neanderthal/' + params.profileId + '/',
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getRelatives: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/relatives/' + params.profileId + '/?' + qs.stringify(params.filters),
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getRisks: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/risks/' + params.profileId + '/',
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getCarriers: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/carriers/' + params.profileId + '/',
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getDrugResponses: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/drug_responses/' + params.profileId + '/',
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  getTraits: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/traits/' + params.profileId + '/',
      headers: getHeader(params.token),
      method: 'GET'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });    
  },
  postProfilePictures: function (params, callback) {
    fermata.json('https://api.23andme.com/1/profile_picture/' + params.profileId + '/').post(postHeader(params.token), 
      {image: {data: params.image}}, function (error, response) {
      callback(error, response);
    });
  },
  postPublish: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/publish/' + params.profileId + '/' + params.featureId + '/',
      headers: getHeader(params.token),
      method: 'POST'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  postIntroduction: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/introduction/' + params.profileId + '/' + params.matchId + '/',
      headers: getHeader(params.token),
      method: 'POST'
    };

    var tempBody = {};

    if (params.messageText)
      tempBody.message_text = params.messageText;
    if (params.visibility)
      tempBody.visibility = params.visibility;

    if (Object.keys(tempBody).length > 0)
      requestParams.body = qs.stringify(tempBody);

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });
  },
  putPublish: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/publish/' + params.profileId + '/' + params.featureId + '/' + params.linkId + '/?status=' + params.status,
      headers: getHeader(params.token),
      method: 'PUT'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    });    
  },
  patchIntroduction: function (params, callback) {
    var requestParams = {
      url: 'https://api.23andme.com/1/introduction/' + params.profileId + '/' + params.matchId + '/',
      headers: getHeader(params.token),
      method: 'PATCH'
    };

    var tempBody = {};

    if (params.status)
      tempBody.status = params.status;
    if (params.visibility)
      tempBody.visibility = params.visibility;

    if (Object.keys(tempBody).length > 0)
      requestParams.body = qs.stringify(tempBody);

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    }); 
  },
  patchRelatives: function (params, callback) {
    var tempQuery = {};
    var optionalData = '';

    if (params.notes)
      tempQuery.notes = params.notes;
    if (params.relationshipCode)
      tempQuery.user_relationship_code = params.relationshipCode
    if (Object.keys(tempQuery).length > 0)
      optionalData += '?' + qs.stringify(tempQuery);

    var requestParams = {
      url: 'https://api.23andme.com/1/relatives/' + params.profileId + '/' + params.matchId + '/' + optionalData,
      headers: getHeader(params.token),
      method: 'PATCH'
    };

    request(requestParams, function (error, response, body) {
      var callbackValues = processAPIResponse(error, response, body);
      callback(callbackValues[0], callbackValues[1]);
    }); 
  }
};
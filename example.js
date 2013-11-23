var g23 = require('./index.js');
var utils = require('util');
var fs = require('fs');

var userToken = '';
var userId = 1;
var shareStatuses = ['Owned Profile', 'Sharing Genomes', 'Public Match'];
var introStatuses = ['Sent', 'Received', 'Accepted', 'Declined', 'Cancelled'];
var profileId = '';
var linkId = '';
var matchId = '';
var timestamp = Date.now();
var requestParams = {
  id: userId,
  token: userToken,
  profileId: profileId,
  featureId: 'music',
  linkId: linkId || '',
  matchId: matchId,
  locations: ['rs3094315'],
  filters: {
    limit: 10,
    offset: 2,
    since: timestamp || Date.now(),
    share_status: encodeURIComponent(shareStatuses[0]),
    intro_status: encodeURIComponent('Introduction ' + introStatuses[0])
  },
  image: '',
  messageText: 'mensaje',
  visibility: 'profile',
  notes: 'hey there family person!',
  relationshipCode: '10',
  unfiltered: true
};

var imagePath = ''; // This is the path to the image you want to upload.

var imageTest = require('fs').readFileSync(imagePath);

requestParams.image = imageTest;

g23.postProfilePictures(requestParams, function (err, data) {
  console.log(utils.inspect(err || data, false, null));
});

g23.getProfiles(requestParams, function (err, data) {
  console.log(utils.inspect(err || data, false, null));
});

g23.getProfileNames(requestParams, function (err, data) {
  console.log(utils.inspect(err || data, false, null));
});

g23.getTraits(requestParams, function (err, data) {
  console.log(utils.inspect(err || data, false, null));
});
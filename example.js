var g23 = require('./index.js');
var utils = require('util');

var userToken = '38d33201e68e599db0ca32746ab3e43d';
var userId = 1;
var shareStatuses = ['Owned Profile', 'Sharing Genomes', 'Public Match'];
var introStatuses = ['Sent', 'Received', 'Accepted', 'Declined', 'Cancelled'];
var profileId = 'e6912fdfd73c9a4a';
var linkId = '';
var matchId = '';
var timestamp = Date.now();
var requestParams = {
  id: userId,
  token: userToken,
  profileID: profileId,
  featureID: 'music',
  linkID: linkId || '',
  matchID: matchId,
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

var imageTest = require('fs').readFileSync('profile.jpg');

requestParams.image = imageTest;

g23.getProfiles(requestParams, function (err, data) {
  console.log(utils.inspect(err || data, false, null));
});
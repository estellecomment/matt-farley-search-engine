/*jslint node: true */
'use strict';

const request = require('request-promise');

const words = process.argv[2];
console.log('Querying ', words, '...');

const aliases = [
  'The Boston Sports Band of New England',
  'The Great Weather Song Person',
  'The Guy Who Sings your Name Over and Over',
  'The Motern Media Holiday Singers',
  'The Odd Man who Sings About poop',
  'The Paranormal Song Warrior',
  'The Singing Film Critic',
  'The Strange Man Who Sings About Dead Animals',
  'The Sorry Apology Song Person',
  'The Very Nice Interesting Singer Man',
];

const makeQueryOptions = function(artist, words) {
  return {
    method: 'GET',
    uri: 'https://api.spotify.com/v1/search',
    qs: {
      type: 'track',
      q: 'artist:"' + artist + '" "' + words + '"'
    }
  };
};

const printTrack = function(track) {
    console.log(track.name + ' (from "' + track.album.name + '" by ' + track.artists[0].name + ')');
    console.log(track.external_urls.spotify);
    console.log('-------');
};

const queryWithPagination = function(options) {
  return request(options)
    .then(function (response) {
      const responseObj = JSON.parse(response);
      for (let track of responseObj.tracks.items) {
        printTrack(track);
      }
      if (responseObj.tracks.next) {
        return queryWithPagination(responseObj.tracks.next);
      }
    });
};

const queryForArtist = function(artist, words) {
  return queryWithPagination(makeQueryOptions(artist, words))
    .catch(function(err) { console.log(err); });
};

let promise = Promise.resolve();
for (let alias of aliases) {
  promise = promise.then(queryForArtist(alias, words));
}

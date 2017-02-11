/*jslint node: true */
'use strict';

const request = require('request-promise');

const words = process.argv[2];
console.log('Querying ', words, '...');

const aliases = [
  'Farley & Greenspan',
  'Matt Motern Manly Man',
  'The Athletic Sports Band',
  'The Atlanta Sports Band',
  'The Baltimore Sports Band',
  'The Boston Sports Band of New England',
  'The Chicago Sports Band',
  'The Cincinnati Sports Band',
  'The Cleveland Sports Band',
  'The Detroit Sports Band',
  'The Farley Flower Band',
  'The Great Weather Song Person',
  'The Green Bay & Milwaukee Sports Band',
  'The Guy Who Sings Songs about cities',
  'The Guy Who Sings your Name Over and Over',
  'The Kansas City Sports Band',
  'The Los Angeles Sports Band',
  'The MA Love Song Warriors',
  'The Miami Sports Band',
  'The Minnesota Sports Band',
  'The Motern Media Holiday Singers',
  'The New Orleans Sports Band',
  'The New York Sports Band',
  'The Odd Man who Sings About poop',
  'The Oklahoma City Sports Band',
  'The Paranormal Song Warrior',
  'The Philadelphia Sports Band',
  'The Pittsburgh Sports Band',
  'The River Mud Warriors',
  'The San Diego Sports Band',
  'The San Francisco Sports Band',
  'The Seattle Sports Band',
  'The Singing Animal Lover',
  'The Singing Film Critic',
  'The Sports Band of Denver, Colorado',
  'The Sports Band of Indianapolis, Indiana',
  'The Sports Band of Phoenix, Arizona',
  'The Strange Man Who Sings About Dead Animals',
  'The Sorry Apology Song Person',
  'The St. Louis Sports Band',
  'The Toilet Bowl Cleaners',
  'The Very Nice Interesting Singer Man',
  'The Washington Sports Band',
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
    console.log(track.uri);
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

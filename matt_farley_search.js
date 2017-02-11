/*jslint node: true */
'use strict';

const request = require('request-promise');

const words = process.argv[2];
console.log('Querying ', words, '...');

const aliases = [
  'Farley & Greenspan',
  'General Cordswainer',
  'Matt Motern Manly Man',
  'Moes Haven',
  'Papa Razzi and the Photogs',
  'Projection From The Side',
  'The Athletic Sports Band',
  'The Atlanta Sports Band',
  'The Baltimore Sports Band',
  'The Best Birthday Song Band Ever',
  'The Best Friend Song Fun Band',
  'The Birthday Band For Old People',
  'The Boston Sports Band of New England',
  'The Boston Baseball Band',
  'The Boston Basketball Band',
  'The Chicago Sports Band',
  'The Cincinnati Sports Band',
  'The Cleveland Sports Band',
  'The Detroit Sports Band',
  'The Extreme Left Wing Liberals',
  'The Family Party Song Singers',
  'The Farley Flower Band',
  'The FL Love Song Warriors',
  'The Great Weather Song Person',
  'The Green Bay & Milwaukee Sports Band',
  'The Guy Who Sings Songs about cities',
  'The Guy Who Sings your Name Over and Over',
  'The Hungry Food Band',
  'The Kansas City Sports Band',
  'The Los Angeles Sports Band',
  'The MA Love Song Warriors',
  'The Miami Sports Band',
  'The Minnesota Sports Band',
  'The Motern Media Holiday Singers',
  'The Name Project',
  'The New Orleans Sports Band',
  'The New York Sports Band',
  'The New York Sports Fan',
  'The NH Love Song Warriors',
  'The Odd Man who Sings About poop',
  'The Oklahoma City Sports Band',
  'The Paranormal Song Warrior',
  'The Passionate and Objective Jokerfan',
  'The Philadelphia Sports Band',
  'The Pittsburgh Sports Band',
  'The Prom Song Singers',
  'The RI Love Song Warriors',
  'The River Mud Warriors',
  'The San Diego Sports Band',
  'The San Francisco Sports Band',
  'The Seattle Sports Band',
  'The Singing Animal Lover',
  'The Singing Film Critic',
  'The Singing Phone Ringtone Party Band',
  'The Singing Texas Sports Fan',
  'The Smokin\' Hot Babe Lovers',
  'The Spoiled Chefs',
  'The Sports Band of Denver, Colorado',
  'The Sports Band of Indianapolis, Indiana',
  'The Sports Band of Phoenix, Arizona',
  'The Strange Man Who Sings About Dead Animals',
  'The Sorry Apology Song Person',
  'The St. Louis Sports Band',
  'The Toilet Bowl Cleaners',
  'The Ultra Right Wing Conservatives',
  'The Vampire & Werewolf Experience',
  'The Very Nice Interesting Singer Man',
  'The Very Very Awesome Song Band',
  'The Washington Sports Band',
  'The Wedding Proposal Music Song Band',
  'Those Crazy College Kids'
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

# matt-farley-search-engine
A script that searches through Matt Farley songs, so that you can find a song for EVERY aspect of your life.

Requires node.

Run `npm install` first. Then:

```
$ node matt_farley_search.js "washing machine"
Querying  washing machine ...
Nice Clothes Washer Washing Machine Tribute (from "Songs About My House and Stuff" by The Very Nice Interesting Singer Man)
https://open.spotify.com/track/2Z5WEIq7YpczA3nUSE2dgg
-------
```

The search engine will look for the exact string you input.
```
$ node matt_farley_search.js "i'm early"
Querying  i'm early ...

$ node matt_farley_search.js "i'm so early"
Querying  i'm so early ...
I'm Sorry I'm so Early (from "Humble Apology Songs for the World to Enjoy" by The Sorry Apology Song Person)
https://open.spotify.com/track/7v6Ji2a2g5P5VDm7XBFARC
-------
```

So try querying similar words:
```
$ node matt_farley_search.js "flirt"
Querying  flirt ...

$ node matt_farley_search.js "flirting"
Querying  flirting ...
I'm Sorry, But I'm Married. Quit Flirting With Me, Ok? (from "Humble Apology Songs for the World to Enjoy" by The Sorry Apology Song Person)
https://open.spotify.com/track/36Gw1C52r5rlIIKyKHMwZH
-------
```


Please file issues in the repo for bugs and features.

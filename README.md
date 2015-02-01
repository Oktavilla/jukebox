# jukebox

Needs two env variables: `LASTFM_API_KEY` and `LASTFM_API_SECRET`.

Surfing to `/` will show the recent tracks of the Oktavilla Last.fm group.

## APIs

* `/api/user/[username]/top-artists/` will give you the top artists for a certain user with Spotify links for the artists.
* `/api/user/[username]/recent-tracks/` will give you the recent tracks for the specified user (with Spotify links for the tracks).
* `/api/group/[groupname]/playlist/` will give you the recently played tracks for the names last.fm group (with Spotify links)
* `/api/group/[groupname]/` will give you the users of a specified Lat.fm group.

## Run locally

`$ grunt server`

Enjoy the music.

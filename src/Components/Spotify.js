const clientId = 'f3805407769b403fb6cbe4d04e769ea9'; // Replace with your client id
const redirectUri = 'http://localhost:3000/'; // Replace with your redirect URI
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        console.log('Searching Spotify with token:', accessToken);
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => response.json())
          .then(jsonResponse => {
              if (!jsonResponse.tracks) {
                  console.log('No tracks found');
                  return [];
              }
              console.log('Tracks found:', jsonResponse.tracks.items);
              return jsonResponse.tracks.items.map(track => ({
                  id: track.id,
                  name: track.name,
                  artist: track.artists[0].name,
                  album: track.album.name,
                  uri: track.uri
              }));
          }).catch(error => {
              console.error('Error during search:', error);
          });
    },

    async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            console.log('No name or no tracks to save.');
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        try {
            console.log('Fetching user ID with token:', accessToken);
            const response = await fetch('https://api.spotify.com/v1/me', { headers });
            const jsonResponse = await response.json();
            userId = jsonResponse.id;
            console.log('User ID:', userId);

            console.log('Creating playlist...');
            const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers,
                method: 'POST',
                body: JSON.stringify({ name: name }),
            });
            const playlistResponseJson = await createPlaylistResponse.json();
            const playlistId = playlistResponseJson.id;
            console.log('Playlist created with ID:', playlistId);

            console.log('Adding tracks to playlist...');
            await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris }),
            });
            console.log('Tracks added to playlist successfully.');
        } catch (error) {
            console.error('Failed to save playlist to Spotify:', error);
        }
    }
};

export default Spotify;

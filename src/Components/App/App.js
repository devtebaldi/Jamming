import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import tracklist from '../Tracklist/Tracklist';
import Spotify from '../Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const handleSearch = async (query) => {
    const results = await Spotify.search(query);
    setSearchResults(results);
  };

  const addToPlaylist = (track) => {
    const trackWithUniqueId = { ...track, instanceId: Date.now() + Math.random() };
    setPlaylist((prevPlaylist) => [...prevPlaylist, trackWithUniqueId]);
  };

  const removeFromPlaylist = (instanceIdToRemove) => {
    setPlaylist(prevPlaylist => prevPlaylist.filter(track => track.instanceId !== instanceIdToRemove));
  };

  const savePlaylist = () => {
    const trackURIs = playlist.map((track) => track.uri);
    Spotify.savePlaylist('My Playlist', trackURIs);
  }

  return (
    <div className={styles.App}>
      <header>
        <nav className={styles.header}>
          <h3>Ja<span>mmm</span>ing</h3>
          <h4>Login</h4>
        </nav>
      </header>
      <main>
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className={styles.results}>
          <SearchResults 
          tracklist={searchResults} 
          onAddToPlaylist={addToPlaylist}
          />
          <Playlist 
          playlist={playlist} 
          removeFromPlaylist={removeFromPlaylist} 
          onSave={savePlaylist}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

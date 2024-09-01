import React from "react";
import styles from "./SearchResults.module.css";

export default function SearchResults({ tracklist, onAddToPlaylist }) {
    return (
        <div className={styles.box}>
            <h2>Results</h2>
            {tracklist.length > 0 ? (
                tracklist.map((track) => (
                    <div className={styles.results} key={track.id}>
                        <div className={styles.trackInfo}>
                            <h3>{track.name}</h3>
                            <p>{track.artist} - {track.album}</p>
                        </div>
                        <button className={styles.addButton} onClick={() => onAddToPlaylist(track)}>+</button>
                    </div>
                ))
            ) : (
                <p className={styles.noTracks}>No results found</p>
            )}
        </div>
    );
}

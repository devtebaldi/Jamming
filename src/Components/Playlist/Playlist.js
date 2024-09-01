import React from "react";
import styles from "./Playlist.module.css";

export default function Playlist({ playlist, removeFromPlaylist, onSave }) {
    return (
        <div className={styles.box}>
            <form>
                <input placeholder="Your Playlist" type="text" />
            </form>
            {playlist.length > 0 ? (
                playlist.map((track) => (
                    <div className={styles.playlist} key={track.instanceId}>
                        <div className={styles.trackInfo}>
                            <h3>{track.name}</h3>
                            <p>{track.artist} - {track.album}</p>
                        </div>
                        <button className={styles.removeButton} onClick={() => removeFromPlaylist(track.instanceId)}>-</button>
                    </div>
                ))
            ) : (
                <p className={styles.noTracks}>Add some tracks to your favorite playlist!</p>
            )}
            {playlist.length > 0 && <button className={styles.saveButton} onClick={() => {
                console.log("Save to Spotify button clicked");
                onSave();
            }}>
                Save to Spotify!
            </button>
}
        </div>
    );
}

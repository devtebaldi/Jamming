import React, { useState } from "react";
import styles from "./SearchBar.module.css"

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <input 
            placeholder="Enter a song, album or artist" 
            type="text" 
            value={query} 
            onChange={handleInputChange} 
            name="search"
            />
            <button type="submit" name="search" className={styles.btn}>Search</button>
        </form>
    )
}
import React, { useEffect, useState } from 'react';
import { writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { appLocalDataDir } from '@tauri-apps/api/path';
import { invoke } from '@tauri-apps/api/tauri'
import NotifDisplay from './NotifDisplay';
import errSound from '../assets/button_err.mp3';
import NoInternetImage from './NoInternetImage';
import { platform } from '@tauri-apps/api/os';

window.downloads = []

async function downloadGame(game) {
    try {
        document.getElementById("downloadsTab").click()
        window.downloads.push({
            "name": game.name,
            "id": game.id
        })
        window.dispatchEvent(new Event('downloadsChange'));

        const gamedata = JSON.parse(await readTextFile('games.json', { dir: BaseDirectory.AppLocalData }));
        const url = game.download
        const file_path = `${await appLocalDataDir()}${game.id}.exe`

        await invoke('download_file', { url: url, filePath: file_path });

        var platformName = await platform();
        var enableWine = false
        if (platformName !== 'win32') {
            enableWine = true
        }

        gamedata.games.push({
            "name": game.name,
            "icon": "",
            "exec": `${await appLocalDataDir()}${game.id}.exe`,
            "enableWine": enableWine
        })
        await writeTextFile('games.json', JSON.stringify(gamedata, '\n', 2), { dir: BaseDirectory.AppLocalData });

        NotifDisplay("Game downloaded successfully!", `${game.name} has been added to your library!`);
        window.downloads = window.downloads.filter(obj => obj.id !== game.id);
        window.dispatchEvent(new Event('downloadsChange'));
    } catch (error) {
        new Audio(errSound).play()
        NotifDisplay("Error downloading file:", error.message);
        console.error(error)
        window.downloads = window.downloads.filter(obj => obj.id !== game.id);
        window.dispatchEvent(new Event('downloadsChange'));
    }
}

const InstantGameCards = ({ jsonurl }) => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://zeankundev.github.io/cdn/Store.json', { cache: "no-store" });
                const gamedata = await response.json()
                setGames(gamedata.store);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            }
        };

        fetchData();
    }, [jsonurl]);

    if (error) {
        return (
            <div style={{ textAlign: 'center' }}>
                <br />
                <NoInternetImage />
                <br />
                <br />
                <h3 id="internet-discon">Internet disconnected 😥</h3>
                <br />
                <span id="l1">Don't fret, buddy! You still have a chance! All you need to do is to</span>
                <br />
                <span id="l2">reconnect your internet, then refresh the page! 😉</span>
                <br />
            </div>
        );
    }

    return (
        <div>
            {games.map((item, index) => (
                <div
                    key={index}
                    className='recommend-display'
                    title={item.summary}
                >
                    <div className='card-title'>{item.name.length > 16 ? (item.name.substring(0, 16) + '...') : item.name}</div>
                    <p>{item.summary.length > 25 ? (item.summary.substring(0, 25) + '...') : item.summary}</p>
                    <button className='download' onClick={() => downloadGame(item)}>Download and Install</button>
                </div>
            ))}
        </div>
    );
};

export default InstantGameCards;

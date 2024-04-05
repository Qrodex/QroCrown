import React, { useState } from 'react';
import { writeTextFile, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import NotifDisplay from '../components/NotifDisplay';

function AddGame() {
    const [gameName, setGameName] = useState('');
    const [gameIcon, setGameIcon] = useState('');
    const [gameDir, setGameDir] = useState('');
    const [gameArgs, setGameArgs] = useState('');
    const [enableWine, setEnableWine] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGame = {
            name: gameName,
            icon: gameIcon,
            exec: gameDir,
            enableWine: enableWine,
            args: gameArgs
        };

        try {
            const gamedata = JSON.parse(await readTextFile('games.json', { dir: BaseDirectory.AppLocalData }));
            gamedata.games.push(newGame)
            await writeTextFile('games.json', JSON.stringify(gamedata, null, 2), { dir: BaseDirectory.AppLocalData });
            NotifDisplay('Game added successfully!', '');
        } catch (error) {
            NotifDisplay('Error adding game:', error.message);
        }

        setGameName('');
        setGameIcon('');
        setGameDir('');
        setGameArgs('');
        setEnableWine(false);
    };

    return (
        <div>
            <h1>Add game</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} required placeholder='Game name *' />
                <br /><br />
                <input type="text" value={gameIcon} onChange={(e) => setGameIcon(e.target.value)} required placeholder='Game icon *' />
                <br /><br />
                <input type="text" value={gameDir} onChange={(e) => setGameDir(e.target.value)} required placeholder='Game executable *' />
                <br /><br />
                <input type="text" value={gameArgs} onChange={(e) => setGameArgs(e.target.value)} placeholder='Environment variables' />
                <br /><br />
                <label>
                    <input type='checkbox' checked={enableWine} onChange={(e) => setEnableWine(e.target.checked)} /> Is it a Wine game?
                </label>
                <br /><br />
                <button type="submit">Add Game</button>
            </form>
        </div>
    );
}

export default AddGame;
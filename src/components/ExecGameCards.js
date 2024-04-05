import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
import { exists, writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import fallbackLogo from '../assets/logo_1024.png';
import NotifDisplay from './NotifDisplay';
import errSound from '../assets/button_err.mp3';
import launchSound from '../assets/button_click.mp3';

async function executeExecutable(path) {
    await invoke('run_executable', { path: path });
}

function GameCard({ game }) {
    const [isLoading, setIsLoading] = useState(false);
    const playGame = async () => {
        if (!await exists(game.exec)) {
            new Audio(errSound).play()
            NotifDisplay("Cannot find executable", "Double check where you are pointing the game executable to")
            return
        };

        try {
            var gamearguments
            if (game.args) {
                gamearguments = game.args
            } else {
                gamearguments = ""
            }

            await executeExecutable(game.exec + " " + gamearguments);
            new Audio(launchSound).play()
            setIsLoading(true)

            setTimeout(() => {
                setIsLoading(false)
            }, 10000);
        } catch (error) {
            new Audio(errSound).play()
            NotifDisplay("Cannot launch executable", error)
            setIsLoading(false)
        }
    };

    return (
        <div className="game-display" style={{ backgroundImage: `url('${game.icon || fallbackLogo}')` }}>
            <img
                alt={game.name}
                onError={(e) => e.target.src = fallbackLogo}
                style={{ width: '48px', height: '48px', borderRadius: '15px' }}
                src={game.icon || fallbackLogo}
            />
            <div className="game-title">{game.name.slice(0, 15) + (game.name.length > 15 ? '...' : '')}</div>
            {!isLoading && <button className="play" onClick={() => playGame()}>Play</button>}
            {isLoading && <button className="download">Loading...</button>}
        </div>
    );
}

function ExecGameCards() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const fileExists = await exists('games.json', { dir: BaseDirectory.AppLocalData });
                if (!fileExists) {
                    const templateJSON = { "games": [] };
                    await writeTextFile('games.json', JSON.stringify(templateJSON, '\n', 2), { dir: BaseDirectory.AppLocalData });
                }

                const gamedata = await readTextFile('games.json', { dir: BaseDirectory.AppLocalData });
                setGames(JSON.parse(gamedata).games);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {games.length === 0 ? (
                <p style={{ padding: '10px' }}>You have no games! Go get some games.</p>
            ) : (
                <>
                    {games.map((game, index) => (
                        <GameCard key={index} game={game} />
                    ))}
                </>
            )}
        </div>
    );
}

export default ExecGameCards;
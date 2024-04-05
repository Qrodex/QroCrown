import React, { useEffect, useState } from 'react';
import NoInternetImage from './NoInternetImage';
import InstantGameInformation from './InstantGameInformation';
import launchSound from '../assets/button_click.mp3';

const InstantGameCards = ({ jsonurl }) => {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(jsonurl, { cache: "no-store" });
                const jsonData = await response.json();
                setGames(jsonData.items);
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
                    style={{ backgroundImage: `url(${item.banner})`, backgroundSize: 'cover' }}
                    title={item.info}
                >
                    <img alt={item.name} src={item.banner} />
                    <div className='card-title'>{item.name.length > 16 ? (item.name.substring(0, 16) + '...') : item.name}</div>
                    <button className='download' onClick={() => {
                        new Audio(launchSound).play()
                        InstantGameInformation(item)
                    }
                    }>Play</button>
                </div>
            ))}
        </div>
    );
};


export default InstantGameCards;

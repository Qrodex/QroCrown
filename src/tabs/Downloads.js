import React, { useState, useEffect } from 'react';

function randBetween(min, max) {
    return (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) % (max - min + 1)) + min;
}

function Downloads() {
    const [downloads, setDownloads] = useState(window.downloads);

    useEffect(() => {
        const updateDownloads = () => {
            setDownloads(window.downloads);
        };

        window.addEventListener('downloadsChange', updateDownloads);

        return () => {
            window.removeEventListener('downloadsChange', updateDownloads);
        };
    }, []);

    return (
        <div>
            <h1>Downloads</h1>
            <br />
            {downloads.map((item, index) => (
                <div key={index}>
                    {index === 0 && <hr />}
                    {index === 0 && <br />}
                    <h3
                        style={{ paddingLeft: '20px' }}
                    >{item.name}</h3>
                    <br />
                    <div class="loading-container">
                        <div class="loading-bar" style={{ animation: `loadingAnimation ${randBetween(1, 6)}s linear infinite` }} />
                    </div>
                    <br />
                    <hr />
                    <br />
                </div>
            ))}
            {downloads.length === 0 && <h3>No downloads. Check back soon!</h3>}
        </div>
    );
}

export default Downloads;
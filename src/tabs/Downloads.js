import React, { useState, useEffect } from 'react';

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
                    <h3>{item.name}</h3>
                    <br />
                    <progress />
                    <br /><br />
                    <hr />
                    <br />
                </div>
            ))}
            {downloads.length === 0 && <h3>No downloads. Check back soon!</h3>}
        </div>
    );
}

export default Downloads;
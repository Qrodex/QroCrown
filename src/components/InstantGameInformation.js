import React from 'react';
import ReactDOM from 'react-dom';
import backIcon from '../assets/ic_fluent_arrow_left_24_regular.svg';
import devIcon from '../assets/ic_fluent_people_24_regular.svg';
import newsIcon from '../assets/ic_fluent_news_24_regular.svg';
import launchSound from '../assets/button_click.mp3';
import { WebviewWindow } from '@tauri-apps/api/window'

function stringGen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 512; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function InstantGameInformationElement({ game }) {
    function closeInfo() {
        ReactDOM.unmountComponentAtNode(document.getElementById("game-info-holder"))
    }

    return (
        <div className="game-info" style={{ display: 'inline-block' }}>
            <div style={{backgroundImage: `url('${game.banner}')`, backgroundColor: 'rgba(0, 0, 0, .8)', backgroundSize: 'cover', backgroundBlendMode: 'multiply'}}>
                <div className='title'>
                    <img onClick={closeInfo} src={backIcon} style={{ width: '20px' }} alt='back' />
                    <h1 style={{ display: 'inline', marginLeft: '20px' }}>{game.name}</h1>
                </div>
                <div className='subclass'>
                    <div style={{ display: 'inline-flex' }}>
                        <button
                            className='play'
                            style={{ marginTop: '0px' }}
                            onClick={() => {
                                new WebviewWindow(stringGen(), {
                                    url: game.download || game.preview || game.link,
                                    title: game.name
                                })
                                new Audio(launchSound).play()
                            }
                            }>Play</button>
                        <div className='subinfo'>
                            <img src={devIcon} alt='developer' style={{ width: '36px' }} />
                            &nbsp;
                            <div style={{ display: 'inline-block' }}>
                                <h4>Developer</h4>
                                {game.developer}
                            </div>
                        </div>
                        <div className='subinfo'>
                            <img src={newsIcon} alt='developer' style={{ width: '36px' }} />
                            &nbsp;
                            <div style={{ display: 'inline-block' }} onClick={function () {
                                if (!(game.feed === '' || game.feed === 'false' || game.feed === false)) {
                                    new WebviewWindow(stringGen(), {
                                        url: game.feed,
                                        title: game.name
                                    })
                                }
                            }}>
                                <h4>Game feed</h4>
                                {(game.feed === '' || game.feed === 'false' || game.feed === false) ? 'No feed!!!' : 'Click to open feed!'}
                            </div>
                        </div>
                    </div>
                    <div className='info' style={{ padding: '20px' }}>
                        <br />
                        <h1>About the game</h1>
                        <p>{game.info}</p>
                    </div>
                </div>
            </div>
        </div >
    );
}

function InstantGameInformation(game) {
    ReactDOM.render(<InstantGameInformationElement game={game} />, document.getElementById("game-info-holder"));
}

export default InstantGameInformation;

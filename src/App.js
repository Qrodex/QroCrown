import Tabs from './components/Tabs';
import Home from './tabs/Home';
import Library from './tabs/Library';
import Store from './tabs/Store';
import Settings from './tabs/Settings';
import AddGame from './tabs/AddGame';

import './woff2/fonts.css'
import clicksound from './assets/button_up.mp3';
import homeLogo from './assets/ic_fluent_home_24_regular.svg';
import libraryLogo from './assets/ic_fluent_library_24_regular.svg';
import storeLogo from './assets/ic_fluent_shopping_bag_24_regular.svg';
import settingsLogo from './assets/ic_fluent_settings_24_regular.svg';
import addLogo from './assets/ic_fluent_dismiss_24_regular.svg';
import downloadLogo from './assets/ic_fluent_arrow_download_24_regular.svg';
import Downloads from './tabs/Downloads';
import QroCrownLogo from './assets/logo_1024.png';
import launchSound from './assets/startup.mp3';

import { trackEvent } from "@aptabase/tauri";

window.addEventListener("contextmenu", e => e.preventDefault());
trackEvent("start_qrocrown")

function App() {
  const tabs = [
    { title: <span><img src={homeLogo} alt='Home' />Home</span>, content: <Home /> },
    { title: <span><img src={libraryLogo} alt='Library' />Library</span>, content: <Library /> },
    { title: <span><img src={storeLogo} alt='Store' />Store</span>, content: <Store /> },
    { title: <span><img src={settingsLogo} alt='Settings' />Settings</span>, content: <Settings /> },
    { title: <span><img src={addLogo} style={{ transform: 'rotate(45deg)', margin: 0 }} alt='Add' /></span>, content: <AddGame />, rightAligned: true },
    { title: <span><img src={downloadLogo} style={{ margin: 0 }} alt='Download' /></span>, content: <Downloads />, rightAligned: true, id: 'downloadsTab' }
  ];

  const playAudio = () => {
    const audio = new Audio(clicksound);
    audio.play();
  };

  setTimeout(() => {
    var fadeEffect = setInterval(function () {
      if (!document.getElementById("loading").style.opacity) {
        document.getElementById("loading").style.opacity = 1;
      }
      if (document.getElementById("loading").style.opacity > 0) {
        document.getElementById("loading").style.opacity -= 0.01;
      } else {
        clearInterval(fadeEffect);
        document.getElementById("loading").style.display = 'none'
      }
    }, 10);
  }, 2500);

  return (
    <div onMouseDown={playAudio}>
      <div id='loading' onLoad={() => { new Audio(launchSound).play(); }}  data-tauri-drag-region>
        <div>
          <img src={QroCrownLogo} alt='QroCrown Logo' style={{ width: '250px' }} />
          <h1>Loading QroCrown...</h1>
          Be patient...
        </div>
      </div>

      <div id='notifications-holder' />
      <div id='game-info-holder' />

      <header className="App-header">
        <Tabs tabs={tabs} />
      </header>
    </div>
  );
}

export default App;
